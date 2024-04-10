#!/bin/bash
# Crear un entorno virtual de Python
python3 -m venv sasubook-env

# Activar el entorno virtual
source .sasubook-env/bin/activate

# Instalar las dependencias desde requirements.txt
pip install -r requirements.txt

python3 manage.py makemigrations

python3 manage.py migrate

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@sasubook.com', 'admin')" | python3 manage.py shell

# Instalar dependencias de node desde package.json para electron
npm install

npm audit fix

# Instalar dependencias de node desde package.json para el cliente Vite + React
cd client

npm install

npm audit fix

cd ..

# Desactivar el entorno virtual
deactivate
