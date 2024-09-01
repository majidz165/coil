from rest_framework import viewsets
from core.models import Contract, CoilTubing, CoilTubingContract,ContractType
from core.serializers import ContractSerializer, CoilTubingSerializer, CoilTubingContractSerializer
from core.models import Unit
from core.serializers import UnitSerializer, ContractTypeSerializer
from core.models import Contractor, Subcontractor
from core.serializers import ContractorSerializer, SubcontractorSerializer
from rest_framework.permissions import IsAuthenticated

class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [IsAuthenticated]
class SubcontractorViewSet(viewsets.ModelViewSet):
    queryset = Subcontractor.objects.all()
    serializer_class = SubcontractorSerializer
    permission_classes = [IsAuthenticated]

class UnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    permission_classes = [IsAuthenticated]

class ContractTypeViewSet(viewsets.ModelViewSet):
    queryset = ContractType.objects.all()
    serializer_class = ContractTypeSerializer
    permission_classes = [IsAuthenticated]

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated]

class CoilTubingViewSet(viewsets.ModelViewSet):
    queryset = CoilTubing.objects.all()
    serializer_class = CoilTubingSerializer
    permission_classes = [IsAuthenticated]

class CoilTubingContractViewSet(viewsets.ModelViewSet):
    queryset = CoilTubingContract.objects.all()
    serializer_class = CoilTubingContractSerializer
    permission_classes = [IsAuthenticated]
