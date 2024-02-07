from typing import Any
import django
from django.db import models
from datetime import date
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here.
class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required')
        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user
    
class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=100)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()
    def __str__(self) -> str:
        return self.username

# class User(models.Model):
#     nombre = models.CharField(max_length = 255)
#     email = models.EmailField(max_length = 255)
#     contrasenia = models.CharField(max_length=30)
#     activo = models.BooleanField(default=True)
#     fecha_creacion = models.DateField(auto_now_add=True)
#     # ultimo_ingreso = models.DateField(default= date.today())
#     ultimo_ingreso = models.DateField(default= django.utils.timezone.now().date())
    
#     def __str__(self) -> str:
#         return self.nombre
    
# class UserFile(models.Model):
#     nombre = models.CharField(max_length = 255)
#     fecha_carga = models.DateTimeField(auto_now_add=True)
#     peso = models.CharField(max_length = 50)
#     tipo = models.CharField(max_length = 4)
#     # archivo = models.FileField(upload_to='pdfs/', blank=True)
#     archivo = models.FileField(upload_to='.\public\generated_files/', blank=True)
#     url = models.URLField(max_length=255, blank=True)
#     id_padre = models.ForeignKey('self', on_delete=models.CASCADE, blank=True)
#     id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
#     # archivo = models.FileField()
    
#     def __str__(self) -> str:
#         return self.nombre