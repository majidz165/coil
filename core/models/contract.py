from django.db import models
from .contractor import Contractor
from django.utils import timezone
from persiantools.jdatetime import JalaliDate


class ContractType(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Contract(models.Model):
    name = models.CharField(max_length=100)
    contractor = models.ForeignKey(Contractor, on_delete=models.CASCADE, related_name='contracts')
    contract_type = models.ForeignKey(ContractType, on_delete=models.SET_NULL, null=True, related_name='contracts')
    start_date = models.DateField(db_index=True)
    end_date = models.DateField(db_index=True)
    total_value = models.DecimalField(max_digits=16, decimal_places=0)
    total_value_euro = models.DecimalField(max_digits=15, decimal_places=2)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    
    
    # helper fields
    syear = models.PositiveSmallIntegerField('سال',null=True,blank=True)
    smonth = models.PositiveSmallIntegerField('ماه',null=True,blank=True)
    sday = models.PositiveSmallIntegerField('روز',null=True,blank=True)
    sdate = models.CharField('تاریخ',max_length=50,null=True,blank=True)
    sdatenumber= models.IntegerField('تاریخ شماری',null=True,blank=True)
    
    eyear = models.PositiveSmallIntegerField('سال',null=True,blank=True)
    emonth = models.PositiveSmallIntegerField('ماه',null=True,blank=True)
    eday = models.PositiveSmallIntegerField('روز',null=True,blank=True)
    edate = models.CharField('تاریخ',max_length=50,null=True,blank=True)
    edatenumber= models.IntegerField('تاریخ شماری',null=True,blank=True)


    def __str__(self):
        return f"{self.name} - {self.contractor}"
    
    
    def save(self, *args, **kwargs):
        # Convert start_date to Jalali date and set helper fields
        jstart_date = JalaliDate(self.start_date)
        self.syear = jstart_date.year
        self.smonth = jstart_date.month
        self.sday = jstart_date.day
        self.sdate = jstart_date.strftime("%Y-%m-%d")
        self.sdatenumber = int(f"{self.syear}{self.smonth:02d}{self.sday:02d}")
        
        # Convert end_date to Jalali date and set helper fields
        jend_date = JalaliDate(self.end_date)
        self.eyear = jend_date.year
        self.emonth = jend_date.month
        self.eday = jend_date.day
        self.edate = jend_date.strftime("%Y-%m-%d")
        self.edatenumber = int(f"{self.eyear}{self.emonth:02d}{self.eday:02d}")

        super().save(*args, **kwargs)
    

class Unit(models.Model):
    name = models.CharField(max_length=50, unique=True)
    symbol = models.CharField(max_length=10, unique=True)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.symbol})"

class CBSItemType(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name

class CBSItem(models.Model):
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='cbs_items')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')
    unit = models.ForeignKey(Unit, on_delete=models.PROTECT)
    quantity = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    unit_price = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    cbs_item_type = models.ForeignKey(CBSItemType, on_delete=models.SET_NULL, null=True, related_name='cbs_items')
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.contract}"

    @property
    def total_price(self):
        return self.quantity * self.unit_price
