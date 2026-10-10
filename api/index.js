const url = require('url');
const {
  getIsolatesHandler,
  getIsolateByCodeHandler,
  getSurveillanceSummaryHandler,
  diagnoseHandler,
} = require('../src/api/routes');

module.exports = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (pathname === '/api/surveillance/summary' && method === 'GET') {
    const summary = getSurveillanceSummaryHandler();
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(summary));
    return;
  }

  if (pathname === '/api/isolates' && method === 'GET') {
    const data = getIsolatesHandler(parsedUrl.query);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(data));
    return;
  }

  if (pathname.startsWith('/api/isolates/') && method === 'GET') {
    const code = pathname.split('/')[3];
    const data = getIsolateByCodeHandler(code);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = data.statusCode || 200;
    res.end(JSON.stringify(data));
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
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = diagnosis.statusCode || 200;
        res.end(JSON.stringify(diagnosis));
      } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Not Found' }));
};
