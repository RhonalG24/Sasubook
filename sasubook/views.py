# from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UserSerializer, UserFileSerializer
from .models import User, UserFile

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from io import BytesIO
import pypdf
import pyttsx3

import win32com.client
import pythoncom

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
class UserFilesView(viewsets.ModelViewSet):
    serializer_class = UserFileSerializer
    queryset = UserFile.objects.all()

from .serializer import PDFSerializer
from django.http import FileResponse, HttpResponse

def get_voices():
        engine = pyttsx3.init()
        voices = engine.getProperty('voices')
        return voices

class ConvertPDFToAudio(APIView):
    def get_voices(self, request):
        engine = pyttsx3.init()
        voices = engine.getProperty('voices')
        return voices
        
    def post(self, request):
        serializer = PDFSerializer(data=request.data)
        xl=win32com.client.Dispatch("Excel.Application",pythoncom.CoInitialize())
        if serializer.is_valid():
            pdf_file = serializer.validated_data['pdf']
            
            from_page = serializer.validated_data['from_page'] - 1
            to_page = serializer.validated_data['to_page'] # no le resto uno porque el range es "hasta sin incluir"
            rate = int(serializer.validated_data['rate'])
            # language = serializer.validated_data['language']
            gender = int(serializer.validated_data['gender'])
            
            print(from_page) # funciona
            print(to_page) # funciona
            
            
            pdf = pypdf.PdfReader(pdf_file)
            if (to_page)  > len(pdf.pages):
                to_page = len(pdf.pages)
            text = str()
            
            print(len(pdf.pages))
            
            ############################# Extracción del texto #############################
            if from_page != None:
                page_number = from_page

                while page_number < to_page:
                    text += pdf.pages[page_number].extract_text()
                    page_number += 1
            else:        
                for page in pdf.pages:
                    # print(page.extract_text())
                    text += page.extract_text() #FUNCIONA
                    
            # print(text)
            text_array = text.split()
            text_to_read = ' '.join(text_array)

            # print(text_to_read)
            
            text_worked = text.replace('.', '. \n' )
            text_worked = text_worked.replace(' -', ', ' )
            text_worked = text_worked.replace('-', ' ' )
            text_worked = text_worked.replace('V ', 'V' )


            print(text_worked)
            
            ############################# Conversion a voz #############################
            engine = pyttsx3.init()
            ############################# Set voice #############################
            voices = engine.getProperty('voices')

            selected_voice_id = ''
            country = "Mexico"
            for voice in voices:
                if country in voice.name:
                    # if gender != None:
                    #     selected_voice_id = voice[gender].id
                    # else:
                    selected_voice_id = voice.id
                    
            if rate != None:
                engine.setProperty('rate', rate)
            
            # if gender != None:
            #     engine.setProperty('voice', voices[gender].selected_voice_id)
            #     engine.setProperty('voice', voices[1].id) 
            # else:
            #     engine.setProperty('voice', selected_voice_id)
            engine.setProperty('voice', selected_voice_id)
                
            
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