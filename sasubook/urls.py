from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from sasubook import views

# api versioning
router = routers.DefaultRouter()
# router.register(r'users', views.UserView, 'users')
# router.register(r'user_files', views.UserFilesView, 'user_files')
# router.register(r'voices', views.APIView, 'voices')
# router.register(r'convert_pdf_to_audio', views.ConvertPDFToAudio, 'convert_pdf_to_audio')

urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="SasuBook API")),
    path('api/v1/convert_pdf_to_audio/', views.ConvertPDFToAudio.as_view(), name='convert_pdf_to_audio'),
    # path('api/v1/tts/voices/', views.get_voices(), name='get_voices')
] #Generate GET, POST, PUT, DELETE endpoints