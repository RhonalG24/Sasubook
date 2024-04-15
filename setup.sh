#!/bin/bash

# Asignación de permisos a los setup .sh

chmod +x client_setup.sh launch_sasubook_admin.sh launch_sasubook.sh launcher_setup.sh server_setup.sh

# Configuración del servidor
source server_setup.sh

# Configuración del servidor
gnome-terminal -- bash -c 'client_setup.sh'

# Instalar dependencias de node desde package.json para electron

gnome-terminal -- bash -c 'launcher_setup.sh'

echo Configurations done...

pause