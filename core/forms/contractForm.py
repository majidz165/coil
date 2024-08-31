from django import forms
from core.models import Contract
class ContractForm(forms.ModelForm):
    class Meta:
        model = Contract
        fields = ['name','contract_type','start_date','end_date','total_value','total_value_euro',]
