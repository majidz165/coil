from core.models import CoilTubing
from django import forms
class CoilTubingForm(forms.ModelForm):
    
    class Meta:
        model = CoilTubing
        fields = ['name', 'date_of_purchase', 'date_of_manufacturing', 'year_of_import', 'length_of_reel', 'tonnage']
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['date_of_purchase'].widget.attrs['class'] = 'pdate-picker'
        self.fields['date_of_manufacturing'].widget.attrs['class'] = 'pdate-picker'
        # self.fields['date_of_manufacturing'].widget.attrs.update({'data-jdp': ''})
        # self.fields['date_of_purchase'].widget.attrs.update({'data-jdp': ''})
        