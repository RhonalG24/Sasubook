# from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from django.forms import ValidationError
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, viewsets

# from .serializer import UserSerializer, UserFileSerializer, UserRegisterSerializer, UserLoginSerializer
from .serializer import UserSerializer, UserRegisterSerializer, UserLoginSerializer
# from .models import User, UserFile
from .validations import custom_validation, validate_email, validate_password

from io import BytesIO
import pypdf
import pyttsx3

import win32com.client
import pythoncom

# Create your views here.

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    ##
    def post(self, request):
        validate_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=validate_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validate_data)
            if user:
                return Response(serializer.data, status= status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    ##
    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            try:
                user = serializer.check_user(data)
            # try:
            except ValidationError as e:
                return Response(e.message, status=status.HTTP_400_BAD_REQUEST)

            else:
                login(request, user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            # except Exception as e:
            #     return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
            # # return Response(user, status=status.HTTP_200_OK)
            # else:
            #     return Response(serializer.data, status=status.HTTP_200_OK)

class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    ##
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication, )
    ##
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

# class UserView(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()

# class UserFilesView(viewsets.ModelViewSet):
#     serializer_class = UserFileSerializer
#     queryset = UserFile.objects.all()

from .serializer import PDFSerializer
from django.http import FileResponse, HttpResponse
import json

def get_voices():
	engine = pyttsx3.init()
	voices = engine.getProperty('voices')
	# print(type(voices))
	my_voices = list()
	for voice in voices:
		my_voices.append({"name": f'{voice.name}', "id": f'{voice.id}'})
		# print(voice.name)
	return json.dumps(my_voices)

def is_google_doc(metadata):
	return 'Google' in metadata.producer

class ConvertPDFToAudio(APIView):
	def get(self, request, *args, **kwargs):

		# response = HttpResponse(content_type='application/json')
		response = HttpResponse()
		response.content = get_voices()
		# voices = get_voices()

		return response

	# def get_voices(self):
	#     engine = pyttsx3.init()
	#     voices = engine.getProperty('voices')
	#     response = HttpResponse()
	#     response.content = voices
	#     return response

	def post(self, request):
		serializer = PDFSerializer(data=request.data)
		xl=win32com.client.Dispatch("Excel.Application",pythoncom.CoInitialize())
		if serializer.is_valid():
			pdf_file = serializer.validated_data['pdf']

			from_page = serializer.validated_data['from_page'] - 1
			to_page = serializer.validated_data['to_page'] # no le resto uno porque el range es "hasta sin incluir"
			rate = int(serializer.validated_data['rate'])
			# language = serializer.validated_data['language']
			voice_selected = serializer.validated_data['voice']

			print(from_page) # funciona
			print(to_page) # funciona


			pdf = pypdf.PdfReader(pdf_file)


			############################# Extracción del metadata #############################
			meta = pdf.metadata

			print(meta.producer)

			############################# Seteo de la página final #############################
			if (to_page)  > len(pdf.pages):
				to_page = len(pdf.pages)
			text = str()

			print(len(pdf.pages))

			############################# Extracción del texto #############################
			if from_page != None:
				page_number = from_page

				while page_number < to_page:
					text += pdf.pages[page_number].extract_text().strip(' -•■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿') #FUNCIONA
					if is_google_doc(meta):
						text = text.split()
						text = ' '.join(text)

					page_number += 1
			else:
				for page in pdf.pages:
					# print(page.extract_text())
					# text += page.extract_text() #FUNCIONA
					text += page.extract_text().strip(' -•■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿') #FUNCIONA
					if is_google_doc(meta):
						text = text.split()
						text = ' '.join(text)

			# print(text)  For Google Docs
			text_array = text.split()
			text_to_read = ' '.join(text_array)

			# print(text_to_read)

			text_worked = text.strip(' -•')
			text_worked = text_worked.replace('\n-', '\n' )
			text_worked = text_worked.replace('\n', ' \n' )
			# text_worked = text_worked.replace('.', '. \n' )
			text_worked = text_worked.replace(' -', ', ' )
			text_worked = text_worked.replace('-', ',' )
			text_worked = text_worked.replace('V ', 'V' )
			text_worked = text_worked.replace(' ,', ' ' )
			text_worked = text_worked.replace(',.', '. ' )
			text_worked = text_worked.replace('.', '. ' )



			print(text_worked)

			############################# Conversion a voz #############################
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

			if rate != None:
				engine.setProperty('rate', rate)

			# if gender != None:
			#     engine.setProperty('voice', voices[gender].selected_voice_id)
			#     engine.setProperty('voice', voices[1].id)
			# else:
			#     engine.setProperty('voice', selected_voice_id)
			# engine.setProperty('voice', selected_voice_id)
			engine.setProperty('voice', voice_selected)


			############################# Generación del archivo de audio #############################
			output_file = 'audio_tmp.mp3'
			engine.save_to_file(text_to_read, output_file)
			engine.runAndWait()

			############################# Obteción de los bytes del archivo de audio para retornar #############################

			with open(f'./{output_file}', 'rb') as audio_tmp:
				datos_de_audio = audio_tmp.read()

				response = HttpResponse(content_type= 'audio/mp3')
				response['Content-Disposition'] = 'attachment; filename="file.mp3"'

				response.content = datos_de_audio

			# print(datos_de_audio)
			print(response)

			# return Response(audio_file, content_type='audio/mpeg')

			return response
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)