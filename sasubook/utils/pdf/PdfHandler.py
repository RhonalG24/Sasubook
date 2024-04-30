from abc import ABC, abstractmethod

class PdfHandler(ABC):    
    def __init__(self, pdf_file, pdf_properties):
        self.__pdf_file = pdf_file
        self.__from_page = pdf_properties['from_page']
        self.__to_page = pdf_properties['to_page']
        self.__text = ''
        
    @property
    def pdf_file(self):
        return self.__pdf_file
    
    @property
    def file(self):
        return self.__file
    
    @property
    def from_page(self):
        return self.__from_page
    
    @from_page.setter
    def from_page(self, new_from_page):
        self.__from_page = new_from_page
    
    @property
    def to_page(self):
        return self.__to_page
    
    @to_page.setter
    def to_page(self, new_to_page):
        self.__to_page = new_to_page
    
    @property
    def text(self):
        return self.__text

    @text.setter
    def text(self, new_text):
        self.__text = new_text
        
    def add_text(self, text):
        self.__text += text
    
    def erase_text(self):
        self.__text = ''
                
    @abstractmethod
    def extract_text(self):
        pass
    
    @abstractmethod
    def set_to_page(self):
        pass
    
#properties: text, pdf:File, page
        
# pdfHandler.get_text(pdf)
# return string
    
# pdfHandler = pdfHandler()









###################################################


			# if request.POST.get('pdf_id'):
			# 	filtered_pdf = PdfFile.objects.filter(id=serializer.validated_data['pdf_id']).first()
			# 	# print(PdfFile.objects.filter(id=serializer.validated_data['pdf_id']))
			# 	pdf_file = filtered_pdf.file
			# 	# print('entró por el POST.get dentro de la validación del serializer')

			# else:
			# 	pdf_serializer = PDFSerializer(data=request.data)
			# 	if pdf_serializer.is_valid():
			# 		pdf_file = pdf_serializer.validated_data['pdf']
			# 		# print('entró por el else del POST.get de la validación del serializer')
			# # print(serializer.validated_data['pdf_id'])
			# from_page = serializer.validated_data['from_page'] - 1
			# to_page = serializer.validated_data['to_page'] # no le resto uno porque el range es "hasta sin incluir"
			# rate = int(serializer.validated_data['rate'])
			# voice_selected = serializer.validated_data['voice']

			# # print(from_page) # funciona
			# # print(to_page) # funciona

			# # savePdfSerializer = UserPdfFileSerializer(data=pdf_file)
			# # if savePdfSerializer.is_valid():
			# # 	savePdfSerializer.save()

			# pdf = pypdf.PdfReader(pdf_file)


			# ############################# Extracción del metadata #############################
			# meta = pdf.metadata

			# print(meta.producer)

			# ############################# Seteo de la página final #############################
			# if (to_page)  > len(pdf.pages):
			# 	to_page = len(pdf.pages)
			# text = str()

			# # print(len(pdf.pages))

			# ############################# Extracción del texto #############################
			# if from_page != None:
			# 	page_number = from_page

			# 	while page_number < to_page:
			# 		text += pdf.pages[page_number].extract_text().strip(' -•■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿') #FUNCIONA
			# 		if self.is_google_doc(meta):
			# 			text = text.split()
			# 			text = ' '.join(text)

			# 		page_number += 1
			# else:
			# 	for page in pdf.pages:
			# 		# print(page.extract_text())
			# 		# text += page.extract_text() #FUNCIONA
			# 		text += page.extract_text().strip(' -•■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿') #FUNCIONA
			# 		if self.is_google_doc(meta):
			# 			text = text.split()
			# 			text = ' '.join(text)

			# # print(text)  For Google Docs
			# text_array = text.split()
			# text_to_read = ' '.join(text_array)

			# # print(text_to_read)

			# text_worked = text.strip(' -•')
			# # text_worked = text_worked.replace('\n-', '\n' )
			# # text_worked = text_worked.replace('\n', ' \n' )
			# # # text_worked = text_worked.replace('.', '. \n' )
			# # # text_worked = text_worked.replace(' -', ', ' )
			# # text_worked = text_worked.replace(' -', ' ' )
			# # # text_worked = text_worked.replace('-', ',' )
			# # text_worked = text_worked.replace('-', '' )
			# # text_worked = text_worked.replace('V ', 'V' )
			# # text_worked = text_worked.replace(' ,', ' ' )
			# # text_worked = text_worked.replace(',.', '. ' )
			# # text_worked = text_worked.replace('.', '. ' )



			# print(text_worked)








###################################################






















################# Para el modulo de texto a voz ######################
# TTSHandler
#properties: engine, text, voices, rate, volume, pdf:File

#__init__(self):
#    self.engine = pyttsx3.init()

    # @abstractmethod
    # def save_to_file(self):

# pdfHandler.save_to_file() 

# return string
# return string
# return string
# return string
# return string
# return string
# return string
# return string
# return string