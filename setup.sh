#!/bin/bash
# Crear un entorno virtual de Python
python -m venv sasubook-env

# Activar el entorno virtual
source sasubook-env/bin/activate

# Instalar las dependencias desde requirements.txt
pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

# Instalar dependencias de node desde package.json para electron
npm install

# Instalar dependencias de node desde package.json para el cliente Vite + React
cd client

npm install

cd ..

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@sasubook.com', 'admin')" | python manage.py shell

# Desactivar el entorno virtual
deactivate