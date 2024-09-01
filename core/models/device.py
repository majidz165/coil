from django.db import models
from .contractor import Subcontractor
# from .contract import CBSItem
from .report import Report

class Device(models.Model):
    name = models.CharField(max_length=300, verbose_name="نام")
    active = models.BooleanField(default=True, verbose_name="فعال")
    created = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created']
        verbose_name = "دستگاه"
        verbose_name_plural = "دستگاه‌ها"

class DeviceUsage(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='devices', verbose_name="گزارش")
    device = models.ForeignKey(Device, on_delete=models.CASCADE, verbose_name="سرویس")
    subcontractor = models.ForeignKey(Subcontractor, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="پیمانکار فرعی")
    selected = models.BooleanField(default=False, verbose_name="انتخاب شده")
    created = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")
    # description = models.TextField(blank=True)
    # cbs_item = models.ForeignKey(CBSItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='device_usages')

    def __str__(self):
        return f"{self.device.name} for {self.report.coil_tubing.name} by {self.subcontractor or 'N/A'}"

    class Meta:
        ordering = ['-created']
        verbose_name = "استفاده از دستگاه"
        verbose_name_plural = "استفاده‌های دستگاه"

