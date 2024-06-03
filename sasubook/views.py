from django.forms import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.exceptions import AuthenticationFailed

from sasubook.forms import UploadPdfForm
from sasubook.handlers.ConvertPDFToAudioHandler import ConvertPDFToAudioHandler
from sasubook.utils.auth.auth import create_token, get_payload, get_payload_from_GET_request
from sasubook.utils.pdf.PdfControllerHelper import PdfControllerHelper
from sasubook_api.settings import SECRET_KEY
from sasubook import serializers

from .serializers import AppUserSerializer, UploadPdfSerializer, UserPdfFileSerializer
from .validations import custom_validation 
from .models import AppUser, PdfFile, UserPdfFile

# Create your views here.
class RegisterView(APIView):
	def post(self, request):
		try:
			validated_data = custom_validation(request.data)
		except ValidationError as e:
			print(e.message)
			return Response(data=e.message, status=status.HTTP_400_BAD_REQUEST)
		serializer = AppUserSerializer(data=validated_data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		response = Response()
		# response.headers({'Access-Control-Allow-Credentials': 'True'})
		# response['Access-Control-Allow-Origin'] = True
		# response['Access-Control-Allow-Credentials'] = True
		response.data = serializer.data
		# return Response(serializer.data)
		return response


class LoginView(APIView):
	def post(self, request):
		email = request.data['email']
		password = request.data['password']

		user = AppUser.objects.filter(email=email).first()
		# print(f'name: {user.name}')
		# print(f'id: {user.id}')

		if user is None:
			return Response(data="El email ingresado no se encuentra registrado en el sistema", status=status.HTTP_404_NOT_FOUND)
			# raise AuthenticationFailed('User not found!')

		if not user.check_password(password):
			return Response(data="Contraseña incorrecta", status=status.HTTP_400_BAD_REQUEST)
			# raise AuthenticationFailed('Incorrect password!')	
		
		token = create_token(user)

		# payload = {
		#     'id': user.id,
		#     'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
		#     'iat': datetime.datetime.utcnow()
		# }

		# # token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
		# # token = jwt.encode(payload, SECRET_KEY, algorithm='HS256').decode('utf-8')
		# token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

		response = Response()
		# response.headers({'Access-Control-Allow-Credentials': 'True'})
		# response['Access-Control-Allow-Origin'] = True
		# response['Access-Control-Allow-Credentials'] = True

		# response.set_cookie(key='jwt', value=token, httponly=True)
		response.set_cookie(key='jwt', value=token, httponly=True)
		response.data = {
			'jwt': token,
			'user': {
				'name': user.name,
				'id': user.id
			}
		}
		
		# print(response.data)
		return response



class UserView(APIView):

	def get(self, request):
		# token = request.COOKIES.get('jwt')
		# print(token)

		# if not token:
		#     raise AuthenticationFailed('Unauthenticated!')

		# try:
		#     payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
		# except jwt.ExpiredSignatureError:
		#     raise AuthenticationFailed('Unauthenticated!')
		
		# print(request.GET.get('jwt'))
		##Funciona
		
		try: 
			payload = get_payload_from_GET_request(request)
			# payload = get_payload(request)
		except AuthenticationFailed as e:
			return Response(data=e.detail)
			raise AuthenticationFailed('Unauthenticated!')

		# user = AppUser.objects.filter(id=payload['id']).first()
		user = AppUser.objects.filter(id=payload['id']).first()
		serializer = AppUserSerializer(user)
		return Response(serializer.data)


class LogoutView(APIView):
	def post(self, request):
		response = Response()
		response.delete_cookie('jwt')
		response.data = {
			'message': 'success'
		}
		return response

from django.http import HttpResponse

class UserFilesView(viewsets.ModelViewSet):
	serializer_class = UserPdfFileSerializer
	queryset = UserPdfFile.objects.all()

def PdfUploadView(request):
	print(request.method)
	if request.method == 'POST':
		print('entró por el post')
		form = UploadPdfForm(request.POST, request.FILES)
		print('pasó la creación del form')
		print(form)
		if form.is_valid():
			print('is valid form')
			form.save()
			return HttpResponse('The file is saved')
		else:
			print('is not valid form')
			return HttpResponse('The file is not valid')
	else:
		# print("Method not Post")
		# form = UploadPdfForm()
		# context = {
		# 	'form': form
		# }
		# return render(request, 'sasubook_templates/UploadPdf.html', context)
		data = PdfFile.objects.all()
		return HttpResponse(data)

# def GetUserFilesView(request):
# 	if request.method != 'GET':
# 		return HttpResponse('Invalid method')
# 	else:
# 		print(request)
# 		user_id = request.data['user_id']
# 		files = PdfFile.objects.filter(user_id=user_id)
# 		if files is None:
# 			raise AuthenticationFailed('Files not found!')
# 		return Response(files)
		

from rest_framework import generics

class PdfListView(generics.ListCreateAPIView): #retrieve all PDF's
	queryset = PdfFile.objects.all()
	serializer_class = UploadPdfSerializer
	
class PdfDetailView(generics.RetrieveUpdateDestroyAPIView): #retrieve by PDF's id.
	serializer_class = UploadPdfSerializer
	queryset = PdfFile.objects.all()
	lookup_field = 'id'

	def get_queryset(self):
		queryset = super().get_queryset()
		id = self.kwargs.get('id')
		if id:
			queryset = queryset.filter(id=id)
		
		return queryset

	def perform_destroy(self, instance):
		instance.file.delete() #delete from storage
		instance.delete() #delete the object from the database

	def delete(self, request, *args, **kwargs):
		id = self.kwargs.get('id')
		file = PdfFile.objects.get(id=id)
		file.delete()
		# return super().delete(request, *args, **kwargs)

class DeletePdfView(generics.DestroyAPIView): #Delete PDF by pdf's id, this also destroy the file
	serializer_class = UploadPdfSerializer
	lookup_field = 'id'
	queryset = PdfFile.objects.all()

	def get_queryset(self):
		queryset = super().get_queryset()
		id = self.kwargs.get('id')
		if id:
			queryset = queryset.filter(id=id)
		
		return queryset

	def destroy(self, request, *args, **kwargs):
		try:
			payload = get_payload(self.request)
		except AuthenticationFailed as e:
			return Response(data=e.detail, status=status.HTTP_401_UNAUTHORIZED)
			raise AuthenticationFailed('Unauthenticated!')
		instance = self.get_object()
		self.perform_destroy(instance)
		return Response(status=status.HTTP_204_NO_CONTENT)

	def perform_destroy(self, instance):
		instance.file.delete() #delete from storage
		instance.delete() #delete the object from the database

class PdfListByUserView(generics.ListAPIView): #retrieve a list of PDF's by user_id
	serializer_class = UploadPdfSerializer

	def get_queryset(self):
		user_id = self.kwargs.get('user_id')
		queryset = PdfFile.objects.filter(user_id=user_id)
		return queryset
	
class PdfFileView(viewsets.ModelViewSet): #retrieve all PDF's
	serializer_class = UploadPdfSerializer
	queryset = PdfFile.objects.all()


# class PdfFileActionsView(APIView):
# 	serializer_class = UploadPdfSerializer
# 	queryset = PdfFile.objects.all()
# 	def get(self, request, *args, **kwargs):
		
# 		user_id = request.data['user_id']

# 		files = PdfFile.objects.filter(user_id=user_id)
# 		# print(f'name: {user.name}')
# 		# print(f'id: {user.id}')
# 		print(f'files: {files}')

# 		if files is None:
# 			raise AuthenticationFailed('Files not found!')
# 		return Response(files)
	
class ConvertPDFToAudio(APIView):
	def get(self, request, *args, **kwargs):
		pdf_controller_helper = PdfControllerHelper(None)
		response = HttpResponse(content_type='application/json')
		response.content = pdf_controller_helper.get_voices()

		return response

	def post(self, request, *args, **kwargs):
		
		try:
			handler = ConvertPDFToAudioHandler()
			response = HttpResponse(content_type= 'audio/mp3')
			response['Content-Disposition'] = 'attachment; filename="file.mp3"'
			response.content = handler.ConvertPDFToAudioByRequest(request=request)
			return response
		except ExceptionGroup("Hubo un error", [AuthenticationFailed, serializers.ValidationError, Exception]) as e:
			return Response(data=e.detail, status=status.HTTP_401_UNAUTHORIZED)
	

