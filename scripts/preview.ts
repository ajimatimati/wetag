/**
 * weTag Unified Local Preview & Launcher
 * Allows testing and inspecting the full platform locally.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

export function startLocalStaticPreview(port: number = 5000) {
  const distDir = path.resolve(__dirname, '../apps/mobile/dist');
  
  if (!fs.existsSync(distDir)) {
    console.error(`❌ Mobile dist directory not found at ${distDir}. Run 'npx expo export --platform web' first.`);
    return;
  }

  const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };

  const server = http.createServer((req, res) => {
    let reqUrl = req.url || '/';
    if (reqUrl === '/') reqUrl = '/index.html';
    
    let filePath = path.join(distDir, reqUrl);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(port, () => {
    console.log(`\n🚀 weTag Mobile Client Preview is live at: http://localhost:${port}`);
    console.log(`📱 Previewing 15 static routes & modals (Home, Move, Stay, Messages, Profile, Booking, Listing Details)`);
    console.log(`🛡️ Admin Console can be launched with: cd apps/admin && npm start (Port 3000)\n`);
  });
}

startLocalStaticPreview(5000);

