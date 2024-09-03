from django.db import models
from mptt.models import TreeForeignKey
from .report import Report
from .contract import CBSItem
from mptt.models import MPTTModel, TreeForeignKey
from datetime import datetime
from django.utils import timezone
from persiantools.jdatetime import JalaliDate

class Category(MPTTModel):
    name = models.CharField(max_length=50, unique=True, verbose_name="نام")
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children', verbose_name="والد")

    class MPTTMeta:
        order_insertion_by = ['name']

    class Meta:
        verbose_name = "دسته‌بندی"
        verbose_name_plural = "دسته‌بندی‌ها"

    def __str__(self):
        return self.name

class Job(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="نام")

    class Meta:
        verbose_name = "عملیات"
        verbose_name_plural = "عملیات‌ها"

    def __str__(self):
        return self.name
    
class Activity(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='activities', verbose_name="گزارش")
    start_time = models.TimeField(db_index=True, verbose_name="زمان شروع")
    end_time = models.TimeField(db_index=True, verbose_name="زمان پایان")
    duration = models.DurationField(db_index=True, verbose_name="مدت زمان")
    # job = models.ForeignKey(Job, on_delete=models.PROTECT, related_name='activities', null=True, blank=True, verbose_name="عملیات")
    status = TreeForeignKey(Category, on_delete=models.PROTECT, related_name='activities', limit_choices_to={'level': 0}, verbose_name="وضعیت")
    
    description = models.TextField(null=True, blank=True, verbose_name="توضیحات")
    # responsible = TreeForeignKey(Category, on_delete=models.PROTECT, related_name='work_activities', null=True, blank=True, limit_choices_to={'level': 1}, verbose_name="مسئول")
    # waiting_reason = TreeForeignKey(Category, on_delete=models.PROTECT, related_name='waiting_reason_activities', null=True, blank=True, limit_choices_to={'level': 2}, verbose_name="دلیل انتظار")
    # cbs_item = models.ForeignKey(CBSItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='activities')
    created = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")

    year = models.PositiveSmallIntegerField('سال',null=True,blank=True)
    month = models.PositiveSmallIntegerField('ماه',null=True,blank=True)
    day = models.PositiveSmallIntegerField('روز',null=True,blank=True)
    pdate = models.CharField('تاریخ',max_length=15,null=True,blank=True)
    datenumber= models.IntegerField('تاریخ شماری',null=True,blank=True)

    class Meta:
        verbose_name = "فعالیت"
        verbose_name_plural = "فعالیت‌ها"

    def __str__(self):
        return f"{self.activity_type} activity for {self.report} from {self.start_time} to {self.end_time}"
    
    def save(self, *args, **kwargs):
        if self.created:
            jdate = JalaliDate(self.created)
        else:
            jdate = JalaliDate(timezone.now())
        self.year = jdate.year
        self.month = jdate.month
        self.day = jdate.day
        self.pdate = jdate.strftime("%Y-%m-%d")
        self.datenumber = int(f"{self.year}{self.month:02d}{self.day:02d}")
        
        
        if self.start_time and self.end_time:
            start_datetime = datetime.combine(datetime.today(), self.start_time)
            end_datetime = datetime.combine(datetime.today(), self.end_time)
            self.duration = end_datetime - start_datetime
        super().save(*args, **kwargs)