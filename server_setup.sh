#!/bin/bash

echo Creating virtual enviroment...

# Crear un entorno virtual de Python
python3 -m venv sasubook-env

# Activar el entorno virtual
call sasubook-env/Scripts/activate

echo Collecting packages to install...

# Instalar las dependencias desde requirements.txt
pip install -r requirements.txt

python3 manage.py makemigrations

python3 manage.py migrate

# Crear un super usuario

echo Enter the data to create an administrator user:

python3 manage.py createsuperuser

# Desactivar el entorno virtual
deactivate

echo Server configurations done!