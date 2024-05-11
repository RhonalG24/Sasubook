import json
import pyttsx3
from sasubook import serializers
from sasubook.models import PdfFile

class PdfControllerHelper():
    def __init__(self, request) -> None:
        self.__request = request
        
    @property
    def request(self):
        return self.__request
        
    def get_voices(self, *args, **kwargs):
        engine = pyttsx3.init()
        voices = engine.getProperty('voices')
        # print(type(voices))
        my_voices = list()
        for voice in voices:
            my_voices.append({"name": f'{voice.name}', "id": f'{voice.id}'})
            # print(voice.name)
        return json.dumps(my_voices)

    def is_google_doc(self, metadata, *args, **kwargs):
        return 'Google' in metadata.producer

    def get_pdf_serializer(self):
        if self.request.POST.get('pdf_id'):
            serializer = serializers.PDFByIdSerializer(data=self.request.data)
        else:
            serializer = serializers.PDFSerializer(data=self.request.data)
        return serializer

    def get_pdf_properties(self, serializer):
        ################ Creación de objeto con las propiedades/configuraciones para la conversión  ################
        pdf_properties = {}
        pdf_properties['from_page'] = serializer.validated_data['from_page'] - 1
        pdf_properties['to_page'] = serializer.validated_data['to_page'] # no le resto uno porque el range es "hasta, sin incluir"
        pdf_properties['rate'] = int(serializer.validated_data['rate'])
        pdf_properties['selected_voice'] = serializer.validated_data['voice']
        return pdf_properties

    def get_all_pdf_data_by_pdf_id(self):
        serializer = serializers.PDFByIdSerializer(data=self.request.data)
        if serializer.is_valid(raise_exception=True):
            filtered_pdf = PdfFile.objects.filter(id=serializer.validated_data['pdf_id']).first()
            pdf_file = filtered_pdf.file
            pdf_properties = self.get_pdf_properties(serializer)
        return {'pdf_file' : pdf_file, 'pdf_properties' : pdf_properties}

    def get_all_pdf_data_by_request_body(self):
        serializer = serializers.PDFSerializer(data=self.request.data)
        if serializer.is_valid(raise_exception=True):
            pdf_file = serializer.validated_data['pdf']
            pdf_properties = self.get_pdf_properties(serializer)
        return {'pdf_file' : pdf_file, 'pdf_properties' : pdf_properties}

    def get_all_pdf_data(self):
        try:
            if self.request.POST.get('pdf_id'):
                pdf_file, pdf_properties = self.get_all_pdf_data_by_pdf_id().values()
            else:
                pdf_file, pdf_properties = self.get_all_pdf_data_by_request_body().values()
            return {'pdf_file' : pdf_file, 'pdf_properties' : pdf_properties}

        except serializers.ValidationError as ex:
            raise serializers.ValidationError(ex)
