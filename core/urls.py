from django.urls import path
from .views import contractor_views, contract_views, coil_tubing_views
from core.api_views.contract import CreateContractWithCoilTubingsView,ContractCreateApi
from core.router import urlpatterns as api_urls

urlpatterns = [
    # Contractor URLs
    path('contractors/', contractor_views.ContractorListView.as_view(), name='contractor-list'),
    path('contractors/<int:pk>/', contractor_views.ContractorDetailView.as_view(), name='contractor-detail'),
    path('contractors/create/', contractor_views.ContractorCreateView.as_view(), name='contractor-create'),
    path('contractors/update/<int:pk>/', contractor_views.ContractorUpdateView.as_view(), name='contractor-update'),
    # Subcontractor URLs
    path('subcontractors/', contractor_views.SubcontractorListView.as_view(), name='subcontractor-list'),
    path('subcontractors/<int:pk>/', contractor_views.SubcontractorDetailView.as_view(), name='subcontractor-detail'),
    path('subcontractors/create/', contractor_views.SubcontractorCreateView.as_view(), name='subcontractor-create'),
    
    # Contract URLs
    path('contracts/', contract_views.ContractListView.as_view(), name='contract-list'),
    path('contracts/<int:pk>/', contract_views.ContractDetailView.as_view(), name='contract-detail'),
    # path('contracts/create/', contract_views.ContractCreateView.as_view(), name='contract-create'),
    path('contracts/update/<int:pk>/', contract_views.ContractUpdateView.as_view(), name='contract-update'),
    # contract_type URLs
    path('contract-types/', contract_views.ContractTypeListView.as_view(), name='contract-type-list'),
    path('contract-types/<int:pk>/', contract_views.ContractTypeDetailView.as_view(), name='contract-type-detail'),
    path('contract-types/create/', contract_views.ContractTypeCreateView.as_view(), name='contract-type-create'),
    path('contract-types/update/<int:pk>/', contract_views.ContractTypeUpdateView.as_view(), name='contract-type-update'),
    
    # CoilTubing URLs
    path('coiltubings/', coil_tubing_views.CoilTubingListView.as_view(), name='coiltubing-list'),
    path('coiltubings/<int:pk>/', coil_tubing_views.CoilTubingDetailView.as_view(), name='coiltubing-detail'),
    path('coiltubings/create/', coil_tubing_views.CoilTubingCreateView.as_view(), name='coiltubing-create'),
    path('coiltubings/update/<int:pk>/', coil_tubing_views.CoilTubingUpdateView.as_view(), name='coiltubing-update'),
    
    # CoilTubingContract URLs
    path('coiltubingcontracts/', coil_tubing_views.CoilTubingContractListView.as_view(), name='coiltubingcontract-list'),
    path('coiltubingcontracts/<int:pk>/', coil_tubing_views.CoilTubingContractDetailView.as_view(), name='coiltubingcontract-detail'),
    path('coiltubingcontracts/create/', coil_tubing_views.CoilTubingContractCreateView.as_view(), name='coiltubingcontract-create'),


    # api views
    # path('api/create-contract/', ContractCreateAPIView.as_view(), name='api_create_contract'),
    path('contracts/create/',CreateContractWithCoilTubingsView.as_view(),name='contract-create'),
    # path('api/',api_urls),
    path('api/create/contract',ContractCreateApi.as_view(),name='create_contract_with_coil_tubings'),
] 
urlpatterns += api_urls
