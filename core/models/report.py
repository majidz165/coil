from django.db import models
from django.contrib.auth.models import User
from .contractor import Contractor
from .contract import Contract
from .coil_tubing import CoilTubing
from django.utils import timezone
from persiantools.jdatetime import JalaliDate
from django.conf import settings

class Report(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('confirmed', 'Confirmed'),
        ('approved', 'Approved'),
        ('superseded', 'Superseded'),
    ]

    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='reports')
    contractor = models.ForeignKey(Contractor, on_delete=models.CASCADE, related_name='reports')
    coil_tubing = models.ForeignKey(CoilTubing, on_delete=models.PROTECT, related_name='reports')
    date = models.DateField(db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft', db_index=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_reports')
    confirmed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='confirmed_reports')
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_reports')
    version = models.IntegerField(default=1)
    previous_version = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='next_versions')
    created = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")
    
    year = models.PositiveSmallIntegerField('سال شروع',null=True,blank=True)
    month = models.PositiveSmallIntegerField('ماه شروع',null=True,blank=True)
    day = models.PositiveSmallIntegerField('روز شروع',null=True,blank=True)
    pdate = models.CharField('تاریخ شروع',max_length=15,null=True,blank=True)
    datenumber= models.IntegerField('تاریخ شماری شروع',null=True,blank=True)


    def __str__(self):
        return f"Report for {self.contract} by {self.contractor} on {self.date} (v{self.version})"
    def save(self, *args, **kwargs):
        # Convert date or now to Jalali date and set helper fields
        if self.date:
            jdate = JalaliDate(self.date)
        else:
            jdate = JalaliDate(timezone.now())
        self.year = jdate.year
        self.month = jdate.month
        self.day = jdate.day
        self.pdate = jdate.strftime("%Y-%m-%d")
        self.datenumber = int(f"{self.year}{self.month:02d}{self.day:02d}")

        super(self).save(*args, **kwargs)
