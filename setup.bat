@echo off
REM Crear un entorno virtual de Python
python -m venv sasubook-env

REM Activar el entorno virtual
call sasubook-env/Scripts/activate

REM Instalar las dependencias desde requirements.txt
pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@sasubook.com', 'admin')" | python manage.py shell

REM Instalar dependencias de node desde package.json para electron
start npm install

npm audit fix

REM Instalar dependencias de node desde package.json para el cliente Vite + React
cd client

npm install

npm audit fix

cd ..

REM Desactivar el entorno virtual
deactivate

pause