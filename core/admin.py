from django.contrib import admin
from .models.contract import Contract, ContractType, Unit, CBSItemType, CBSItem
from .models.coil_tubing import CoilTubing, CoilTubingContract
from .models.contractor import Contractor, Subcontractor
from django.contrib import admin



@admin.register(Contractor)
class ContractorAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'contact_person', 'email', 'phone', 'created', 'updated')
    search_fields = ('company_name', 'contact_person', 'email')
    # list_filter = ('created', 'updated')

@admin.register(Subcontractor)
class SubcontractorAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'contact_person', 'email', 'phone', 'created', 'updated')
    search_fields = ('name', 'contact_person', 'email')
    # list_filter = ( 'created', 'updated')

@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = ('name', 'contractor', 'contract_type', 'start_date', 'end_date', 'total_value')
    search_fields = ('name', 'contractor__name')
    list_filter = ('contract_type', 'start_date', 'end_date')

@admin.register(ContractType)
class ContractTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'created', 'updated')
    search_fields = ('name',)

@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol', 'created', 'updated')
    search_fields = ('name', 'symbol')

@admin.register(CBSItemType)
class CBSItemTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'created', 'updated')
    search_fields = ('name',)

@admin.register(CBSItem)
class CBSItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'contract', 'unit', 'quantity', 'unit_price', 'total_price')
    search_fields = ('name', 'contract__name')
    list_filter = ('contract', 'unit')

@admin.register(CoilTubing)
class CoilTubingAdmin(admin.ModelAdmin):
    list_display = ('name', 'year_of_import', 'length_of_reel', 'tonnage', 'created', 'updated')
    search_fields = ('name',)

@admin.register(CoilTubingContract)
class CoilTubingContractAdmin(admin.ModelAdmin):
    list_display = ('coil_tubing', 'contract', 'start_date', 'end_date', 'active')
    search_fields = ('coil_tubing__name', 'contract__name')
    list_filter = ('active', 'start_date', 'end_date')
