from django.views.generic import ListView, DetailView, CreateView,UpdateView
from django.urls import reverse_lazy
from core.models.contractor import Contractor, Subcontractor

class ContractorListView(ListView):
    model = Contractor
    template_name = 'core/contractor_list.html'

class ContractorDetailView(DetailView):
    model = Contractor
    template_name = 'core/contractor_detail.html'

class ContractorCreateView(CreateView):
    model = Contractor
    template_name = 'core/contractor_form.html'
    fields = ['user', 'company_name', 'contact_person', 'email', 'phone']
    success_url = reverse_lazy('contractor-list')

class ContractorUpdateView(UpdateView):
    model = Contractor
    template_name = 'core/contractor_form.html'
    fields = ['user', 'company_name', 'contact_person', 'email', 'phone']
    success_url = reverse_lazy('contractor-list')

class SubcontractorListView(ListView):
    model = Subcontractor
    template_name = 'core/subcontractor_list.html'

class SubcontractorDetailView(DetailView):
    model = Subcontractor
    template_name = 'core/subcontractor_detail.html'

class SubcontractorCreateView(CreateView):
    model = Subcontractor
    template_name = 'core/subcontractor_form.html'
    fields = ['name', 'contact_person', 'email', 'phone']
    success_url = reverse_lazy('subcontractor-list')
