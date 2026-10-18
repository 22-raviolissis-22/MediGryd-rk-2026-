#!/usr/bin/env node
/**
 * IPv4 static preview on 43123. Cursor's preview proxy often fails against
 * Metro's IPv6 + websocket server even when curl from the VM succeeds.
 */
const fs = require('fs');
const http = require('http');
const path = require('path');

const PORT = Number(process.env.PREVIEW_PORT || 43123);
const ROOT = path.resolve(__dirname, '..', process.env.PREVIEW_DIR || 'web-dist');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent((urlPath || '/').split('?')[0]);
  const rel = decoded.replace(/^\/+/, '');
  const full = path.normalize(path.join(root, rel));
  if (!full.startsWith(root)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405);
    res.end();
    return;
  }

  let file = safeJoin(ROOT, req.url);
  if (!file) {
    res.writeHead(400);
    res.end('bad path');
    return;
  }

  const tryFiles = [];
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    tryFiles.push(path.join(file, 'index.html'));
  } else {
    tryFiles.push(file);
    tryFiles.push(path.join(ROOT, 'index.html'));
  }

  const found = tryFiles.find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
  if (!found) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
    return;
  }

  const ext = path.extname(found).toLowerCase();
  const body = fs.readFileSync(found);
  res.writeHead(200, {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  res.end(body);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`CalRx Assist preview http://127.0.0.1:${PORT}  root=${ROOT}`);
});
