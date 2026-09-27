const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.ttf': 'font/ttf' };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let name;
  try { name = decodeURIComponent(url.pathname); } catch { res.writeHead(400); return res.end(); }
  if (name === '/' || name === '/User/Default.aspx') name = '/index.html';
  const filename = path.resolve(root, '.' + name);
  if (!filename.startsWith(root + path.sep) || !['.html', '.css', '.js', '.jpg', '.png', '.gif', '.ico', '.woff', '.ttf', '.svg'].includes(path.extname(filename))) {
    res.writeHead(404); return res.end('Not found');
  }
  fs.readFile(filename, (error, data) => {
    if (error) { res.writeHead(404); return res.end('Not found'); }
    res.setHeader('Content-Type', types[path.extname(filename)] || 'application/octet-stream');
    res.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
