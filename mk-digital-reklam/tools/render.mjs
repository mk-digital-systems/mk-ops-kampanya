// MK DIGITAL SYSTEMS reklamını sabit kare hızıyla (varsayılan 30 fps, 1080x1920, config'teki toplam süre)
// kare kare çizer ve MP4 + WebM üretir. Müzik, tarayıcıdaki aynı sentezden alınır.
//   node render.mjs                 -> ../out/mk-digital-reklam.mp4 ve .webm
//   node render.mjs --stills 0,1.5  -> ../out/still-*.png (hızlı görsel kontrol)
//   CHROME_PATH=... ortam değişkeni ile tarayıcı yolunu değiştirebilirsiniz.
import puppeteer from 'puppeteer-core';
import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out'); mkdirSync(out, { recursive: true });
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
  .find((p) => p && existsSync(p));
if (!chrome) throw new Error('Chrome/Edge bulunamadı. CHROME_PATH ayarlayın.');

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--hide-scrollbars', '--force-color-profile=srgb'] });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
page.on('pageerror', (e) => { console.error('Sayfa hatası:', e.message); process.exitCode = 1; });
await page.goto(pathToFileURL(path.join(root, 'index.html')).href + '?render=1');
await page.evaluate(() => window.AD.ready);
const { duration, fps } = await page.evaluate(() => ({ duration: window.AD.duration, fps: window.AD.fps }));

const si = process.argv.indexOf('--stills');
if (si > 0) {
  for (const s of (process.argv[si + 1] || '0,1.5,4,10,15,20,24').split(',')) {
    await page.evaluate((t) => window.AD.seek(t), parseFloat(s));
    await page.screenshot({ path: path.join(out, `still-${s}.png`) });
  }
  await browser.close(); console.log('Kareler:', out); process.exit(process.exitCode || 0);
}

const frames = Math.round(duration * fps);
const wav = path.join(out, 'muzik.wav');
writeFileSync(wav, Buffer.from(await page.evaluate(() => window.AD.wavBase64()), 'base64'));

const run = (args) => new Promise((res, rej) => {
  const p = spawn(ffmpegPath, args, { stdio: ['pipe', 'inherit', 'inherit'] });
  p.on('close', (c) => (c ? rej(new Error('ffmpeg ' + c)) : res()));
  p.stdin.on('error', () => {});
  run.p = p;
});
const mp4 = path.join(out, 'mk-digital-reklam.mp4');
const common = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', '-i', wav];
// Tek geçişte iki çıktı: MP4 (H.264+AAC) ve WebM (VP9+Opus). -t ile süre tam 25 sn'ye kilitlenir.
const args = [...common,
  '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', String(fps), '-c:a', 'aac', '-b:a', '192k', '-t', String(duration), '-movflags', '+faststart', mp4,
  '-map', '0:v', '-map', '1:a', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '24', '-deadline', 'good', '-cpu-used', '5', '-row-mt', '1', '-pix_fmt', 'yuv420p', '-r', String(fps), '-c:a', 'libopus', '-b:a', '160k', '-t', String(duration), path.join(out, 'mk-digital-reklam.webm')];
const done = run(args);
const stdin = run.p.stdin;
for (let f = 0; f < frames; f++) {
  await page.evaluate((t) => window.AD.seek(t), f / fps);
  const png = await page.screenshot({ type: 'jpeg', quality: 96 });   // JPEG: PNG'den ~3x hızlı; H.264/VP9 zaten kayıplı
  if (!stdin.write(png)) await new Promise((r) => stdin.once('drain', r));
  if (f % 30 === 0) process.stdout.write(`\rKare ${f}/${frames}`);
}
stdin.end(); await done; await browser.close();
console.log(`\nTamam: ${out}`);
