from django.db import models
from django.contrib.auth.models import User
from .contractor import Contractor
from .contract import Contract
from .coil_tubing import CoilTubing

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
    confirmed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='confirmed_reports')
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_reports')
    version = models.IntegerField(default=1)
    previous_version = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='next_versions')

    def __str__(self):
        return f"Report for {self.contract} by {self.contractor} on {self.date} (v{self.version})"
