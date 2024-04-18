# Sasubook

Sasubook es un proyecto que busca facilitar el acceso a la información escrita de una manera más inclusiva y flexible, brindando a las personas con dificultades de lectura, ya sean permanentes o temporales, la oportunidad de acceder a conocimientos y contenidos de interés de manera más cómoda y eficiente. 

El desarrollo de este proyecto puede ayudar a mejorar la calidad de vida de las personas que tienen dificultades para leer o que no poseen el tiempo necesario para realizar esta actividad. Además, es un paso importante hacia la construcción de una sociedad más inclusiva y equitativa en el acceso a la información.

## Cómo configurar Sasubook en tu equipo
Se debe clonar o descargar el proyecto desde [Github](https://github.com/RhonalG24/Sasubook). 

### Usuarios Windows
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
- sudo apt install libespeak1
- sudo apt install ffmpeg
Estos son necesarios para el correcto funcionamiento de la biblioteca pyttsx3 de Python, necesaria para el procesamiento de los archivos PDF

Una vez finalice la configuración ya se podrá ejecutar el programa.

## Ejecutar el programa

Para ejecutar el programa se debe ejecutar el archivo *launch_sasubook.bat* si se está en el sistema operativo Windows. Si se está en Linux se debe ejecutar el archivo *launch_sasubook.sh*. **Se debe haber realizado la configuración de Sasubook previamente**

## Entrar al portal de administrador
Para entrar a la pagína de administrador de Django para editar usuarios se puede hacer de dos formas:
  Opción 1: Ejecutar el archivo launch_sasubook_admin.bat
  Opción 2: Abrir en el navegador de tu preferencia la url [admin](http://localhost:8000/admin/) **después de haber ejecutado el archivo launch_sasubook.bat**

## Beneficios esperados del proyecto
1. Acceso equitativo a la información: La herramienta de conversión de texto a audio abrirá las puertas del conocimiento a aquellas personas que enfrentan barreras para la lectura, facilitando el acceso a la información y favoreciendo la inclusión social. 
2. Optimización del tiempo: Las personas que cuentan con una agenda ocupada podrán aprovechar tiempos muertos, como desplazamientos, para escuchar información relevante a través de archivos de audio, maximizando así su tiempo y permitiéndoles mantenerse actualizados en sus áreas de interés. 
3. Fomento de la autonomía: Esta herramienta promoverá la autonomía de las personas que presentan dificultades en la lectura, permitiéndoles obtener información sin depender de terceros para que les lean o transcriban textos.
4. Apoyo educativo: En el ámbito educativo, esta herramienta se convertirá en una herramienta muy valiosa para docentes y estudiantes, ya que permitirá potenciar el aprendizaje y la comprensión de los contenidos, adaptando los materiales escritos a los diferentes estilos y ritmos de aprendizaje.