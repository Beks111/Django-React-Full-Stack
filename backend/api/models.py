from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # Добавляем поле для времени обновления
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']  # Сортировка по дате создания (новые сверху)