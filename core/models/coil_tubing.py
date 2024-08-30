from django.db import models
from .contract import Contract
from django.utils import timezone

class CoilTubing(models.Model):
    name = models.CharField(max_length=100, verbose_name="نام دستگاه")
    # date_of_purchase = models.CharField(blank=True)
    # date_of_manufacturing = models.CharField(blank=True)
    
    
    year_of_import = models.IntegerField(verbose_name="سال واردات")
    length_of_reel = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="طول لوله مغزی")
    tonnage = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="تناژ")
    created = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")
    def __str__(self):
        return f"{self.name} - {self.number}"


class CoilTubingContract(models.Model):
    coil_tubing = models.ForeignKey(CoilTubing, on_delete=models.CASCADE, related_name='contracts', verbose_name="لوله مغزی")
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='coil_tubings', verbose_name="قرارداد")
    start_date = models.DateField(verbose_name="تاریخ شروع")
    end_date = models.DateField(verbose_name="تاریخ پایان")
    created = models.DateTimeField(verbose_name="تاریخ ایجاد")
    updated = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")
    active = models.BooleanField(default=True, verbose_name="فعال")
    def __str__(self):
        return f"{self.coil_tubing.name} - {self.contract.name}"
