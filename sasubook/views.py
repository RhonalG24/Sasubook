from django.forms import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, viewsets
from sasubook.forms import UploadPdfForm
from sasubook.utils.auth.auth import create_token, get_payload, get_payload_from_GET_request

from sasubook.utils.pdf.PdfControllerHelper import PdfControllerHelper
from sasubook.utils.pdf.PyPdfHandler import PyPdfHandler
from sasubook.utils.system_verifications import is_os_windows
from sasubook.utils.tts.TTSEngineBuilder import TTSEngineBuilder
from sasubook_api.settings import SECRET_KEY

# from .serializer import UserSerializer, UserFileSerializer, UserRegisterSerializer, UserLoginSerializer
from .serializers import AppUserSerializer, JWTSerializer, PDFByIdSerializer, UploadPdfSerializer, UserPdfFileSerializer
# from .serializers import AppUserSerializer, UserSerializer, UserRegisterSerializer, UserLoginSerializer
# from .models import User, UserFile
from .validations import custom_validation

import pyttsx3

from sasubook import serializers

if is_os_windows():
	import win32com.client
	import pythoncom

# Create your views here.

# class UserRegister(APIView):
#     permission_classes = (permissions.AllowAny,)
#     ##
#     def post(self, request):
#         validate_data = custom_validation(request.data)
#         serializer = UserRegisterSerializer(data=validate_data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.create(validate_data)
#             if user:
#                 return Response(serializer.data, status= status.HTTP_201_CREATED)
#             return Response(status=status.HTTP_400_BAD_REQUEST)

# class UserLogin(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication,)
#     ##
#     def post(self, request):
#         data = request.data
#         assert validate_email(data)
#         assert validate_password(data)
#         serializer = UserLoginSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             try:
#                 user = serializer.check_user(data)
#             # try:
#             except ValidationError as e:
#                 return Response(e.message, status=status.HTTP_400_BAD_REQUEST)

#             else:
#                 login(request, user)
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             # except Exception as e:
#             #     return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
#             # # return Response(user, status=status.HTTP_200_OK)
#             # else:
#             #     return Response(serializer.data, status=status.HTTP_200_OK)

# class UserLogout(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = ()
#     ##
#     def post(self, request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)

# class UserView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     authentication_classes = (SessionAuthentication, )
#     ##
#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         return Response({'user': serializer.data}, status=status.HTTP_200_OK)

# class UserView(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()

# class UserFilesView(viewsets.ModelViewSet):
#     serializer_class = UserFileSerializer
#     queryset = UserFile.objects.all()

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
# from .serializers import UserSerializer
from .models import AppUser, PdfFile, UserPdfFile
import jwt, datetime


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

		response = HttpResponse(content_type='application/json')
		response.content = PdfControllerHelper.get_voices()

		return response

	def post(self, request, *args, **kwargs):
		try:
			payload = get_payload(request)
		except AuthenticationFailed as e:
			print(e)			
			return Response(data=e.detail, status=status.HTTP_401_UNAUTHORIZED)
			# raise AuthenticationFailed('Unauthenticated!')
  
		# print(f'payload: {payload["id"]}')

		if is_os_windows():
			xl=win32com.client.Dispatch("Excel.Application",pythoncom.CoInitialize())
		
		################ Obtengo los datos del pdf ################
		try:
			pdf_controller_helper = PdfControllerHelper(request=request)
			pdf_file, pdf_properties = pdf_controller_helper.get_all_pdf_data().values()
		except serializers.ValidationError as ex:
			return Response(ex, status=status.HTTP_400_BAD_REQUEST)

		pdfHandler = PyPdfHandler(pdf_file, pdf_properties)
		print(pdfHandler.to_page)
		for propertys in pdf_properties:
			print(propertys)

		############################# Extracción del texto #############################
		text = pdfHandler.extract_text()

		print(pdfHandler.text)
		############################# Conversion a voz #############################

		# ttsBuilder = TTSEngineBuilder(pdf_properties['rate'], pdf_properties['selected_voice'])
		# engine = ttsBuilder.build_engine


		engine = pyttsx3.init()
		############################# Set voice #############################
		# voices = engine.getProperty('voices')

		# selected_voice_id = ''
		# country = "Mexico"
		# for voice in voices:
		#     if country in voice.name:
		#         # if gender != None:
		#         #     selected_voice_id = voice[gender].id
		#         # else:
		#         selected_voice_id = voice.id

		if pdf_properties['rate'] != None:
			engine.setProperty('rate', pdf_properties['rate'])

		engine.setProperty('voice', pdf_properties['selected_voice'])


		############################# Generación del archivo de audio #############################
		output_file = 'audio_tmp.mp3'
		engine.save_to_file(text, output_file)
		engine.runAndWait()

		############################# Obteción de los bytes del archivo de audio para retornar #############################

		with open(f'./{output_file}', 'rb') as audio_tmp:
			datos_de_audio = audio_tmp.read()

			response = HttpResponse(content_type= 'audio/mp3')
			response['Content-Disposition'] = 'attachment; filename="file.mp3"'

			response.content = datos_de_audio

		# print(datos_de_audio)
		# print(response)

		# return Response(audio_file, content_type='audio/mpeg')

		return response

