from django.db import models
from .contractor import Subcontractor
from .contract import CBSItem
from .report import Report

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class ServiceUsage(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='service_usages')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    subcontractor = models.ForeignKey(Subcontractor, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(blank=True)
    cbs_item = models.ForeignKey(CBSItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='service_usages')

    def __str__(self):
        return f"{self.service.name} for {self.report} by {self.subcontractor or 'N/A'}"
