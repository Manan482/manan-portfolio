@echo off
set "PATH=C:\Users\sumit\.gemini\antigravity\scratch\bin\nodejs;%PATH%"
cd /d "C:\Users\sumit\.gemini\antigravity\scratch\manan-portfolio"
echo ===================================================
echo Starting Manan Mahajan Premium Portfolio Server...
echo Local: http://localhost:5173/
echo ===================================================
start http://localhost:5173/
npx vite --host 0.0.0.0 --port 5173
pause
