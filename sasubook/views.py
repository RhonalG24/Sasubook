# from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UserSerializer, UserFileSerializer
from .models import User, UserFile

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
class UserFilesView(viewsets.ModelViewSet):
    serializer_class = UserFileSerializer
    queryset = UserFile.objects.all()
