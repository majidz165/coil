
from rest_framework.routers import DefaultRouter
from core.api_views.view_sets import ContractViewSet, CoilTubingViewSet, CoilTubingContractViewSet,ContractTypeViewSet,UnitViewSet,ContractorViewSet,SubcontractorViewSet
from core.views.home import DeviceViewSet,JobViewSet,CategoryViewSet
router = DefaultRouter()
router.register(r'api/contracts', ContractViewSet,basename='contracts')
router.register(r'api/coil-tubings', CoilTubingViewSet,basename='coil-tubings')
router.register(r'api/coil-tubing-contracts', CoilTubingContractViewSet)
router.register(r'api/contract-types', ContractTypeViewSet,basename='contract-types')
router.register(r'api/units', UnitViewSet,basename='units')
router.register(r'api/contractors', ContractorViewSet,basename='contractors')
router.register(r'api/sub-contractors', SubcontractorViewSet,basename='sub-contractors')
router.register(r'api/devices', DeviceViewSet,basename='devices')
router.register(r'api/jobs', JobViewSet,basename='jobs')
router.register(r'api/categories', CategoryViewSet,basename='categories')


urlpatterns = router.urls
