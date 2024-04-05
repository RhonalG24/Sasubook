@echo off
REM Crear un entorno virtual de Python
python -m venv sasubook-env

REM Activar el entorno virtual
call sasubook-env\Scripts\activate

REM Instalar las dependencias desde requirements.txt
pip install -r requirements.txt

REM Instalar dependencias de node desde package.json para electron
npm install

REM Instalar dependencias de node desde package.json para el cliente Vite + React
cd client
npm install
cd ..

REM Desactivar el entorno virtual
deactivate