from typing import Any
import django
from django.db import models
from datetime import date
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, PermissionsMixin

from sasubook_api.settings import AUTH_USER_MODEL, BASE_DIR
from .managers import AppUserManager

# Create your models here.
# class AppUserManager(BaseUserManager):
#     def create_user(self, email, password=None):
#         if not email:
#             raise ValueError('An email is required.')
#         if not password:
#             raise ValueError('A password is required')
#         email = self.normalize_email(email)
#         user = self.model(email=email)
#         user.set_password(password)
#         user.save()
#         return user
    
#     def create_superuser(self, email, password=None):
#         if not email:
#             raise ValueError('An email is required.')
#         if not password:
#             raise ValueError('A password is required')
#         user = self.create_user(email, password)
#         user.is_superuser = True
#         user.save()
#         return user
    
# class AppUser(AbstractBaseUser, PermissionsMixin):
#     user_id = models.AutoField(primary_key=True)
#     email = models.EmailField(max_length=50, unique=True)
#     username = models.CharField(max_length=100)
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']
#     objects = AppUserManager()
#     def __str__(self) -> str:
#         return self.username

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

# Create your models here.
class AppUser(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    # username = models.CharField(max_length=100)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = AppUserManager()
    
class UserPdfFile(models.Model):
    name = models.CharField(max_length = 255)
    upload_date = models.DateTimeField(auto_now_add=True)
    size = models.CharField(max_length = 50)
    type = models.CharField(max_length = 4)
    # archivo = models.FileField(upload_to='pdfs/', blank=True)
    file = models.FileField(upload_to=f'{BASE_DIR}\public\generated_files/', blank=True)
    url = models.URLField(max_length=255, blank=True)
    # id_padre = models.ForeignKey('self', on_delete=models.CASCADE, blank=True)
    # id_usuario = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    # archivo = models.FileField()
    
    def __str__(self) -> str:
        return self.nombre
    
class JWT(models.Model):
    jwt = models.CharField(max_length = 255)
    
    def __str__(self) -> str:
        return self.jwt