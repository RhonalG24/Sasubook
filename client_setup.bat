@echo off

echo Initializing client configurations...

cd client

call npm install

call npm audit fix

echo Client configurations done!

call exit
