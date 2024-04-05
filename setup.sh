#!/bin/bash
# Crear un entorno virtual de Python
python -m venv sasubook-env

# Activar el entorno virtual
source sasubook-env\bin\activate

# Instalar las dependencias desde requirements.txt
pip install -r requirements.txt

# Instalar dependencias de node desde package.json para electron
npm install

# Instalar dependencias de node desde package.json para el cliente Vite + React
cd client
npm install
cd ..

# Desactivar el entorno virtual
deactivate