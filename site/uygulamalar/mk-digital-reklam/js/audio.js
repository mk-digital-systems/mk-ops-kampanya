/* Ses: toplam süre (cfg.totalDuration) kadar uzunlukta bir AudioBuffer'a OfflineAudioContext ile çizilir.
   - Müzik: cfg.music doluysa o dosya (lisans sorumluluğu size aittir), boşsa kodla sentezlenen müzik (120 BPM,
     sahne geçişleri vuruşlara denk gelen tam sayı saniyelerdedir).
   - Ses efektleri her zaman sahne ve dokunma zamanlarından (config) türetilir → görüntüyle birebir senkron.
   Dosya müziği için sayfa bir sunucudan açılmalı (tools/serve.mjs); file:// altında tarayıcı fetch'i engeller. */
(function () {
  const SR = 44100;
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  async function buildAudio(cfg) {
    const D = cfg.totalDuration;
    const ctx = new OfflineAudioContext(2, Math.round(SR * D), SR);
    const bounds = cfg.scenes.slice(1).map((s) => s.start);
    const firstBeat = bounds[0] || 3, finalT = bounds[bounds.length - 1] || D - 2;
    window.ADAudio.warning = '';

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, 0);
    master.gain.linearRampToValueAtTime(0.85, 0.05);
    master.gain.setValueAtTime(0.85, D - 1.0);
    master.gain.linearRampToValueAtTime(0, D);
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4;
    master.connect(comp); comp.connect(ctx.destination);

    const nb = ctx.createBuffer(1, SR * 2, SR), nd = nb.getChannelData(0);
    let seed = 12345;
    for (let i = 0; i < nd.length; i++) { seed = (seed * 1664525 + 1013904223) >>> 0; nd[i] = seed / 2147483648 - 1; }

    const env = (g, t, a, peak, d) => { g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); };
    function tone(type, f, t, a, d, peak, lp, f2) {
      const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + a + d);
      const g = ctx.createGain(); env(g, t, a, peak, d); let n = o;
      if (lp) { const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); n = fl; }
      n.connect(g); g.connect(master); o.start(t); o.stop(t + a + d + 0.05);
    }
    function noise(t, dur, type, f0, f1, peak, a) {
      const s = ctx.createBufferSource(); s.buffer = nb;
      const fl = ctx.createBiquadFilter(); fl.type = type; fl.Q.value = 0.8;
      fl.frequency.setValueAtTime(f0, t); fl.frequency.exponentialRampToValueAtTime(f1, t + dur);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(peak, t + (a == null ? 0.005 : a)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(fl); fl.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.05);
    }
    const kick = (t, v) => tone('sine', 150, t, 0.003, 0.3, v, 0, 42);

    // ---------------- müzik ----------------
    let usedFile = false;
    if (cfg.music) {
      try {
        const r = await fetch(cfg.music); if (!r.ok) throw new Error(r.status);
        const mb = await ctx.decodeAudioData(await r.arrayBuffer());
        const s = ctx.createBufferSource(); s.buffer = mb;
        const g = ctx.createGain(); g.gain.setValueAtTime(0, 0); g.gain.linearRampToValueAtTime(0.8, 0.4);
        g.gain.setValueAtTime(0.8, D - 1.6); g.gain.linearRampToValueAtTime(0, D);
        s.connect(g); g.connect(master); s.start(0); usedFile = true;
        if (mb.duration < D - 0.5) window.ADAudio.warning = `Müzik dosyası (${mb.duration.toFixed(1)} sn) reklamdan kısa (${D} sn).`;
      } catch (e) { window.ADAudio.warning = 'Müzik dosyası yüklenemedi (' + e.message + '); sentez müzik kullanıldı. Sayfayı tools/serve.mjs ile açın.'; }
    }
    if (!usedFile) {
      const chords = [{ r: 45, n: [57, 60, 64] }, { r: 41, n: [53, 57, 60] }, { r: 48, n: [55, 60, 64] }, { r: 43, n: [55, 59, 62] }];
      const segs = [];
      for (let t0 = 0, b = 0; t0 < finalT - 0.001; t0 += 2, b++) segs.push({ t0, len: Math.min(2, finalT - t0), ch: chords[b % 4], final: false });
      segs.push({ t0: finalT, len: D - finalT, ch: { r: 36, n: [60, 64, 67, 74] }, final: true });
      segs.forEach(({ t0, len, ch, final }) => {
        const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = final ? 2200 : 1000;
        const g = ctx.createGain(), pk = final ? 0.05 : 0.03;
        g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(pk, t0 + Math.min(0.4, len / 2));
        g.gain.setValueAtTime(pk, t0 + Math.max(0.2, len - 0.15)); g.gain.linearRampToValueAtTime(0.0001, t0 + len + 0.12);
        fl.connect(g); g.connect(master);
        ch.n.forEach((m) => [-6, 6].forEach((det) => {
          const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = hz(m); o.detune.value = det;
          o.connect(fl); o.start(t0); o.stop(t0 + len + 0.2);
        }));
        tone('sine', hz(ch.r), t0, 0.1, len, 0.18);
        for (let k = 0; k * 0.25 < len; k++) {
          const t = t0 + k * 0.25; if (t >= D - 0.4) break;
          if (t >= firstBeat && !final) tone('triangle', hz(ch.r + (k % 2 ? 12 : 0)), t, 0.005, 0.22, 0.14, 700);   // bas
          if (t >= firstBeat - 0.001 || final) {                                                                      // arp (sahneden sahneye enerji artar)
            const lvl = final ? 0.065 : 0.03 + 0.02 * Math.min(1, (t - firstBeat) / (finalT - firstBeat));
            tone('triangle', hz(ch.n[k % ch.n.length] + 12 + (k >= 4 ? 12 : 0)), t, 0.004, 0.2, lvl, 3500);
          }
        }
      });
      for (let t = 1.0; t < firstBeat; t += 0.5) kick(t, 0.18 + (t / firstBeat) * 0.2);      // açılışta kalp atışı
      for (let t = firstBeat; t < finalT; t += 0.5) {
        kick(t, 0.38);
        if (t >= (bounds[1] || firstBeat)) tone('triangle', 9000, t + 0.25, 0.001, 0.04, 0.012); // hat 2. uygulamadan itibaren
      }
      [84, 88, 91, 96].forEach((m, i) => tone('sine', hz(m), finalT + 0.15 + i * 0.12, 0.005, 1.2, 0.04));
    }

    // ---------------- ses efektleri (config'ten senkron) ----------------
    cfg.scenes.forEach((s, i) => {
      if (i > 0) {                                      // geçiş: ölçülü yükselen süpürme + yumuşak vuruş
        noise(s.start - 0.7, 0.7, 'bandpass', 300, 5000, 0.09, 0.6);
        tone('sine', 58, s.start, 0.004, 0.6, 0.22);
        noise(s.start, i === cfg.scenes.length - 1 ? 1.2 : 0.5, 'highpass', 3500, 6500, i === cfg.scenes.length - 1 ? 0.12 : 0.06);
      } else { tone('sine', 55, 0.15, 0.01, 1.4, 0.25); }
      if (s.type === 'app') {
        noise(s.start + 0.05, 0.85, 'bandpass', 250, 1500, 0.06, 0.35);        // telefon girişi: hafif süzülme
        (s.lines || []).forEach((l) => tone('sine', 1760, s.start + l.t, 0.003, 0.14, 0.012));   // metin: çok hafif tık
        (s.taps || []).forEach((tp) => {                                       // dokunuş: yumuşak tık
          tone('sine', 900, s.start + tp.t, 0.002, 0.07, 0.07, 0, 620);
          tone('sine', 160, s.start + tp.t, 0.002, 0.1, 0.1);
        });
        noise(s.end - 0.5, 0.45, 'bandpass', 1400, 300, 0.04, 0.2);            // telefon çıkışı
      }
      if (s.type === 'outro') {
        [0, 1, 2, 3].forEach((k) => noise(s.start + 0.1 + k * 0.12, 0.5, 'bandpass', 500, 1400, 0.035, 0.15));
        [79, 83, 86, 91].forEach((m, k) => tone('sine', hz(m), s.start + 2.5 + k * 0.09, 0.004, 0.9, 0.035));   // CTA çınlaması
      }
    });

    return ctx.startRendering();
  }

  function toWav(buf) {
    const n = buf.length, ch = buf.numberOfChannels, data = new DataView(new ArrayBuffer(44 + n * ch * 2));
    const w = (o, s) => { for (let i = 0; i < s.length; i++) data.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); data.setUint32(4, 36 + n * ch * 2, true); w(8, 'WAVEfmt ');
    data.setUint32(16, 16, true); data.setUint16(20, 1, true); data.setUint16(22, ch, true);
    data.setUint32(24, buf.sampleRate, true); data.setUint32(28, buf.sampleRate * ch * 2, true);
    data.setUint16(32, ch * 2, true); data.setUint16(34, 16, true); w(36, 'data'); data.setUint32(40, n * ch * 2, true);
    const chans = []; for (let c = 0; c < ch; c++) chans.push(buf.getChannelData(c));
    let o = 44;
    for (let i = 0; i < n; i++) for (let c = 0; c < ch; c++) { const s = Math.max(-1, Math.min(1, chans[c][i])); data.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true); o += 2; }
    return new Uint8Array(data.buffer);
  }

  window.ADAudio = { buildAudio, toWav, warning: '' };
})();
