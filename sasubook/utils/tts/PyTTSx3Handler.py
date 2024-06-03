from sasubook.utils.tts.PyTTSx3EngineBuilder import PyTTSx3EngineBuilder
from sasubook.utils.tts.TTSHandler import TTSHandler

class PyTTSx3Handler(TTSHandler):
    def __init__(self, properties) -> None:
        self.__engine_builder = PyTTSx3EngineBuilder(properties=properties)
        self.__engine = self.engine_builder.build_engine()
        
    @property
    def engine_builder(self):
        return self.__engine_builder
    
    @engine_builder.setter
    def engine_builder(self, engine_builder):
        self.__engine_builder = engine_builder.build_engine()
    
    @property    
    def engine(self):
        return self.__engine
    
    @engine.setter
    def engine(self, new_engine):
        self.__engine = new_engine
        
    def set_volume(self, volume):
        self.__engine.setProperty('volume', volume)
        
    def get_volume(self):
        return self.engine.getProperty('volume')        
        # # volume = engine.getProperty('volume')   #getting to know current volume level (min=0 and max=1)
        # # print (volume)                          #printing current volume level
        # # engine.setProperty('volume',1.0)    # setting up volume level  between 0 and 1
    
    def set_rate(self, rate):
        self.__engine.setProperty('rate', rate)
    
    def get_rate(self):
        return self.engine.getProperty('rate')
        
    def set_voice(self, voice_id):
        self.__engine.setProperty('voice', voice_id)
        
    def get_voice(self):
        return self.engine.getProperty('voice')
        
    def speak(self, text):
        self.__engine.say(text)
        self.__engine.runAndWait()
    
    def save_to_file(self, text, file_name):
        self.__engine.save_to_file(text, file_name)
        self.__engine.runAndWait()
        # engine.save_to_file('Hello World', 'test.mp3')
        
        
# ttsBuilder = TTSEngineBuilder(rate, voice)
# engine = ttsBuilder.build()