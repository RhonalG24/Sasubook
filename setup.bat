@echo off

@REM Configuración del servidor
call server_setup.bat

@REM Configuración del servidor
start client_setup.bat

@REM Instalar dependencias de node desde package.json para electron

start launcher_setup.bat

echo Configurations done...

pause