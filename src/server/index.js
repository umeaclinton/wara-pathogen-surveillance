/**
 * ==============================================================================
 * BIO-SURVEILLANCE HTTP WEB SERVER & API GATEWAY
 * Author: Michael (CTO & Lead Engineer)
 * Zero-dependency native Node.js HTTP server (Serves UI + REST API)
 * ==============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const {
  getIsolatesHandler,
  getIsolateByCodeHandler,
  getSurveillanceSummaryHandler,
  diagnoseHandler,
} = require('../api/routes');

const PORT = process.env.PORT || 3030;
const PUBLIC_DIR = path.join(__dirname, '..', '..', 'public');

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // --- REST API ENDPOINTS ---
  if (pathname === '/api/surveillance/summary' && method === 'GET') {
    const summary = getSurveillanceSummaryHandler();
    sendJson(res, 200, summary);
    return;
  }

  if (pathname === '/api/isolates' && method === 'GET') {
    const data = getIsolatesHandler(parsedUrl.query);
    sendJson(res, 200, data);
    return;
  }

  if (pathname.startsWith('/api/isolates/') && method === 'GET') {
    const code = pathname.split('/')[3];
    const data = getIsolateByCodeHandler(code);
    sendJson(res, data.statusCode || 200, data);
    return;
  }

  if (pathname === '/api/diagnose' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const diagnosis = diagnoseHandler(payload);
        sendJson(res, diagnosis.statusCode || 200, diagnosis);
      } catch (err) {
        sendJson(res, 400, { error: 'Invalid JSON body' });
      }
    });
    return;
  }

  // --- STATIC FRONTEND DELIVERY ---
  if (pathname === '/' || pathname === '/index.html') {
    sendFile(res, path.join(PUBLIC_DIR, 'index.html'), 'text/html');
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🔬 WaraBio-Surveillance Platform Live at:`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   • GET  http://localhost:${PORT}/api/surveillance/summary`);
  console.log(`   • GET  http://localhost:${PORT}/api/isolates`);
  console.log(`   • POST http://localhost:${PORT}/api/diagnose`);
  console.log(`======================================================\n`);
});

module.exports = server;
