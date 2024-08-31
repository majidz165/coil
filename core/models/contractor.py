from django.db import models
# from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings
class Contractor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="کاربر")
    company_name = models.CharField(max_length=100, verbose_name="نام شرکت")
    contact_person = models.CharField(max_length=100, verbose_name="شخص رابط")
    email = models.EmailField(verbose_name="ایمیل")
    phone = models.CharField(max_length=20, verbose_name="تلفن")
    created = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")
    def __str__(self):
        return self.company_name

class Subcontractor(models.Model):
    name = models.CharField(max_length=100, verbose_name="نام")
    contact_person = models.CharField(max_length=100, blank=True, null=True, verbose_name="شخص رابط")
    email = models.EmailField(verbose_name="ایمیل")
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="تلفن")
    created = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")
    def __str__(self):
        return self.name
