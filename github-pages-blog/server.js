const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Sanitize path to prevent directory traversal
  let requestedPath = req.url === '/' ? 'index.html' : req.url;
  // Remove query string
  requestedPath = requestedPath.split('?')[0];
  // Normalize and ensure path stays within DIR
  const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(DIR, normalizedPath);
  // Verify the resolved path is within DIR
  if (!filePath.startsWith(DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(DIR, 'index.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
  console.log(`Serving: ${DIR}`);
});