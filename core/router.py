
from rest_framework.routers import DefaultRouter
from core.api_views.view_sets import ContractViewSet, CoilTubingViewSet, CoilTubingContractViewSet

router = DefaultRouter()
router.register(r'api/contracts', ContractViewSet,basename='contracts')
router.register(r'api/coil-tubings', CoilTubingViewSet,basename='coil-tubings')
router.register(r'api/coil-tubing-contracts', CoilTubingContractViewSet)

urlpatterns = router.urls
