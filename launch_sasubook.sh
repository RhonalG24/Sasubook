#!/bin/bash

# Activar el entorno virtual
source sasubook-env/bin/activate

# Cambiar al directorio del cliente
cd client

# Iniciar el servidor de desarrollo de React con npm
npm run dev &

# Regresar al directorio anterior
cd ..

# Iniciar el servidor de desarrollo de Django
python manage.py runserver &

# Iniciar npm run sasubook
npm run sasubook &