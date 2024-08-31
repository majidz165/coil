from django.views.generic import ListView, DetailView, CreateView,UpdateView
from django.urls import reverse_lazy
from core.models.contract import Contract, ContractType, Unit, CBSItemType, CBSItem

class ContractListView(ListView):
    model = Contract
    template_name = 'core/contract_list.html'

class ContractDetailView(DetailView):
    model = Contract
    template_name = 'core/contract_detail.html'
class ContractUpdateView(UpdateView):
    model = Contract
    template_name = 'core/contract_form.html'
    fields = ['name', 'contractor', 'contract_type', 'start_date', 'end_date', 'total_value', 'total_value_euro']
    success_url = reverse_lazy('contract-list')

class ContractCreateView(CreateView):
    model = Contract
    template_name = 'core/contract_form.html'
    fields = ['name', 'contractor', 'contract_type', 'start_date', 'end_date', 'total_value', 'total_value_euro']
    success_url = reverse_lazy('contract-list')

class ContractTypeListView(ListView):
    model = ContractType
    template_name = 'core/contracttype_list.html'

class ContractTypeDetailView(DetailView):
    model = ContractType
    template_name = 'core/contracttype_detail.html'

class ContractTypeCreateView(CreateView):
    model = ContractType
    template_name = 'core/contracttype_form.html'
    fields = ['name']
    success_url = reverse_lazy('contract-type-list')

class ContractTypeUpdateView(UpdateView):
    model = ContractType
    template_name = 'core/contracttype_form.html'
    fields = ['name']
    success_url = reverse_lazy('contract-type-list')


class UnitListView(ListView):
    model = Unit
    template_name = 'core/unit_list.html'

class UnitDetailView(DetailView):
    model = Unit
    template_name = 'core/unit_detail.html'

class UnitCreateView(CreateView):
    model = Unit
    template_name = 'core/unit_form.html'
    fields = ['name','symbol']
    success_url = reverse_lazy('unit-list')


class UnitUpdateView(UpdateView):
    model = Unit
    template_name = 'core/unit_form.html'
    fields = ['name', 'symbol']
    success_url = reverse_lazy('unit-list')
