from rest_framework import serializers
from .models import Contractor, Subcontractor, ContractType, Contract, Unit, CBSItemType, CBSItem, CoilTubing, CoilTubingContract

class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = '__all__'

class SubcontractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcontractor
        fields = '__all__'

class ContractTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractType
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'

class CBSItemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CBSItemType
        fields = '__all__'

class CBSItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CBSItem
        fields = '__all__'

class CoilTubingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoilTubing
        fields = '__all__'

class CoilTubingContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoilTubingContract
        fields = '__all__'
