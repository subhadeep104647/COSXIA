from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase


class ScannerApiTests(TestCase):
    def test_upload_returns_source_metadata(self):
        response = self.client.post(
            "/api/upload",
            {"file": SimpleUploadedFile("example.py", b"print('ok')")},
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["language"], "Python")
        self.assertEqual(response.json()["code"], "print('ok')")

    def test_upload_rejects_unsupported_extension(self):
        response = self.client.post(
            "/api/upload",
            {"file": SimpleUploadedFile("example.exe", b"not source")},
        )
        self.assertEqual(response.status_code, 400)

    def test_analyze_detects_eval(self):
        response = self.client.post(
            "/api/analyze",
            data='{"source":"manual","code":"eval(user_input)"}',
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["vulnerabilities"][0]["line"], 1)
        self.assertEqual(response.json()["riskLevel"], "high")
