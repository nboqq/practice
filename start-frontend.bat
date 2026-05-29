@echo off
REM Start Frontend Server

echo.
echo ====================================
echo Starting Frontend Server...
echo ====================================
echo.

cd front
echo Frontend dependencies check...

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting frontend on http://localhost:5173
echo.
call npm run dev

pause
