#!/usr/bin/env node
/**
 * IPv4 static preview on 43123.
 *
 * Cursor Preview still speaks Metro: it fetches /index.ts.bundle and /status.
 * If those return the SPA HTML, the iframe runs HTML as JS, crashes, and reloads.
 * Serve real JavaScript for bundle URLs and Metro-shaped JSON/text for tooling paths.
 */
const fs = require('fs');
const http = require('http');
const path = require('path');

const PORT = Number(process.env.PREVIEW_PORT || 43123);
const ROOT = path.resolve(__dirname, '..', process.env.PREVIEW_DIR || 'dist');

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

const METRO_TOOLING =
  /^\/(status|hot|reload|onchange|message|symbolicate|inspector|json|debugger-ui|launch-js-devtools|open-stack-frame|open-in-editor|assets\/src)(\/|$)/i;

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

function send(res, method, file, type, extraHeaders) {
  const body = fs.readFileSync(file);
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  });
  if (method === 'HEAD') {
    res.end();
    return;
  }
  res.end(body);
}

function sendText(res, method, code, type, body) {
  res.writeHead(code, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff',
  });
  if (method === 'HEAD') {
    res.end();
    return;
  }
  res.end(body);
}

function isBundlePath(urlPath) {
  if (/\.bundle$/i.test(urlPath)) return true;
  if (/\/index\.(ts|tsx|js|bundle)$/i.test(urlPath)) return true;
  if (urlPath === '/index.ts.bundle' || urlPath === '/index.bundle') return true;
  return false;
}

function htmlDocument() {
  const index = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(index, 'utf8');
  html = html.replace(
    /<script src="\/_expo\/static\/js\/web\/[^"]+" defer><\/script>/,
    '<script src="/index.ts.bundle" defer></script>'
  );
  if (!html.includes('/index.ts.bundle')) {
    html = html.replace(
      '</body>',
      '<script src="/index.ts.bundle" defer></script></body>'
    );
  }
  return html;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405);
    res.end();
    return;
  }

  const urlPath = (req.url || '/').split('?')[0];

  if (METRO_TOOLING.test(urlPath) || urlPath === '/status') {
    if (urlPath === '/status' || urlPath.startsWith('/status')) {
      sendText(res, req.method, 200, 'text/plain; charset=utf-8', 'packager-status:running');
      return;
    }
    sendText(res, req.method, 204, 'text/plain; charset=utf-8', '');
    return;
  }

  if (isBundlePath(urlPath)) {
    const js = exportedJs();
    if (!js) {
      sendText(res, req.method, 404, 'text/plain; charset=utf-8', 'bundle not built');
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

  if (file.endsWith(`${path.sep}index.html`) || urlPath === '/' || urlPath === '/index.html') {
    const html = htmlDocument();
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    res.end(html);
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    const ext = path.extname(file).toLowerCase();
    send(res, req.method, file, TYPES[ext] || 'application/octet-stream');
    return;
  }

  if (ASSET_EXT.test(urlPath)) {
    sendText(res, req.method, 404, 'text/plain; charset=utf-8', 'not found');
    return;
  }

  const accept = String(req.headers.accept || '');
  if (accept.includes('text/html') || urlPath === '/') {
    const html = htmlDocument();
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    res.end(html);
    return;
  }

  sendText(res, req.method, 404, 'text/plain; charset=utf-8', 'not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`MediGryd preview http://127.0.0.1:${PORT}  root=${ROOT}`);
});
