from rest_framework import mixins, viewsets
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import CustomUser
from .serializers import UserSerializer, UserModelSerializerV2


# Create your views here.
class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()


class UserModelLimitedViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, GenericViewSet
):
    queryset = CustomUser.objects.all()

    def get_serializer_class(self):
        if self.request.version == "2.0":
            return UserModelSerializerV2
        return UserSerializer
