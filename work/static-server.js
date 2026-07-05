const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const OUTPUTS_DIR = path.join(__dirname, '..');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname;
  try {
    pathname = decodeURIComponent(parsedUrl.pathname);
  } catch (e) {
    res.writeHead(400); res.end("Bad Request"); return;
  }

  // API endpoint to list category images
  if (pathname === '/api/images') {
    const category = parsedUrl.query.category;
    const folderMap = {
      'social': 'Social',
      'logos': 'logos',
      'branding': 'branding',
      'posters': 'posters',
      'print': 'print'
    };

    const folderName = folderMap[category] || category;
    if (!folderName) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing or invalid category' }));
    }

    const dirPath = path.join(OUTPUTS_DIR, 'assets/images', folderName);
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Failed to read directory', details: err.message }));
      }

      // Filter for image files
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const images = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      });

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(images));
    });
    return;
  }

  // Rewrite / to /index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(OUTPUTS_DIR, pathname);

  // Check if file exists and is not a directory
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (stats && stats.isDirectory()) {
        const indexFile = path.join(filePath, 'index.html');
        fs.access(indexFile, fs.constants.F_OK, (err) => {
          if (!err) {
            serveFile(indexFile, res);
          } else {
            // Serve directory listing if enabled
            serveDirectoryListing(filePath, pathname, res);
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
      return;
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

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

function serveDirectoryListing(dirPath, pathname, res) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    const fileLinks = files.map(file => {
      let isDir = false;
      try {
        isDir = fs.statSync(path.join(dirPath, file)).isDirectory();
      } catch (e) {}
      const name = isDir ? file + '/' : file;
      return `<li><a href="${name}">${name}</a></li>`;
    }).join('');

    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Index of ${pathname}</title></head>
      <body>
        <h1>Index of ${pathname}</h1>
        <ul>
          <li><a href="../">../</a></li>
          ${fileLinks}
        </ul>
      </body>
      </html>
    `);
  });
}

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
