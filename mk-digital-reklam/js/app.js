/* Oynatıcı, kontroller, tarayıcı kaydı ve dış API (window.AD). */
(function () {
  const cfg = window.AD_CONFIG, S = window.ADStage, D = S.total; // süre sahnelerden hesaplanır
  const $ = (id) => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const renderMode = params.has('render');
  if (renderMode) document.body.classList.add('render');

  if (!S.durationOk) {
    const w = $('warn'); w.style.display = 'flex';
    w.textContent = `HATA: Sahne sürelerinin toplamı ${S.total} sn; izin verilen en fazla ${cfg.maxDuration} sn. js/config.js içindeki "duration" değerlerini düzeltin.`;
    throw new Error('Süre aşımı: ' + S.total);
  }
  if (S.durationNote) $('msg').textContent = S.durationNote;
  if (params.has('safe')) document.body.classList.add('safe');
  $('safebtn').onclick = () => document.body.classList.toggle('safe');

  // ---- ölçekleme ----
  const fit = $('stage-fit'), stage = $('stage'), vp = $('viewport');
  function resize() {
    const s = renderMode ? 1 : Math.min(vp.clientWidth / S.W, vp.clientHeight / S.H) * (document.fullscreenElement ? 1 : 0.98);
    fit.style.width = S.W * s + 'px'; fit.style.height = S.H * s + 'px';
    stage.style.transform = `scale(${s})`;
  }
  addEventListener('resize', resize); resize();

  // ---- oynatıcı ----
  let t = 0, playing = false, ctx = null, gain = null, recDest = null, buf = null, src = null, ctxStart = 0, offset = 0, muted = false, raf = 0;

  // müziği sayfa açılır açılmaz arka planda hazırla (Oynat'a basınca beklemeyelim)
  const audioJob = renderMode ? null : window.ADAudio.buildAudio(cfg).catch((e) => { console.warn('Ses üretilemedi', e); return null; });
  async function ensureAudio() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      gain = ctx.createGain(); gain.connect(ctx.destination);
      recDest = ctx.createMediaStreamDestination(); gain.connect(recDest);
    }
    if (ctx.state === 'suspended') await ctx.resume();
    if (!buf) buf = await audioJob;
    if (window.ADAudio.warning) $('msg').textContent = window.ADAudio.warning;
  }
  function stopSrc() { if (src) { try { src.stop(); } catch (e) {} src.disconnect(); src = null; } }

  async function play() {
    if (t >= D - 0.01) t = 0;
    $('bigplay').classList.add('hide');
    if (!buf) $('msg').textContent = 'Ses hazırlanıyor…';
    try { await ensureAudio(); } catch (e) { console.warn('Ses başlatılamadı', e); }
    if (!window.ADAudio.warning) $('msg').textContent = S.durationNote || '';
    if (playing) return;
    offset = t;
    if (ctx && buf) {
      src = ctx.createBufferSource(); src.buffer = buf; src.connect(gain);
      ctxStart = ctx.currentTime + 0.02; src.start(ctxStart, offset);
    } else { ctxStart = performance.now() / 1000; }
    playing = true; syncUI(); loop();
  }
  function pause() { if (!playing) return; playing = false; stopSrc(); cancelAnimationFrame(raf); syncUI(); }
  function clock() {
    return ctx && buf ? offset + Math.max(0, ctx.currentTime - ctxStart) : offset + performance.now() / 1000 - ctxStart;
  }
  function loop() {
    if (!playing) return;
    t = clock();
    if (t >= D) { t = D; playing = false; stopSrc(); show(); syncUI(); onEnd(); return; }
    show(); raf = requestAnimationFrame(loop);
  }
  async function seek(x, resume) {
    const was = playing; pause();
    t = Math.min(D, Math.max(0, x)); show();
    if (was || resume) await play();
  }
  function show() {
    S.render(t);
    $('scrub').value = t;
    $('time').textContent = fmt(t) + ' / ' + fmt(D);
    const idx = cfg.scenes.findIndex((s) => t >= s.start && t < s.end);
    document.querySelectorAll('.seg').forEach((e, i) => e.classList.toggle('cur', i === idx));
    document.querySelectorAll('#scenebtns button').forEach((e, i) => e.classList.toggle('on', i === idx));
  }
  const fmt = (x) => Math.floor(x / 60) + ':' + (x % 60).toFixed(1).padStart(4, '0');
  function syncUI() { $('play').textContent = playing ? '⏸ Duraklat' : '▶ Oynat'; }
  let onEnd = () => {};

  // ---- arayüz ----
  cfg.scenes.forEach((s, i) => {
    const seg = document.createElement('div'); seg.className = 'seg';
    seg.style.left = (s.start / D) * 100 + '%'; seg.style.width = (s.duration / D) * 100 + '%'; $('segs').appendChild(seg);
    const b = document.createElement('button');
    b.textContent = `${s.start}–${s.end} sn · ${s.label}`; b.onclick = () => seek(s.start, true); $('scenebtns').appendChild(b);
  });
  $('scrub').max = D; $('time').textContent = fmt(0) + ' / ' + fmt(D);
  $('scrub').addEventListener('input', (e) => seek(parseFloat(e.target.value)));
  $('play').onclick = () => (playing ? pause() : play());
  $('bigplay').onclick = play;
  $('restart').onclick = () => seek(0, true);
  $('mute').onclick = () => { muted = !muted; if (gain) gain.gain.value = muted ? 0 : 1; $('mute').textContent = muted ? '🔇 Sessiz' : '🔊 Ses'; };
  $('full').onclick = () => (document.fullscreenElement ? document.exitFullscreen() : (vp.requestFullscreen || vp.webkitRequestFullscreen).call(vp));
  document.addEventListener('fullscreenchange', resize);
  addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); playing ? pause() : play(); }
    if (e.key === 'ArrowLeft') seek(t - 1); if (e.key === 'ArrowRight') seek(t + 1);
  });

  function download(blob, name) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }
  $('wav').onclick = async () => {
    $('msg').textContent = 'Müzik üretiliyor…';
    const b = await window.ADAudio.buildAudio(cfg);
    download(new Blob([window.ADAudio.toWav(b)], { type: 'audio/wav' }), 'mk-digital-reklam.wav'); $('msg').textContent = '';
  };

  // ---- tarayıcıda kayıt (DENEYSEL): sekmeyi yakalar; çözünürlük sekme boyutuna bağlıdır.
  // Sabit kare hızlı 1080x1920 çıktı için tools/render.mjs kullanın. ----
  $('rec').onclick = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia || !window.MediaRecorder) { $('msg').textContent = 'Bu tarayıcı sekme kaydını desteklemiyor. tools/render.mjs kullanın.'; return; }
    try {
      await ensureAudio();
      const ds = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: cfg.fps }, audio: false, preferCurrentTab: true });
      const stream = new MediaStream([...ds.getVideoTracks(), ...recDest.stream.getAudioTracks()]);
      const mt = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find((m) => MediaRecorder.isTypeSupported(m));
      const rec = new MediaRecorder(stream, { mimeType: mt, videoBitsPerSecond: 12e6 }); const chunks = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.onstop = () => { ds.getTracks().forEach((x) => x.stop()); document.body.classList.remove('recording'); resize(); download(new Blob(chunks, { type: 'video/webm' }), 'mk-digital-reklam.webm'); };
      document.body.classList.add('recording'); resize();
      rec.start(); onEnd = () => { onEnd = () => {}; setTimeout(() => rec.state !== 'inactive' && rec.stop(), 300); };
      seek(0, true);
    } catch (e) { $('msg').textContent = 'Kayıt başlatılamadı: ' + e.message; }
  };

  // ---- dış API (tools/render.mjs kullanır) ----
  const imgs = [...document.images];
  const ready = Promise.all([S.ready, document.fonts ? document.fonts.ready : 0, ...imgs.map((i) => (i.decode ? i.decode().catch(() => {}) : 0))]);
  window.AD = {
    duration: D, fps: cfg.fps, width: S.W, height: S.H, ready,
    async seek(x) { t = x; S.render(x); await S.settle(); },
    async wavBase64() {
      const u8 = window.ADAudio.toWav(await window.ADAudio.buildAudio(cfg)); let s = '';
      for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
      return btoa(s);
    }
  };
  ready.then(() => { show(); S.settle(); });
  show();
})();
