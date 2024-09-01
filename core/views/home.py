from django.shortcuts import render
from django.db.models import Prefetch
from rest_framework import serializers
from core.models import Contract,Contractor,Report
from rest_framework import viewsets

from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from core.models import CoilTubing,CoilTubingContract
from core.models import Device,Job,Category,Subcontractor

def HomeView(request):
    if request.user.is_contractor:
        return render(request, 'core/contractor-home.html')

def AddReport(request):
    if request.user.is_contractor:
        return render(request, 'core/contractor-add-report.html')



class CoilSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='coil_tubing.name')
    year_of_import = serializers.CharField(source='coil_tubing.year_of_import')
    length_of_reel = serializers.CharField(source='coil_tubing.year_of_import')
    tonnage = serializers.CharField(source='coil_tubing.year_of_import')
    
    class Meta:
        model = CoilTubingContract
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    contract_name = serializers.CharField(source='contract.name')

    class Meta:
        model = Report
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    # reports = ReportSerializer(many=True)
    coils = serializers.SerializerMethodField()


    def get_coils(self, obj):
        coils = obj.coil_tubings.filter(active=True)
        return CoilSerializer(coils, many=True).data

    class Meta:
        model = Contract
        fields = '__all__'

class ContractorDetailSerializer(serializers.ModelSerializer):
    contracts = ContractSerializer(many=True)

    class Meta:
        model = Contractor
        fields = '__all__'

class ContractorDetailAPIView(RetrieveAPIView):
    serializer_class = ContractorDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(
            Contractor.objects.prefetch_related(
                'contracts',
                Prefetch('contracts__reports', queryset=Report.objects.select_related('contract'))
            ),
            users=self.request.user
        )
    
    
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.filter(active=True)
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated]


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

