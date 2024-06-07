# Sasubook

Sasubook es un proyecto que busca facilitar el acceso a la información escrita de una manera más inclusiva y flexible, brindando a las personas con dificultades de lectura, ya sean permanentes o temporales, la oportunidad de acceder a conocimientos y contenidos de interés de manera más cómoda y eficiente. 

El desarrollo de este proyecto puede ayudar a mejorar la calidad de vida de las personas que tienen dificultades para leer o que no poseen el tiempo necesario para realizar esta actividad. Además, es un paso importante hacia la construcción de una sociedad más inclusiva y equitativa en el acceso a la información.

## Cómo configurar Sasubook en tu equipo
Se debe clonar o descargar el proyecto desde [Github](https://github.com/RhonalG24/Sasubook). 

### Usuarios Windows

Necesitaremos usar la consola de comandos (CMD) para verificar si se encuentran instaladas algunas herramientas. 

#### Abrir la Terminal de Comandos (CMD):
Para abrir la terminal de comando sigue los siguientes pasos:
1. Presiona la tecla Windows
2. Escribe "cmd" (sin comillas) en la barra de búsqueda.
3. Abre el programa "Consola de Comandos" desde los resultados de búsqueda. Esto abrirá la ventana de Consola.

#### Instalación de Node.js
Para verificar si se tiene Node.js instalado en el sistema operativo se debe ejecutar el siguiente comando en el CMD:
```
node -v
```
Esto mostrará la versión de Node.js instalada en su sistema.

En caso de no tener instalado Node.js verás un mensaje de error que te avisa que el comando no se reconoce en el sistema y se debe proceder con los siguientes pasos para instalar Node.js en Windows:

1. Descarga el instalador de Node.js desde el sitio oficial de [Node.js](https://nodejs.org/en/download). 
2. Ejecuta el instalador descargado y sigue las instrucciones del asistente de instalación.
3. Una vez completada la instalación, puedes verificar si Node.js se instaló correctamente abriendo la consola de comandos de Windows y ejecutando el comando node -v. Esto mostrará la versión de Node.js instalada en tu sistema.

#### Instalación de Python
Para verificar si se tiene Python instalado en el sistema operativo se debe ejecutar el siguiente comando en el CMD:
```
python --version. 
```
Esto mostrará la versión de Python instalada en tu sistema.

En caso de no tener instalado Python verás un mensaje de error que te avisa que el comando no se reconoce en el sistema y se debe proceder con los siguientes pasos para instalar Python en Windows: 

1. Descarga el instalador de Python desde el sitio web oficial de [Python](https://www.python.org/downloads/).
2. Ejecuta el archivo descargado (por ejemplo, python-3.9.7-amd64.exe) y sigue las instrucciones del instalador.
3. Durante la instalación, asegúrate de marcar la opción "Add Python x.x to PATH" antes de hacer clic en "Install Now". Esto facilitará la ejecución de Python desde la línea de comandos.
4. Una vez completada la instalación, puedes verificar si Python se instaló correctamente abriendo la línea de comandos de Windows y ejecutando el comando python --version. Esto mostrará la versión de Python instalada en tu sistema.

Siguiendo estos pasos, podrás instalar Python en tu sistema Windows de manera sencilla.

#### Configuración de Sasubook

Una vez se tenga el proyecto en el equipo se abre en el explorador de archivos y se ejecuta el archivo *setup.bat* si se está en el sistema operativo Windows. 

Es este paso se le solicitará los datos para **crear un usuario administrador**. Este usuario podrá entrar al portal de administrador para el manejo de usuarios del sistema. También podrá visualizar la totalidad de los archivos PDF cargados en el sistema a través de dicho portal.

Una vez finalice la configuración ya se podrá ejecutar el programa.

### Usuarios Linux
Si se está en Linux se debe ejecutar el archivo *setup.sh*. Si este no logra instalar las dependencias se deberá ejecutar individualmente los siguientes archivos: 
- client_setup.sh,
- launcher_setup.sh
- server_setup.sh
Estos se encuentran en el directorio raíz del proyecto e instalarán las dependencias necesarias para ejecutar el programa. 

Durante la ejecución del archivo server_setup.sh se le solicitará los datos para **crear un usuario administrador**. Este usuario podrá entrar al portal de administrador para el manejo de usuarios del sistema. También podrá visualizar la totalidad de los archivos PDF cargados en el sistema a través de dicho portal.

Adicionalmente, se deberá instalar en el sistema operativo las bibliotecas libespeak1 y ffmpeg ejecutando en una terminal los siguientes comandos:
```
sudo apt install libespeak1
sudo apt install ffmpeg
```

Estos son necesarios para el correcto funcionamiento de la biblioteca pyttsx3 de Python, necesaria para el procesamiento de los archivos PDF

Una vez finalice la configuración ya se podrá ejecutar el programa.

## Ejecutar el programa

Para ejecutar el programa se debe ejecutar el archivo *launch_sasubook.bat* si se está en el sistema operativo Windows. Si se está en Linux se debe ejecutar el archivo *launch_sasubook.sh*. **Se debe haber realizado la configuración de Sasubook previamente**

## Entrar al portal de administrador
Para entrar a la pagína de administrador de Django para editar usuarios se puede hacer de dos formas:
  Opción 1: Ejecutar el archivo launch_sasubook_admin.bat
  Opción 2: Abrir en el navegador de tu preferencia la url [admin](http://localhost:8000/admin/) **después de haber ejecutado el archivo launch_sasubook.bat**

## Agregar nuevas voces al programa

El programa utiliza las voces instaladas en el sistema operativo.

### Usuarios Windows
Para instalar nuevas voces en el sistema operativo siga las instrucciones de la página oficial del [Windows](https://support.microsoft.com/es-es/windows/ap%C3%A9ndice-a-idiomas-y-voces-compatibles-4486e345-7730-53da-fcfe-55cc64300f01)

Para agregar nuevas voces al programa se debe agregar la voz escogida (dentro de las instaladas en Windows) al archivo de registros de Windows. Para ello se debe hacer lo siguiente:

1. Presionar en el teclado la tecla Windows + r
2. Escriba "regedit" y presione la tecla Enter
3. Expanda Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech_OneCore\Voices\Tokens\ 
4. Una vez en este directorio se podrán observar todas las voces instaladas en el sistema operativo. Se debe hacer click derecho sobre el archivo de voz que se desea, por ejemplo "MSTTS_V110_esES_LauraM". Luego click en "Exportar" y seleccione su carpeta de voces de preferencia para guardar el archivo exportado. 
5. Abra el archivo exportado en un editor de texto y reemplace "Speech_OneCore" con "Speech" en todo el archivo y guarde los cambios.
Por ejemplo: el archivo MSTTS_V110_esES_LauraM es así:
```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech_OneCore\Voices\Tokens\MSTTS_V110_esES_LauraM]
@="Microsoft Laura - Spanish (Spain)"
"C0A"="Microsoft Laura - Spanish (Spain)"
[...]

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech_OneCore\Voices\Tokens\MSTTS_V110_esES_LauraM\Attributes]
"Age"="Adult"
[...]

```

Y después del cambio debe quedar así:

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\MSTTS_V110_esES_LauraM]
@="Microsoft Laura - Spanish (Spain)"
"C0A"="Microsoft Laura - Spanish (Spain)"
[...]

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\MSTTS_V110_esES_LauraM\Attributes]
"Age"="Adult"
[...]

```
6. Haga doble click en el archivo editado. Esto abrirá una ventana del Editor de Registros, presione "Sí". Cuando le pregunte si está seguro de que desea continua presione "Sí" nuevamente para agregar el archivo. Cuando le diga que el archivo se ha agregado al registro presione "OK".

Con esto puede iniciar nuevamente la aplicación y verá la nueva voz en el listado de voces disponibles.

## Beneficios esperados del proyecto
1. Acceso equitativo a la información: La herramienta de conversión de texto a audio abrirá las puertas del conocimiento a aquellas personas que enfrentan barreras para la lectura, facilitando el acceso a la información y favoreciendo la inclusión social. 
2. Optimización del tiempo: Las personas que cuentan con una agenda ocupada podrán aprovechar tiempos muertos, como desplazamientos, para escuchar información relevante a través de archivos de audio, maximizando así su tiempo y permitiéndoles mantenerse actualizados en sus áreas de interés. 
3. Fomento de la autonomía: Esta herramienta promoverá la autonomía de las personas que presentan dificultades en la lectura, permitiéndoles obtener información sin depender de terceros para que les lean o transcriban textos.
4. Apoyo educativo: En el ámbito educativo, esta herramienta se convertirá en una herramienta muy valiosa para docentes y estudiantes, ya que permitirá potenciar el aprendizaje y la comprensión de los contenidos, adaptando los materiales escritos a los diferentes estilos y ritmos de aprendizaje.