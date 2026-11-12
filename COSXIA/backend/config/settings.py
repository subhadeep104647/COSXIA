from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = "development-only-cosxia-key"
DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

INSTALLED_APPS = [
    "corsheaders",
    "django.contrib.contenttypes",
    "django.contrib.staticfiles",
    "scanner",
]
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]
ROOT_URLCONF = "config.urls"
TEMPLATES = []
WSGI_APPLICATION = "config.wsgi.application"
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("COSXIA_DB_NAME", "cosxia"),
        "USER": os.getenv("COSXIA_DB_USER", "postgres"),
        "PASSWORD": os.getenv("COSXIA_DB_PASSWORD", ""),
        "HOST": os.getenv("COSXIA_DB_HOST", "127.0.0.1"),
        "PORT": os.getenv("COSXIA_DB_PORT", "5432"),
    }
}
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
STATIC_URL = "static/"
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True
FILE_UPLOAD_MAX_MEMORY_SIZE = 5 * 1024 * 1024
DATA_UPLOAD_MAX_MEMORY_SIZE = 5 * 1024 * 1024
OLLAMA_URL = os.getenv("COSXIA_OLLAMA_URL", "http://127.0.0.1:11434/api/generate")
OLLAMA_MODEL = os.getenv("COSXIA_OLLAMA_MODEL", "mistral:latest")
OLLAMA_TIMEOUT = os.getenv("COSXIA_OLLAMA_TIMEOUT", "120")
