const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

function sanitizePath(requestPath) {
  // Remove query string
  const cleanPath = requestPath.split('?')[0];

  // Handle root path
  if (cleanPath === '/' || cleanPath === '') {
    return path.join(ROOT, 'index.html');
  }

  // Normalize path - remove leading slash
  const normalized = path.normalize(cleanPath).replace(/^[\/\\]+/, '');

  // Resolve to absolute path within ROOT
  const requestedPath = path.resolve(ROOT, normalized);

  // Ensure it's within ROOT (prevent path traversal)
  if (!requestedPath.startsWith(ROOT)) {
    return null;
  }

  return requestedPath;
}

const server = http.createServer((req, res) => {
  let filePath = sanitizePath(req.url);

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden: Path traversal attempt');
    return;
  }

  // Check if path is a directory
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try index.html for directories
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (err2, stats2) => {
        if (err2 || !stats2.isFile()) {
          // Try .html extension
          const htmlPath = filePath + '.html';
          fs.stat(htmlPath, (err3, stats3) => {
            if (err3 || !stats3.isFile()) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('404 Not Found');
              return;
            }
            serveFile(htmlPath, res);
          });
          return;
        }
        serveFile(indexPath, res);
      });
      return;
    }
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Serving from: ${ROOT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
  throw err;
});