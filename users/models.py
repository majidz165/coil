from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Add your new field here
    is_contractor = models.BooleanField(default=False)

    def __str__(self):
        return self.username