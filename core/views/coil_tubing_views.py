from django.views.generic import ListView, DetailView, CreateView
from django.urls import reverse_lazy
from core.models.coil_tubing import CoilTubing, CoilTubingContract
from core.forms.CoilTubingForm import CoilTubingForm
class CoilTubingListView(ListView):
    model = CoilTubing
    template_name = 'core/coiltubing_list.html'

class CoilTubingDetailView(DetailView):
    model = CoilTubing
    template_name = 'core/coiltubing_detail.html'

class CoilTubingCreateView(CreateView):
    model = CoilTubing
    form_class = CoilTubingForm
    template_name = 'core/coiltubing_form.html'
    success_url = reverse_lazy('coiltubing_list')

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        form.is_valid()
        print(form.data)
        print(form.cleaned_data['date_of_purchase'])
        print(form.cleaned_data['date_of_purchase'])
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_valid(self, form):
        self.object = form.save()
        return super().form_valid(form)
    model = CoilTubing
    template_name = 'core/coiltubing_form.html'
    form_class = CoilTubingForm
    success_url = reverse_lazy('coiltubing-list')

class CoilTubingContractListView(ListView):
    model = CoilTubingContract
    template_name = 'core/coiltubingcontract_list.html'

class CoilTubingContractDetailView(DetailView):
    model = CoilTubingContract
    template_name = 'core/coiltubingcontract_detail.html'

class CoilTubingContractCreateView(CreateView):
    model = CoilTubingContract
    template_name = 'core/coiltubingcontract_form.html'
    fields = ['coil_tubing', 'contract', 'start_date', 'end_date', 'active']
    success_url = reverse_lazy('coiltubingcontract-list')
