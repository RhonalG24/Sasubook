@echo off

echo Creating virtual enviroment...

@REM Crear un entorno virtual de Python
python -m venv sasubook-env

@REM Activar el entorno virtual
call sasubook-env/Scripts/activate

echo Collecting packages to install...

@REM Instalar las dependencias desde requirements.txt
pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

@REM Crear un super usuario

echo Enter the data to create an administrator user:

python manage.py createsuperuser

@REM Desactivar el entorno virtual
deactivate

echo Server configurations done!