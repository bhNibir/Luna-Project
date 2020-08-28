from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'email'

    # Additional fields required to create an user (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['username', 'location', 'first_name', 'last_name']

    email = models.EmailField(unique=True)

    username = models.CharField(max_length=30, unique=True)

    first_name = models.CharField(max_length=30)

    last_name = models.CharField(max_length=30)

    password = models.CharField(max_length=200)

    location = models.CharField(max_length=100)

    phone = models.CharField(max_length=30, blank=True, null=True)

    description = models.CharField(max_length=500, blank=True, null=True)

    things_i_love = models.CharField(max_length=200, blank=True, null=True)

    joined_date = models.DateTimeField(auto_now_add=True)

    profile_picture = models.ImageField(blank=True, null=True)

    code = models.CharField(max_length=200, null=True)

    password_repeat = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.username
