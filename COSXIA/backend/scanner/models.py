from django.db import models


class UploadedSource(models.Model):
    filename = models.CharField(max_length=255)
    language = models.CharField(max_length=50)
    code = models.TextField()
    size = models.PositiveBigIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
