// Bağımlılıksız küçük statik sunucu: müzik dosyası (cfg.music) tarayıcıda fetch ile yüklenebilsin diye.
//   node serve.mjs  →  http://localhost:8080/  (PORT ortam değişkeniyle değiştirilebilir)
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg' };
export function serve(port = Number(process.env.PORT) || 8080) {
  return new Promise((res) => {
    const s = http.createServer(async (req, rsp) => {
      try {
        let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html';
        const f = path.join(root, p); if (!f.startsWith(root)) throw 0;
        const b = await readFile(f); rsp.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream', 'Accept-Ranges': 'none' }); rsp.end(b);
      } catch { rsp.writeHead(404); rsp.end('yok'); }
    }).listen(port, () => res(s));
  });
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) serve().then(() => console.log('http://localhost:' + (process.env.PORT || 8080) + '/'));
