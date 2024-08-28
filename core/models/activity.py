from django.db import models
from mptt.models import TreeForeignKey
from .report import Report
from .contract import Category, CBSItem

class Activity(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='activities')
    description = models.TextField()
    start_time = models.TimeField(db_index=True)
    end_time = models.TimeField(db_index=True)
    activity_type = TreeForeignKey(Category, on_delete=models.PROTECT, related_name='activities', limit_choices_to={'level': 0})
    work_subtype = TreeForeignKey(Category, on_delete=models.PROTECT, related_name='work_activities', null=True, blank=True, limit_choices_to={'level': 1})
    waiting_side = TreeForeignKey(Category, on_delete=models.PROTECT, related_name='waiting_side_activities', null=True, blank=True, limit_choices_to={'level': 1})
    waiting_reason = TreeForeignKey(Category, on_delete=models.PROTECT, related_name='waiting_reason_activities', null=True, blank=True, limit_choices_to={'level': 2})
    cbs_item = models.ForeignKey(CBSItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='activities')

    def __str__(self):
        return f"{self.activity_type} activity for {self.report} from {self.start_time} to {self.end_time}"
