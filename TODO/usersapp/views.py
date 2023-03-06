from rest_framework import mixins, viewsets
from rest_framework.viewsets import ModelViewSet
from .models import CustomUser
from .serializers import UserSerializer

# Create your views here.
class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
