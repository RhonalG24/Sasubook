from rest_framework.exceptions import AuthenticationFailed

from sasubook import serializers
from sasubook.utils.auth.auth import get_payload
from sasubook.utils.pdf.PdfControllerHelper import PdfControllerHelper
from sasubook.utils.pdf.PyPdfHandler import PyPdfHandler
from sasubook.utils.system_verifications import is_os_windows
from sasubook.utils.tts.PyTTSx3Handler import PyTTSx3Handler
if is_os_windows():
	import win32com.client
	import pythoncom

class ConvertPDFToAudioHandler():
    def __init__(self) -> None:
        pass
    
    def ConvertPDFToAudioByRequest(self, request):
        try:
            payload = get_payload(request)
        except AuthenticationFailed as e:
            print(e)			
            raise AuthenticationFailed('Unauthenticated!')
            # return Response(data=e.detail, status=status.HTTP_401_UNAUTHORIZED)

        # print(f'payload: {payload["id"]}')

        if is_os_windows():
            xl=win32com.client.Dispatch("Excel.Application",pythoncom.CoInitialize())
        
        ################ Obtengo los datos del pdf ################
        try:
            pdf_controller_helper = PdfControllerHelper(request=request)
            pdf_file, pdf_properties = pdf_controller_helper.get_all_pdf_data().values()
        except serializers.ValidationError as ex:
            raise serializers.ValidationError("Hubo un error en la carga del archivo")
            # return Response(ex, status=status.HTTP_400_BAD_REQUEST)

        pdfHandler = PyPdfHandler(pdf_file, pdf_properties)

        ############################# Extracción del texto #############################
        text = pdfHandler.extract_text()

        print(pdfHandler.text)
        ############################# Conversión a voz #############################

        try:
        
            ttsHandler = PyTTSx3Handler(properties=pdf_properties)

            ############################# Generación del archivo de audio #############################
            output_file = 'audio_tmp.mp3'
            ttsHandler.save_to_file(text, output_file)

            ############################# Obteción de los bytes del archivo de audio para retornar #############################
            datos_de_audio = None
            
            with open(f'./{output_file}', 'rb') as audio_tmp:
                datos_de_audio = audio_tmp.read()

            return datos_de_audio
        except Exception as ex:
            print(ex)
            raise Exception(ex)
            # return ex

