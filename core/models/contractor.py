from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Contractor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.company_name

class Subcontractor(models.Model):
    name = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100,blank=True,null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20,blank=True,null=True)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
