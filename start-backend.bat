@echo off
REM Start Backend Server

echo.
echo ====================================
echo Starting Backend Server...
echo ====================================
echo.

cd backend
echo Backend dependencies check...

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting backend on http://localhost:5000
echo.
call npm run dev

pause
