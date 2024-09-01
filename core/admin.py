from django.contrib import admin
from .models.contract import Contract, ContractType, Unit, CBSItemType, CBSItem
from .models.coil_tubing import CoilTubing, CoilTubingContract
from .models.contractor import Contractor, Subcontractor
from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from .models.activity import Category, Job, Activity
from .models.device import Device, DeviceUsage
from import_export import resources
from import_export.admin import ImportExportModelAdmin


class ContractorResource(resources.ModelResource):
    class Meta:
        model = Contractor

@admin.register(Contractor)
class ContractorAdmin(ImportExportModelAdmin):
    resource_class = ContractorResource
    list_display = ('company_name', 'contact_person', 'email', 'phone', 'created', 'updated')
    search_fields = ('company_name', 'contact_person', 'email')
    # list_filter = ('created', 'updated')

class SubcontractorResource(resources.ModelResource):
    class Meta:
        model = Subcontractor
        fields = ['id','name','contact_person', 'email', 'phone',]

@admin.register(Subcontractor)
class SubcontractorAdmin(ImportExportModelAdmin):
    resource_class = SubcontractorResource
    list_display = ( 'name', 'contact_person', 'email', 'phone', 'created', 'updated')
    search_fields = ('name', 'contact_person', 'email')
    # list_filter = ( 'created', 'updated')

class ContractResource(resources.ModelResource):
    class Meta:
        model = Contract

@admin.register(Contract)
class ContractAdmin(ImportExportModelAdmin):
    resource_class = ContractResource
    list_display = ('name', 'contractor', 'contract_type', 'start_date', 'end_date', 'total_value')
    search_fields = ('name', 'contractor__name')
    list_filter = ('contract_type', 'start_date', 'end_date')

class ContractTypeResource(resources.ModelResource):
    class Meta:
        model = ContractType

@admin.register(ContractType)
class ContractTypeAdmin(ImportExportModelAdmin):
    resource_class = ContractTypeResource
    list_display = ('name', 'created', 'updated')
    search_fields = ('name',)

class UnitResource(resources.ModelResource):
    class Meta:
        model = Unit

@admin.register(Unit)
class UnitAdmin(ImportExportModelAdmin):
    resource_class = UnitResource
    list_display = ('name', 'symbol', 'created', 'updated')
    search_fields = ('name', 'symbol')

class CBSItemTypeResource(resources.ModelResource):
    class Meta:
        model = CBSItemType

@admin.register(CBSItemType)
class CBSItemTypeAdmin(ImportExportModelAdmin):
    resource_class = CBSItemTypeResource
    list_display = ('name', 'created', 'updated')
    search_fields = ('name',)

class CBSItemResource(resources.ModelResource):
    class Meta:
        model = CBSItem

@admin.register(CBSItem)
class CBSItemAdmin(ImportExportModelAdmin):
    resource_class = CBSItemResource
    list_display = ('name', 'contract', 'unit', 'quantity', 'unit_price', 'total_price')
    search_fields = ('name', 'contract__name')
    list_filter = ('contract', 'unit')

class CoilTubingResource(resources.ModelResource):
    class Meta:
        model = CoilTubing

@admin.register(CoilTubing)
class CoilTubingAdmin(ImportExportModelAdmin):
    resource_class = CoilTubingResource
    list_display = ('name', 'year_of_import', 'length_of_reel', 'tonnage', 'created', 'updated')
    search_fields = ('name',)

class CoilTubingContractResource(resources.ModelResource):
    class Meta:
        model = CoilTubingContract

@admin.register(CoilTubingContract)
class CoilTubingContractAdmin(ImportExportModelAdmin):
    resource_class = CoilTubingContractResource
    list_display = ('coil_tubing', 'contract', 'start_date', 'end_date', 'active')
    search_fields = ('coil_tubing__name', 'contract__name')
    list_filter = ('active', 'start_date', 'end_date')

class CategoryResource(resources.ModelResource):
    class Meta:
        model = Category

@admin.register(Category)
class CategoryAdmin(MPTTModelAdmin, ImportExportModelAdmin):
    resource_class = CategoryResource
    list_display = ('name', 'parent')
    search_fields = ['name']
    list_filter = ['parent']

class JobResource(resources.ModelResource):
    class Meta:
        model = Job

@admin.register(Job)
class JobAdmin(ImportExportModelAdmin):
    resource_class = JobResource
    list_display = ('name',)
    search_fields = ['name']

class ActivityResource(resources.ModelResource):
    class Meta:
        model = Activity

@admin.register(Activity)
class ActivityAdmin(ImportExportModelAdmin):
    resource_class = ActivityResource
    list_display = ('report', 'start_time', 'end_time', 'duration', 'job', 'status', 'responsible', 'pdate')
    list_filter = ('status', 'responsible', 'job', 'year', 'month')
    search_fields = ['description',]  # Assuming Report has a 'name' field
    date_hierarchy = 'created'
    readonly_fields = ('duration', 'year', 'month', 'day', 'pdate', 'datenumber')

    fieldsets = (
        ('Basic Information', {
            'fields': ('report', 'start_time', 'end_time', 'duration', 'job', 'status')
        }),
        ('Additional Information', {
            'fields': ('description', 'responsible', 'waiting_reason')
        }),
        ('Date Information', {
            'fields': ('created', 'updated', 'year', 'month', 'day', 'pdate', 'datenumber'),
            'classes': ('collapse',)
        }),
    )

class DeviceResource(resources.ModelResource):
    class Meta:
        model = Device
        fields = ['id','name',]

@admin.register(Device)
class DeviceAdmin(ImportExportModelAdmin):
    resource_class = DeviceResource
    list_display = ('name', 'active', 'created', 'updated')
    list_filter = ('active',)
    search_fields = ('name',)
    date_hierarchy = 'created'

class DeviceUsageResource(resources.ModelResource):
    class Meta:
        model = DeviceUsage

@admin.register(DeviceUsage)
class DeviceUsageAdmin(ImportExportModelAdmin):
    resource_class = DeviceUsageResource
    list_display = ('device', 'report', 'subcontractor', 'selected', 'created', 'updated')
    list_filter = ('selected', 'device', 'subcontractor')
    search_fields = ('device__name', 'report__coil_tubing__name', 'subcontractor__name')
    date_hierarchy = 'created'
    raw_id_fields = ('report', 'device', 'subcontractor')