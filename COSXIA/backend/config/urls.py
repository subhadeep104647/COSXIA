from django.urls import path

from scanner.views import analyze, upload

urlpatterns = [
    path("api/upload", upload, name="upload"),
    path("api/analyze", analyze, name="analyze"),
]
