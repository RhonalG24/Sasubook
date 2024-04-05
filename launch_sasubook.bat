@ECHO off

call sasubook-env/Scripts/activate  

cd client 

start /min npm run dev

cd..

start /min python manage.py runserver

start /min npm run sasubook