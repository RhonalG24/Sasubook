#!/bin/bash

# Activar el entorno virtual

source sasubook-env/Scripts/activate  

cd client 

# Iniciar el servidor de desarrollo de React con npm

gnome-terminal -- bash -c 'npm run client' &

cd..

# Iniciar el servidor de desarrollo de Django
gnome-terminal -- bash -c 'python3 manage.py runserver' &

# Iniciar npm run sasubook
gnome-terminal -- bash -c 'npm run admin'