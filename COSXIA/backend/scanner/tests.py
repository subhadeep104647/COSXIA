import json
from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import SimpleTestCase, TestCase

from .models import UploadedSource
from .ollama import OllamaAnalysisError, parse_analysis


class ScannerApiTests(TestCase):
    def test_upload_returns_source_metadata(self):
        response = self.client.post(
            "/api/upload",
            {"file": SimpleUploadedFile("example.py", b"print('ok')")},
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["language"], "Python")
        self.assertEqual(response.json()["code"], "print('ok')")
        uploaded_source = UploadedSource.objects.get()
        self.assertEqual(uploaded_source.filename, "example.py")
        self.assertEqual(uploaded_source.language, "Python")
        self.assertEqual(uploaded_source.code, "print('ok')")
        self.assertEqual(uploaded_source.size, len(b"print('ok')"))

    def test_upload_rejects_unsupported_extension(self):
        response = self.client.post(
            "/api/upload",
            {"file": SimpleUploadedFile("example.exe", b"not source")},
        )
        self.assertEqual(response.status_code, 400)


class AnalyzerApiTests(SimpleTestCase):
    def test_analyze_reports_ollama_errors_explicitly(self):
        with patch(
            "scanner.views.analyze_with_ollama",
            side_effect=OllamaAnalysisError(
                "Ollama is unavailable.", "ollama_unavailable"
            ),
        ):
            response = self.client.post(
                "/api/analyze",
                data='{"source":"manual","code":"eval(user_input)"}',
                content_type="application/json",
            )
        self.assertEqual(response.status_code, 502)
        self.assertEqual(response.json()["error"], "ollama_unavailable")

    @patch.dict("os.environ", {"COSXIA_ALLOW_DETERMINISTIC_FALLBACK": "true"})
    def test_analyze_deterministic_fallback_is_opt_in(self):
        response = self.client.post(
            "/api/analyze",
            data='{"source":"manual","code":"eval(user_input)"}',
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["vulnerabilities"][0]["line"], 1)
        self.assertEqual(response.json()["riskLevel"], "high")

    def test_parse_analysis_rejects_malformed_json(self):
        with self.assertRaises(OllamaAnalysisError) as context:
            parse_analysis("{not-json")
        self.assertEqual(context.exception.code, "ollama_malformed")

    def test_parse_analysis_accepts_expected_shape(self):
        result = parse_analysis(
            json.dumps(
                {
                    "riskLevel": "HIGH",
                    "summary": "One issue.",
                    "vulnerabilities": [
                        {
                            "title": "Issue",
                            "severity": "high",
                            "line": 2,
                            "description": "Description",
                            "recommendation": "Fix it.",
                        }
                    ],
                    "message": "Complete.",
                    "suggestedFix": "Fix it.",
                    "secureCode": "pass",
                }
            )
        )
        self.assertEqual(result["riskLevel"], "high")
        self.assertEqual(result["vulnerabilities"][0]["line"], 2)


class CorsPreflightTests(SimpleTestCase):
    def test_preflight_allows_credentials_for_localhost_frontend(self):
        response = self.client.options(
            "/api/analyze",
            HTTP_ORIGIN="http://localhost:5173",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
            HTTP_ACCESS_CONTROL_REQUEST_HEADERS="content-type",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response["Access-Control-Allow-Origin"], "http://localhost:5173"
        )
        self.assertEqual(response["Access-Control-Allow-Credentials"], "true")
        self.assertIn("POST", response["Access-Control-Allow-Methods"])
