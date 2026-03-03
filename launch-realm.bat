@echo off
echo Launching Master Keeper Realm...

:: Check if API server is running
curl -s http://localhost:3001/api/health >nul 2>nul
if %errorlevel% neq 0 (
    echo API server is not running. Starting it now...
    start "" start-api.bat
    timeout /t 5 >nul
)

:: Launch the game interface
start "" game\index.html

echo Master Keeper Realm is now active.
echo Access the interface in your browser.
echo.
echo To close the realm:
echo   1. Close the browser window
echo   2. Close the API server window (start-api.bat)
echo.
pause
