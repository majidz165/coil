from django.views.generic import ListView, DetailView, CreateView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from core.models.coil_tubing import CoilTubing, CoilTubingContract
from core.forms.CoilTubingForm import CoilTubingForm
from django.views.generic.edit import UpdateView

class CoilTubingUpdateView(LoginRequiredMixin, UpdateView):
    model = CoilTubing
    form_class = CoilTubingForm
    template_name = 'core/coiltubing_form.html'
    success_url = reverse_lazy('coiltubing-list')

class CoilTubingContractUpdateView(LoginRequiredMixin, UpdateView):
    model = CoilTubingContract
    template_name = 'core/coiltubingcontract_form.html'
    fields = ['coil_tubing', 'contract', 'start_date', 'end_date', 'active']
    success_url = reverse_lazy('coiltubingcontract-list')

class CoilTubingListView(LoginRequiredMixin, ListView):
    model = CoilTubing
    template_name = 'core/coiltubing_list.html'

class CoilTubingDetailView(LoginRequiredMixin, DetailView):
    model = CoilTubing
    template_name = 'core/coiltubing_detail.html'

class CoilTubingCreateView(LoginRequiredMixin, CreateView):
    model = CoilTubing
    form_class = CoilTubingForm
    template_name = 'core/coiltubing_form.html'
    success_url = reverse_lazy('coiltubing-list')

class CoilTubingContractListView(LoginRequiredMixin, ListView):
    model = CoilTubingContract
    template_name = 'core/coiltubingcontract_list.html'

class CoilTubingContractDetailView(LoginRequiredMixin, DetailView):
    model = CoilTubingContract
    template_name = 'core/coiltubingcontract_detail.html'

class CoilTubingContractCreateView(LoginRequiredMixin, CreateView):
    model = CoilTubingContract
    template_name = 'core/coiltubingcontract_form.html'
    fields = ['coil_tubing', 'contract', 'start_date', 'end_date', 'active']
    success_url = reverse_lazy('coiltubingcontract-list')