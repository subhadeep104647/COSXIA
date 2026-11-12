import json
from pathlib import Path

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import UploadedSource
from .scanner import scan_code

MAX_SOURCE_SIZE = 5 * 1024 * 1024
LANGUAGES = {
    ".c": "C",
    ".cpp": "C++",
    ".go": "Go",
    ".h": "C",
    ".hpp": "C++",
    ".java": "Java",
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".php": "PHP",
    ".py": "Python",
    ".rb": "Ruby",
    ".sql": "SQL",
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
}


def _error(message, status=400):
    return JsonResponse({"message": message}, status=status)


@csrf_exempt
def upload(request):
    if request.method != "POST":
        return _error("Only POST is supported.", 405)
    source_file = request.FILES.get("file")
    if not source_file:
        return _error("A source file is required in the 'file' field.")
    suffix = Path(source_file.name).suffix.lower()
    if suffix not in LANGUAGES:
        return _error("Unsupported source extension.")
    if source_file.size > MAX_SOURCE_SIZE:
        return _error("Source file must be 5 MB or smaller.")
    try:
        code = source_file.read().decode("utf-8")
    except UnicodeDecodeError:
        return _error("Source file must be valid UTF-8.")
    UploadedSource.objects.create(
        filename=source_file.name,
        language=LANGUAGES[suffix],
        code=code,
        size=source_file.size,
    )
    return JsonResponse(
        {"filename": source_file.name, "language": LANGUAGES[suffix], "code": code}
    )


@csrf_exempt
def analyze(request):
    if request.method != "POST":
        return _error("Only POST is supported.", 405)
    try:
        payload = json.loads(request.body)
    except (TypeError, ValueError):
        return _error("Request body must be valid JSON.")
    code = payload.get("code") if isinstance(payload, dict) else None
    source = payload.get("source") if isinstance(payload, dict) else None
    if source != "manual" or not isinstance(code, str) or not code.strip():
        return _error("Provide {source: 'manual', code: '...'} in the request body.")
    vulnerabilities = scan_code(code)
    risk_level = "high" if vulnerabilities else "low"
    summary = (
        f"Detected {len(vulnerabilities)} potential issue(s) with the deterministic placeholder scanner."
        if vulnerabilities
        else "No obvious insecure patterns were detected by the deterministic placeholder scanner."
    )
    return JsonResponse(
        {
            "riskLevel": risk_level,
            "summary": summary,
            "vulnerabilities": vulnerabilities,
            "message": "AI analysis is deferred; results are from deterministic pattern checks only.",
            "suggestedFix": vulnerabilities[0]["recommendation"] if vulnerabilities else "",
            "secureCode": code,
        }
    )
