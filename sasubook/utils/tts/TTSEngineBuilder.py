from abc import ABC, abstractmethod

class TTSEngineBuilder(ABC):
    def __init__(self) -> None:
        self.__engine = None
    
    @property
    def engine(self):
        return self.__engine

    @abstractmethod
    def init_engine(self):
        pass
    
    @abstractmethod
    def build_engine(self):
        pass
    
    @abstractmethod
    def stop_engine(self):
        pass
        
    def reset_engine(self):
        self.stop_engine()
        self.init_engine()
    
    @abstractmethod
    def set_voice(self, voice_id):
        pass