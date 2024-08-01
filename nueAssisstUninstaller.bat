@echo off
for %%I in ("%~dp0.") do set "APP_DIRECTORY=%%~fI"

:: working directory
cd /d "%APP_DIRECTORY%"
echo TEST..
echo %APP_DIRECTORY%


call npm install node-windows
taskkill /f /im node.exe
echo Uninstalling NueAssist01
node unInstallNodeService.js
echo Succesfully uninstalled the Service......

::pause
