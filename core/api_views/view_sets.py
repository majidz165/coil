from rest_framework import viewsets
from core.models import Contract, CoilTubing, CoilTubingContract
from core.serializers import ContractSerializer, CoilTubingSerializer, CoilTubingContractSerializer

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer

class CoilTubingViewSet(viewsets.ModelViewSet):
    queryset = CoilTubing.objects.all()
    serializer_class = CoilTubingSerializer

class CoilTubingContractViewSet(viewsets.ModelViewSet):
    queryset = CoilTubingContract.objects.all()
    serializer_class = CoilTubingContractSerializer
