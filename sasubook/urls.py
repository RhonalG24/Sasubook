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
router.register(r'pdfs', views.PdfFileView, 'pdf_file_view')
# router.register(r'pdfs/user_pdfs', views.PdfFileActionsView, 'user_pdfs')

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    path('docs/', include_docs_urls(title="SasuBook API")),
    path('api/v1/', include(router.urls)),
    path('api/v1/convert_pdf_to_audio/', views.ConvertPDFToAudio.as_view(), name='convert_pdf_to_audio'),
    # path('api/v1/pdfs/user_pdfs/', views.PdfFileActionsView.as_view(), name='user_pdfs'),
    path('pdf/upload', views.PdfUploadView, name='PdfUploadView'),
    path("pdfs/", views.PdfListView.as_view(), name="pdf-list-view"),
    path("pdfs/<int:id>/", views.PdfDetailView.as_view(), name="pdf-detail-view"),
    path("pdfs/delete/<int:id>/", views.DeletePdfView.as_view(), name="delete_pdf"),
    path("pdfs/user_pdfs/<int:user_id>/", views.PdfListByUserView.as_view(), name="pdf-list-by-user-view"),
    # path("pdfs/user_pdfs/", views.PdfDetailView.as_view(), name="user_pdfs"),
    # path("api/v1/pdfs/", views.PdfFileView.as_view(), name="pdf-file-view"),
    # path("api/v1/pdfs/user_pdfs", views.GetUserFilesView, name="user_pdfs"),
    
    # path('api/v1/tts/voices/', views.get_voices(), name='get_voices')
    # path('', include((router.urls)))
] #Generate GET, POST, PUT, DELETE endpoints
