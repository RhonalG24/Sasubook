from typing import Any
import django
from django.db import models
from datetime import date
from django.core.validators import FileExtensionValidator
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, PermissionsMixin

from sasubook_api.settings import AUTH_USER_MODEL, BASE_DIR
from .managers import AppUserManager

# Create your models here.

def get_file_upload_path(instance, filename):
	return f'user-{instance.user_id}/pdfs/{filename}'

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
    file = models.FileField(upload_to=get_file_upload_path,
                            blank=True, 
                            validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    url = models.URLField(max_length=255, blank=True)
    # id_padre = models.ForeignKey('self', on_delete=models.CASCADE, blank=True)
    # id_usuario = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    user_id = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    # archivo = models.FileField()
    
    def __str__(self) -> str:
        return self.name
    
class PdfFile(models.Model):
    title = models.CharField(max_length=255) 
    upload_date = models.DateTimeField(auto_now_add=True)
    size = models.CharField(max_length = 50)
    file = models.FileField(upload_to=get_file_upload_path,
                            blank=True, 
                            validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    user_id = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['title']
        
    def __str__(self):
        return f'{self.title}'
    
class JWT(models.Model):
    jwt = models.CharField(max_length = 255)
    
    def __str__(self) -> str:
        return self.jwt