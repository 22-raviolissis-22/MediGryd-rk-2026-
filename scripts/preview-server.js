#!/usr/bin/env node
/**
 * IPv4 static preview on 43123.
 * Cursor Preview still requests Metro's /index.ts.bundle — if that returns HTML,
 * the iframe executes HTML as JS, crashes, and reloads in a loop.
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
  '.ttf': 'font/ttf',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

const ASSET_EXT = /\.(js|css|map|json|png|jpe?g|svg|ico|woff2?|ttf|otf|bundle)(\?|$)/i;

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent((urlPath || '/').split('?')[0]);
  const rel = decoded.replace(/^\/+/, '');
  const full = path.normalize(path.join(root, rel));
  if (!full.startsWith(root)) return null;
  return full;
}

function exportedJs() {
  const dir = path.join(ROOT, '_expo', 'static', 'js', 'web');
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  if (files.length === 0) return null;
  files.sort();
  return path.join(dir, files[files.length - 1]);
}

function send(res, method, file, type) {
  const body = fs.readFileSync(file);
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });
  if (method === 'HEAD') {
    res.end();
    return;
  }
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405);
    res.end();
    return;
  }

  const urlPath = (req.url || '/').split('?')[0];

  if (
    urlPath === '/index.ts.bundle' ||
    urlPath === '/index.bundle' ||
    urlPath.endsWith('.bundle')
  ) {
    const js = exportedJs();
    if (!js) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('bundle not built');
      return;
    }
    send(res, req.method, js, 'application/javascript; charset=utf-8');
    return;
  }

  let file = safeJoin(ROOT, req.url);
  if (!file) {
    res.writeHead(400);
    res.end('bad path');
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  }

  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    const ext = path.extname(file).toLowerCase();
    send(res, req.method, file, TYPES[ext] || 'application/octet-stream');
    return;
  }

  if (ASSET_EXT.test(urlPath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
    return;
  }

  const index = path.join(ROOT, 'index.html');
  if (fs.existsSync(index)) {
    send(res, req.method, index, TYPES['.html']);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`MediGryd preview http://127.0.0.1:${PORT}  root=${ROOT}`);
});
