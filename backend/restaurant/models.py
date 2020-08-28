from django.conf import settings
from django.db import models

from category.models import Category


class Restaurant(models.Model):
    PRICE_LEVEL = [
        ('$', 1),
        ('$$', 2),
        ('$$$', 3)
    ]

    name = models.CharField(max_length=100)

    country = models.CharField(max_length=100)

    street = models.CharField(max_length=100)

    city = models.CharField(max_length=100)

    zip = models.CharField(max_length=30)

    website = models.CharField(max_length=100)

    phone = models.CharField(max_length=30)

    email = models.EmailField(unique=True)

    opening_hours = models.CharField(max_length=300)

    price_level = models.CharField(max_length=3, choices=PRICE_LEVEL)

    image = models.ImageField(blank=True, null=True)

    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='fk_restaurant_user', null=True)

    category = models.ForeignKey(to=Category, related_name='fk_restaurant_category', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def amt_reviews(self):
        return self.fk_review_restaurant.count()
