from django.db import models

from django.conf import settings


class Registration(models.Model):
    email = models.EmailField(unique=True)
    code = models.IntegerField(null=True, blank=True)
    user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='registration', null=True, blank=True)

    def __str__(self):
        return f'{self.pk}: {self.email}'
