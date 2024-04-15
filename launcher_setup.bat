@echo off

echo Initializing launcher configurations...

call npm install

call npm audit fix

echo Launcher configurations done!

call exit