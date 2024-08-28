from django.db import models
from .contract import Contract
from django.utils import timezone

class CoilTubing(models.Model):
    name = models.CharField(max_length=100)
    date_of_purchase = models.DateField(blank=True)
    date_of_manufacturing = models.DateField(blank=True)
    year_of_import = models.IntegerField()
    length_of_reel = models.DecimalField(max_digits=10, decimal_places=2)
    tonnage = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.name} - {self.number}"


class CoilTubingContract(models.Model):
    coil_tubing = models.ForeignKey(CoilTubing, on_delete=models.CASCADE, related_name='contracts')
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='coil_tubings')
    start_date = models.DateField()
    end_date = models.DateField()
    created = models.DateTimeField()
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.coil_tubing.name} - {self.contract.name}"

