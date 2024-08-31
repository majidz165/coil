from rest_framework import generics
from core.serializers import ContractSerializer
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from core.forms.contractForm import ContractForm
from rest_framework.views import APIView
from rest_framework import status
from django.urls import reverse
from django.urls import reverse_lazy


class ContractCreateAPIView(generics.CreateAPIView):
    serializer_class = ContractSerializer


class CreateContractWithCoilTubingsView(LoginRequiredMixin,TemplateView):
    template_name = 'core/create_contract_with_coil_tubings.html'


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def create_contract_with_coil_tubings(request):
    form  = ContractForm(request.data)
    if form.is_valid():
        form.save()
    return Response({'success':True})
    # print(form.is_valid())
    # print(form.errors)
    # print(request.data)

class ContractCreateApi(APIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = ContractSerializer
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            url = reverse_lazy('contract-list')
        return Response({'url':url,'data':serializer.data}, status=status.HTTP_200_OK)