@echo off

echo Initializing client configurations...

cd client

npm install

npm audit fix

echo Client configurations done!
