from django.contrib import admin
from .models import AppUser, PdfFile

# # Register your models here.
admin.site.register(AppUser)
admin.site.register(PdfFile)