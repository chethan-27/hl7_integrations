@echo off

set NODEJS_VERSION=14.21.3

:: Set the working directory to the location of the batch file
cd %~dp0

echo Downloading Node.js MSI...
curl -o node-setup.msi https://nodejs.org/dist/v%NODEJS_VERSION%/node-v%NODEJS_VERSION%-x64.msi

echo Installing Node.js...
msiexec /i node-setup.msi /qn /norestart
del node-setup.msi

echo Adding Node.js and npm to the PATH...
set "PATH=%PATH%;C:\Program Files\nodejs"
call node -v
call npm -v
::echo Installing PM2...
::call npm install -g pm2

echo Installed the NueAssist dependencies...

pause

