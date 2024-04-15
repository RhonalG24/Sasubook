@echo off

@REM Activar el entorno virtual

call sasubook-env/Scripts/activate  

cd client 

@REM Iniciar el servidor de desarrollo de React con npm

start /min npm run client

cd..

@REM Iniciar el servidor de desarrollo de Django
start /min python manage.py runserver

@REM Iniciar npm run sasubook
start /min npm run admin