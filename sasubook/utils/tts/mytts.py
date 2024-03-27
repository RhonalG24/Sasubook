import os
import pyttsx3

engine = pyttsx3.init(driverName=None, debug=True)
voices = engine.getProperty('voices')

selected_voice_id = ''
country = "Mexico"
for voice in voices:
    if country in voice.name:
        selected_voice_id = voice.id
        
engine.setProperty('voice', selected_voice_id)
text = "Gigi, ¿qué quieres para cenar?"
engine.say(text)
engine.save_to_file(text, 'audio_sample2.mp3')
# C:\Users\Rhona\OneDrive\Documents\Projects\SasuBook\sasubook/views.py
engine.runAndWait()
# os.rename('C:\\Users\\Rhona\\OneDrive\\Documents\\Projects\\SasuBook\\audio_sample2.mp3', 'tmp/my_audio_sample.mp3')
engine.stop
# engine = pyttsx3.init()
# voices = engine.getProperty('voices')
# for voice in voices:
#     print(voice, voice.id)
#     engine.setProperty('voice', voice.id)
#     if "Mexico" in voice.name:
#         # texto = "Es en este contexto que surge la necesidad de crear una herramienta que permita transformar archivos de texto en archivos de audio. Esta tecnología facilitará el acceso a la información escrita de una manera más inclusiva y flexible, brindando a las personas con dificultades de lectura, ya sean permanentes o temporales, la oportunidad de acceder a conocimientos y contenidos de interés de manera más cómoda y eficiente."
#         # engine.say(texto)
#         # engine.say("Si la vida te da limones, exprímeselos en los ojos!")
#         engine.say("Gigi, ¿qué quieres para cenar?")
#     # elif "David" in voice.name:
#     #     text = "Amino acids are organic compounds that contain both amino and carboxylic acid functional groups. Although over 500 amino acids exist in nature, by far the most important are the 22 a-amino acids incorporated into proteins. Only these 22 appear in the genetic code of all life"
#     #     engine.say(text)
#     # else:
#     #     continue
#     engine.runAndWait()
#     engine.stop()


######################################################################################
    
# #     pip install pyttsx3
# # If you recieve errors such as No module named win32com.client, No module named win32, or No module named win32api, you will need to additionally install pypiwin32.

# # Usage :
# # import pyttsx3
# # engine = pyttsx3.init()
# # engine.say("I will speak this text")
# # engine.runAndWait()
# # Changing Voice , Rate and Volume :

# # import pyttsx3
# # engine = pyttsx3.init() # object creation

# # """ RATE"""
# # rate = engine.getProperty('rate')   # getting details of current speaking rate
# # print (rate)                        #printing current voice rate
# # engine.setProperty('rate', 125)     # setting up new voice rate


# # """VOLUME"""
# # volume = engine.getProperty('volume')   #getting to know current volume level (min=0 and max=1)
# # print (volume)                          #printing current volume level
# # engine.setProperty('volume',1.0)    # setting up volume level  between 0 and 1

# # """VOICE"""
# # voices = engine.getProperty('voices')       #getting details of current voice
# # #engine.setProperty('voice', voices[0].id)  #changing index, changes voices. o for male
# # engine.setProperty('voice', voices[1].id)   #changing index, changes voices. 1 for female

# # engine.say("Hello World!")
# # engine.say('My current speaking rate is ' + str(rate))
# # engine.runAndWait()
# # engine.stop()

# # """Saving Voice to a file"""
# # # On linux make sure that 'espeak' and 'ffmpeg' are installed
# # engine.save_to_file('Hello World', 'test.mp3')
# # engine.runAndWait()