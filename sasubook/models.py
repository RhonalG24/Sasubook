import django
from django.db import models
from datetime import date

# Create your models here.
class User(models.Model):
    nombre = models.CharField(max_length = 255)
    email = models.EmailField(max_length = 255)
    contrasenia = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateField(auto_now_add=True)
    # ultimo_ingreso = models.DateField(default= date.today())
    ultimo_ingreso = models.DateField(default= django.utils.timezone.now().date())
    
    def __str__(self) -> str:
        return self.nombre
    
class UserFile(models.Model):
    nombre = models.CharField(max_length = 255)
    fecha_carga = models.DateField(auto_now_add=True)
    peso = models.CharField(max_length = 50)
    tipo = models.CharField(max_length = 4)
    url = models.URLField(max_length=255)
    
    def __str__(self) -> str:
        return self.nombre