@echo off
cd /d c:\task-manager
echo Starting HTTP Server on http://localhost:8000
echo Press Ctrl+C to stop

REM Try to start a simple HTTP server using Python
python -m http.server 8000 2>nul || (
    echo Python not found. Trying Node.js...
    node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer((req, res) => { let url = req.url === '/' ? '/index.html' : req.url; const filePath = path.join('c:\\task-manager', url); fs.readFile(filePath, (err, data) => { if (err) { res.writeHead(404); res.end('Not Found'); } else { res.writeHead(200); res.end(data); } }); }); server.listen(8000, () => console.log('Server running on http://localhost:8000')); " 2>nul || (
        echo Neither Python nor Node.js found. Using built-in test server...
        powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
    )
)
