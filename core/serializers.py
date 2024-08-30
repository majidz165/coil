from rest_framework import serializers
from .models.contract import Contract
from .models.coil_tubing import CoilTubingContract, CoilTubing

class CoilTubingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoilTubing
        fields = '__all__'


class CoilTubingContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoilTubingContract
        fields = ['coil_tubing', 'start_date', 'end_date']

class ContractSerializer(serializers.ModelSerializer):
    coil_tubings = CoilTubingContractSerializer(many=True)

    class Meta:
        model = Contract
        fields = ['name', 'contractor', 'contract_type', 'start_date', 'end_date', 'total_value', 'total_value_euro', 'coil_tubings']

    def create(self, validated_data):
        coil_tubings_data = validated_data.pop('coil_tubings')
        contract = Contract.objects.create(**validated_data)
        for coil_tubing_data in coil_tubings_data:
            CoilTubingContract.objects.create(contract=contract, **coil_tubing_data)
        return contract
# from .models import Contractor, Subcontractor, ContractType, Contract, Unit, CBSItemType, CBSItem, CoilTubing, CoilTubingContract

# class ContractorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Contractor
#         fields = '__all__'

# class SubcontractorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Subcontractor
#         fields = '__all__'

# class ContractTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ContractType
#         fields = '__all__'

# class ContractSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Contract
#         fields = '__all__'

# class UnitSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Unit
#         fields = '__all__'

# class CBSItemTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CBSItemType
#         fields = '__all__'

# class CBSItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CBSItem
#         fields = '__all__'

# class CoilTubingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CoilTubing
#         fields = '__all__'

# class CoilTubingContractSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CoilTubingContract
#         fields = '__all__'
