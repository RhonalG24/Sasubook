import pypdf
from .PdfHandler import PdfHandler

class PyPdfHandler(PdfHandler):
    def __init__(self, pdf_file, pdf_properties):
        super().__init__(pdf_file, pdf_properties)
        self.__file = pypdf.PdfReader(pdf_file)
        
    @property
    def file(self):
        return self.__file
    
    def is_google_doc(self, metadata, *args, **kwargs):
        return 'Google' in metadata.producer
    
    def set_from_page(self):
        self.from_page = self.from_page if self.from_page != None else int(0)
    
    def set_to_page(self):
        total_pages = len(self.file.pages)
        self.to_page = total_pages if self.to_page > total_pages else self.to_page
    
    def extract_text(self):
        ############################# Seteo de la página inicial según configuración del usuario #############################
        self.set_from_page()
        # print(f'primera pagina: {self.from_page}')
        
        ############################# Seteo de la página final según configuración del usuario #############################
        self.set_to_page()
        # print(f'última pagina: {self.to_page}')
        
    	############################# Extracción del texto #############################
        text = str()
        actual_page = self.from_page

        while actual_page < self.to_page:
            text += self.file.pages[actual_page].extract_text().strip(' -•■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿') #FUNCIONA
            if self.is_google_doc(self.file.metadata):
                text = text.split()
                text = ' '.join(text)
            actual_page += 1
        
        text = text.replace('\n', ' ')
        text.strip(' -•')
        self.text = text
        return text