from rest_framework import serializers

from .models import User
from .models import UserFile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'nombre', 'email', 'contrasenia', 'activo', 'fecha_creacion', 'ultimo_ingreso')
        model = User
        fields = '__all__'

class UserFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFile
        fields= '__all__'