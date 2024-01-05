from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from sasubook import views

# api versioning
router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'user_files', views.UserFilesView, 'user_files')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="SasuBook API"))
] #Generate GET, POST, PUT, DELETE endpoints