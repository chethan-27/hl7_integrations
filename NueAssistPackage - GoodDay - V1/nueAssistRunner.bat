@echo off

for %%I in ("%~dp0.") do set "APP_DIRECTORY=%%~fI"

:: working directory
cd /d "%APP_DIRECTORY%"
echo %APP_DIRECTORY%


call npm install winston
call npm install winston-daily-rotate-file
call npm install node-windows

:: Run your nueAssistListener.js application using PM2
node installService.js

::  status PM2 processes
::pm2 list

::pause
