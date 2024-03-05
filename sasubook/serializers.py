from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

from .models import JWT, AppUser, UserPdfFile
# from .models import UserFile

# UserModel = get_user_model()

# class UserRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserModel
#         fields = '__all__'
#     ##
#     def create(self, validate_data):
#         user_obj = UserModel.objects.create_user(email=validate_data['email'], password=validate_data['password'])
#         user_obj.username = validate_data['username']
#         user_obj.save()
#         return user_obj

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()
#     ##
#     def check_user(self, validate_data):
#         user = authenticate(username=validate_data['email'], password=validate_data['password'])
#         if not user: 
#             raise ValidationError('user no found')
#         return user 

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         # fields = ('id', 'nombre', 'email', 'contrasenia', 'activo', 'fecha_creacion', 'ultimo_ingreso')
#         model = UserModel
#         fields = ('email', 'username')
        
class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         # fields = ('id', 'nombre', 'email', 'contrasenia', 'activo', 'fecha_creacion', 'ultimo_ingreso')
#         model = User
#         fields = '__all__'

# class UserFileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserFile
#         fields= '__all__'

class JWTSerializer(serializers.Serializer):
    jwt = serializers.CharField()
        
class UserPdfFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPdfFile
        fields= '__all__'

class PDFSerializer(serializers.Serializer):
    pdf = serializers.FileField()
    from_page = serializers.IntegerField()
    to_page = serializers.IntegerField()
    rate = serializers.IntegerField()
    # language = serializers.CharField()
    voice = serializers.CharField() # o: male, 1: female
    name = serializers.CharField()