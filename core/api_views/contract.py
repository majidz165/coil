from rest_framework import generics
from core.serializers import ContractSerializer
from django.views.generic import TemplateView

class ContractCreateAPIView(generics.CreateAPIView):
    serializer_class = ContractSerializer


class CreateContractWithCoilTubingsView(TemplateView):
    template_name = 'core/create_contract_with_coil_tubings.html'