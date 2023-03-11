from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import CustomUser


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('user_name', 'first_name', 'last_name', 'email',)


class UserModelSerializerV2(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["is_superuser", "is_staff"]
