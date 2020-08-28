from django.conf import settings
from django.db import models

from restaurant.models import Restaurant


class Review(models.Model):
    RATING = [
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5)
    ]

    content = models.CharField(max_length=500)

    rating = models.IntegerField(choices=RATING)

    created = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(to=settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, related_name='fk_review_user')

    restaurant = models.ForeignKey(
        to=Restaurant, on_delete=models.CASCADE, related_name='fk_review_restaurant')

    def __str__(self):
        return f'{self.pk}: {self.user} - {self.restaurant}'
