import pyttsx3    
from sasubook.utils.tts.TTSEngineBuilder import TTSEngineBuilder

class PyTTSx3EngineBuilder(TTSEngineBuilder):
    def __init__(self) -> None:
        super().__init__()
    
    # @property
    # def engine(self):
    #     return self.__engine

    # @engine.setter
    # def engine(self, engine):
    #     self.engine = engine    
    
    def init_engine(self):
        self.__engine = pyttsx3.init()
        
    def get_voices(self):
        # voices = self.engine.getProperty('voices')
        return self.engine.getProperty('voices')
        
    def set_rate(self, rate):
        self.__engine.setProperty('rate', rate)
        
    def set_voice(self, voice_id):
        self.__engine.setProperty('voice', voice_id)
    
    def build_engine(self):
        return self.__engine
    
    def stop_engine(self):
        self.__engine.stop()
        
    def reset_engine(self):
        self.stop_engine()
        self.init_engine()

    