from django.db import models
from .contract import Unit, CBSItem
from .report import Report

class Material(models.Model):
    name = models.CharField(max_length=100)
    unit = models.ForeignKey(Unit, on_delete=models.PROTECT)

    def __str__(self):
        return self.name

class MaterialUsage(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='material_usages')
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    cbs_item = models.ForeignKey(CBSItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='material_usages')

    def __str__(self):
        return f"{self.material.name} - {self.quantity} {self.material.unit}"
