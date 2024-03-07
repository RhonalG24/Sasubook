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
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="SasuBook API")),
    path('api/v1/convert_pdf_to_audio/', views.ConvertPDFToAudio.as_view(), name='convert_pdf_to_audio'),
    path('pdf/upload', views.PdfUploadView, name='PdfUploadView'),
    path("pdfs/", views.PdfListView.as_view(), name="pdf-list-view"),
    # path("pdfs/<int:pk>/", views.PdfDetailView.as_view(), name="pdf-detail-view"),
    
    # path('api/v1/tts/voices/', views.get_voices(), name='get_voices')
] #Generate GET, POST, PUT, DELETE endpoints