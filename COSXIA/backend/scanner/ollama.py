import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


class OllamaAnalysisError(Exception):
    """Raised when Ollama cannot produce a valid analysis."""

    def __init__(self, message, code="ollama_unavailable"):
        super().__init__(message)
        self.code = code


REQUIRED_FIELDS = {
    "riskLevel",
    "summary",
    "vulnerabilities",
    "message",
    "suggestedFix",
    "secureCode",
}
SEVERITIES = {"low", "medium", "high", "critical"}
RISK_LEVELS = {"low", "medium", "high", "critical"}


def parse_analysis(response_text):
    """Parse and validate the JSON returned in Ollama's ``response`` field."""
    try:
        value = json.loads(response_text)
    except (TypeError, ValueError) as exc:
        raise OllamaAnalysisError(
            "Ollama returned malformed analysis JSON.", "ollama_malformed"
        ) from exc

    if not isinstance(value, dict) or set(value) != REQUIRED_FIELDS:
        raise OllamaAnalysisError(
            "Ollama analysis must contain exactly the expected response fields.",
            "ollama_malformed",
        )
    if (
        not isinstance(value["riskLevel"], str)
        or value["riskLevel"].lower() not in RISK_LEVELS
        or not isinstance(value["summary"], str)
        or not isinstance(value["message"], str)
        or not isinstance(value["suggestedFix"], str)
        or not isinstance(value["secureCode"], str)
        or not isinstance(value["vulnerabilities"], list)
    ):
        raise OllamaAnalysisError(
            "Ollama analysis has invalid field types or values.", "ollama_malformed"
        )

    vulnerabilities = []
    for item in value["vulnerabilities"]:
        if not isinstance(item, dict) or set(item) != {
            "title",
            "severity",
            "line",
            "description",
            "recommendation",
        }:
            raise OllamaAnalysisError(
                "Ollama returned a malformed vulnerability entry.",
                "ollama_malformed",
            )
        if (
            not isinstance(item["title"], str)
            or not isinstance(item["severity"], str)
            or item["severity"].lower() not in SEVERITIES
            or not isinstance(item["line"], int)
            or isinstance(item["line"], bool)
            or item["line"] < 1
            or not isinstance(item["description"], str)
            or not isinstance(item["recommendation"], str)
        ):
            raise OllamaAnalysisError(
                "Ollama returned invalid vulnerability fields.", "ollama_malformed"
            )
        vulnerabilities.append(item)

    value["riskLevel"] = value["riskLevel"].lower()
    value["vulnerabilities"] = vulnerabilities
    return value


def _prompt(code):
    return """You are COSXIA's source-code security analyzer.
Return ONLY one valid JSON object, with no markdown, commentary, or code fences.
The object must contain exactly these fields:
{
  "riskLevel": "low|medium|high|critical",
  "summary": "string",
  "vulnerabilities": [
    {"title": "string", "severity": "low|medium|high|critical", "line": 1,
     "description": "string", "recommendation": "string"}
  ],
  "message": "string",
  "suggestedFix": "string",
  "secureCode": "string"
}
Use an empty vulnerabilities array when no issue is found. Line numbers are 1-based.
Analyze this source code exactly as provided:

""" + code


def analyze_with_ollama(code):
    url = os.getenv("COSXIA_OLLAMA_URL", "http://127.0.0.1:11434/api/generate")
    model = os.getenv("COSXIA_OLLAMA_MODEL", "mistral:latest")
    try:
        timeout = float(os.getenv("COSXIA_OLLAMA_TIMEOUT", "120"))
    except ValueError as exc:
        raise OllamaAnalysisError(
            "COSXIA_OLLAMA_TIMEOUT must be a number.", "ollama_configuration"
        ) from exc
    payload = json.dumps(
        {"model": model, "prompt": _prompt(code), "stream": False, "format": "json"}
    ).encode("utf-8")
    request = Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=timeout) as response:
            raw_body = response.read().decode("utf-8")
    except (HTTPError, URLError, TimeoutError, OSError, UnicodeError) as exc:
        raise OllamaAnalysisError(
            "Ollama is unavailable or could not be reached.",
            "ollama_unavailable",
        ) from exc
    try:
        body = json.loads(raw_body)
    except ValueError as exc:
        raise OllamaAnalysisError(
            "Ollama returned malformed HTTP response JSON.", "ollama_malformed"
        ) from exc
    if not isinstance(body, dict) or not isinstance(body.get("response"), str):
        raise OllamaAnalysisError(
            "Ollama response did not contain analysis JSON.",
            "ollama_malformed",
        )
    return parse_analysis(body["response"])


def deterministic_fallback_enabled():
    return os.getenv("COSXIA_ALLOW_DETERMINISTIC_FALLBACK", "").lower() in {
        "1",
        "true",
        "yes",
        "on",
    }
