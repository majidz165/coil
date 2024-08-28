from django.views.generic import ListView, DetailView, CreateView
from django.urls import reverse_lazy
from core.models.contract import Contract, ContractType, Unit, CBSItemType, CBSItem

class ContractListView(ListView):
    model = Contract
    template_name = 'core/contract_list.html'

class ContractDetailView(DetailView):
    model = Contract
    template_name = 'core/contract_detail.html'

class ContractCreateView(CreateView):
    model = Contract
    template_name = 'core/contract_form.html'
    fields = ['name', 'contractor', 'contract_type', 'start_date', 'end_date', 'total_value', 'total_value_euro']
    success_url = reverse_lazy('contract-list')

# Add similar views for ContractType, Unit, CBSItemType, and CBSItem if needed
