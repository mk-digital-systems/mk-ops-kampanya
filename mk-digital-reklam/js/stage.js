/* Sahne motoru: render(t) saf bir fonksiyondur — aynı t her zaman aynı kareyi üretir.
   CSS animasyonu/transition yoktur; izleme, sahne atlama ve sabit kare hızlı video çıktısı
   birebir aynı görüntüyü verir. Toplam süre sahne sürelerinden hesaplanır. */
(function () {
  const cfg = window.AD_CONFIG;
  const W = cfg.width, H = cfg.height;

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const prog = (t, a, b) => clamp((t - a) / (b - a));
  const e3 = (x) => 1 - Math.pow(1 - x, 3);
  const e4 = (x) => 1 - Math.pow(1 - x, 4);
  const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const sm = (x) => x * x * (3 - 2 * x);
  const lerp = (a, b, k) => a + (b - a) * k;

  // ---- süre: sahnelerin toplamı ----
  let acc = 0;
  cfg.scenes.forEach((s) => { s.start = acc; acc += s.duration; s.end = acc; });
  const D = Math.round(acc * 1000) / 1000;
  cfg.totalDuration = D;
  const durationOk = D > 0 && D <= cfg.maxDuration;
  const durationNote = D < cfg.minDuration ? `Süre ${D} sn: önerilen aralığın (${cfg.minDuration}–${cfg.maxDuration} sn) altında.` : '';

  const stage = document.getElementById('stage');
  stage.style.fontFamily = cfg.fontStack;
  const sceneRoot = document.getElementById('scenes');
  const bust = '?v=' + Date.now(); // görsel değişince otomatik güncel yüklensin
  const mk = (h) => { const d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstChild; };
  const BASE = 0.74;                                // uygulama sahnelerinde telefon ölçeği
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16));
  const mix = (a, b, k) => hex(a).map((v, i) => Math.round(lerp(v, hex(b)[i], k)));
  const rgb = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a == null ? 1 : a})`;

  const pending = [];
  function phoneHtml(s, full) {
    let edges = '';
    for (let i = 1; i <= 10; i++) { const c = Math.round(58 - i * 3); edges += `<div class="edge" style="transform:translateZ(${-i * 1.6}px);background:rgb(${c},${c + 6},${c + 14})"></div>`; }
    const media = `<img src="${s.image}${bust}" alt="">` + (full && s.video ? `<video src="${s.video}${bust}" muted playsinline preload="auto"></video>` : '');
    const marks = full ? (s.marks || []).map((m) => `<div class="mark"><svg><rect/></svg>${m.label ? `<span class="mlabel">✓ ${m.label}</span>` : ''}</div>`).join('') + (s.taps || []).map(() => '<div class="tap"><i></i><b></b></div>').join('') : '';
    return `<div class="phone" style="--r:.5">${edges}<div class="face"><div class="screen"><div class="zoomer">${media}${marks}</div></div>
      <div class="glass"></div></div><div class="sidebtn" style="top:250px;height:110px"></div><div class="sidebtn" style="top:400px;height:70px"></div></div>`;
  }
  // telefon gövdesi, görselin (veya videonun) GERÇEK en-boy oranına uyar: ekran kırpılmaz/uzatılmaz
  function trackRatio(el) {
    el.querySelectorAll('.phone').forEach((ph) => {
      const img = ph.querySelector('img');
      pending.push(new Promise((res) => {
        const apply = () => { if (img.naturalWidth) ph.style.setProperty('--r', (img.naturalWidth / img.naturalHeight).toFixed(4)); res(); };
        if (img.complete) apply(); else { img.addEventListener('load', apply); img.addEventListener('error', res); }
      }));
      const v = ph.querySelector('video');
      if (v) {
        v.addEventListener('loadedmetadata', () => { ph.style.setProperty('--r', (v.videoWidth / v.videoHeight).toFixed(4)); ph.classList.add('hasvideo'); });
        v.addEventListener('error', () => v.remove());
        pending.push(new Promise((res) => { v.addEventListener('loadeddata', res); v.addEventListener('error', res); setTimeout(res, 4000); }));
      }
    });
  }

  const apps = cfg.scenes.filter((x) => x.type === 'app');
  const els = cfg.scenes.map((s) => {
    let html;
    const badge = `<div class="live"><i></i>${cfg.playBadge}</div>`;
    if (s.type === 'intro') {
      html = `<section class="scene intro"><div class="logo-wrap"><img class="logo" src="${s.logo}${bust}" alt="MK DIGITAL SYSTEMS"><div class="sweep"></div></div>
        <div class="kicker">${s.kicker}</div>${badge}</section>`;
    } else if (s.type === 'app') {
      const ff = s.serif ? cfg.serifStack : cfg.fontStack;
      html = `<section class="scene app" style="--key:${s.mood.key}">${badge}
        <div class="spot"></div>
        <div class="lines" style="font-family:${ff}">${(s.lines || []).map((l) => `<div class="line">${l.text}</div>`).join('')}</div>
        <div class="cam"><div class="phone-wrap">${phoneHtml(s, true)}</div></div>
        <div class="appname">${s.name}</div>
        <div class="tagline" style="font-family:${ff}">${s.tagline}</div></section>`;
    } else {
      html = `<section class="scene outro">${badge}<div class="fan">${apps.map((a) => `<div class="mini">${phoneHtml(a, false)}<div class="nm">${a.name}</div></div>`).join('')}</div>
        <div class="logo-wrap small"><img class="logo" src="${s.logo}${bust}" alt="MK DIGITAL SYSTEMS"></div>
        <div class="headline">${s.headline}</div><div class="cta"><span class="gp"></span>${s.cta}</div></section>`;
    }
    const el = mk(html); sceneRoot.appendChild(el); trackRatio(el); return el;
  });
  const vids = cfg.scenes.map((s, i) => els[i].querySelector('video'));
  const ready = Promise.all(pending);

  // ---- atmosfer: bokeh/toz (tohumlu, t'nin fonksiyonu) ve film greni ----
  const fx = document.getElementById('fx'), fctx = fx.getContext('2d');
  const soft = document.createElement('canvas'); soft.width = soft.height = 64;
  (function () { const g = soft.getContext('2d'), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.55, 'rgba(255,255,255,.55)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, 64, 64); })();
  const tinted = document.createElement('canvas'); tinted.width = tinted.height = 64;
  let sd = 11; const rnd = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const bokeh = Array.from({ length: 7 }, () => ({ x: rnd() * W, y: rnd() * H, r: 140 + rnd() * 200, vx: (rnd() - .5) * 14, vy: -4 - rnd() * 8, a: .06 + rnd() * .08, p: rnd() * 6.28 }));
  const dust = Array.from({ length: 24 }, () => ({ x: rnd() * W, y: rnd() * H, v: 6 + rnd() * 16, s: 2 + rnd() * 4, p: rnd() * 6.28, a: .3 + rnd() * .4 }));
  const grain = document.getElementById('grain');
  (function () { const c = document.createElement('canvas'); c.width = c.height = 192; const g = c.getContext('2d'), im = g.createImageData(192, 192);
    for (let i = 0; i < im.data.length; i += 4) { const v = rnd() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    g.putImageData(im, 0, 0); grain.style.backgroundImage = `url(${c.toDataURL()})`; })();

  const gradeEl = document.getElementById('grade'), fade = document.getElementById('fade');

  function mood(t) {
    let i = cfg.scenes.findIndex((s) => t >= s.start && t < s.end); if (i < 0) i = cfg.scenes.length - 1;
    const s = cfg.scenes[i], n = cfg.scenes[i + 1];
    const k = n ? sm(prog(t, s.end - 0.7, s.end + 0.2)) : 0;
    const o = n ? n.mood : s.mood;
    return { a: mix(s.mood.bg[0], o.bg[0], k), b: mix(s.mood.bg[1], o.bg[1], k), key: mix(s.mood.key, o.key, k) };
  }
  function drawFx(t, m) {
    fctx.clearRect(0, 0, W, H);
    // sahnenin ışık rengine boyanmış yumuşak sprite
    const g = tinted.getContext('2d'); g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, 64, 64);
    g.drawImage(soft, 0, 0); g.globalCompositeOperation = 'source-atop'; g.fillStyle = rgb(m.key); g.fillRect(0, 0, 64, 64);
    fctx.globalCompositeOperation = 'lighter';
    for (const b of bokeh) {
      const x = ((b.x + b.vx * t) % (W + 400) + W + 400) % (W + 400) - 200, y = ((b.y + b.vy * t) % (H + 400) + H + 400) % (H + 400) - 200;
      fctx.globalAlpha = b.a * (0.7 + 0.3 * Math.sin(t * 0.5 + b.p));
      fctx.drawImage(tinted, x - b.r, y - b.r, b.r * 2, b.r * 2);
    }
    for (const p of dust) {
      const y = ((p.y - p.v * t) % H + H) % H, x = p.x + Math.sin(t * .5 + p.p) * 18;
      fctx.globalAlpha = p.a * (0.5 + 0.5 * Math.sin(t * 1.4 + p.p)) * 0.5;
      fctx.drawImage(soft, x - p.s * 2, y - p.s * 2, p.s * 4, p.s * 4);
    }
    fctx.globalAlpha = 1; fctx.globalCompositeOperation = 'source-over';
  }

  const setO = (el, o, tr, f) => { el.style.opacity = o; if (tr != null) el.style.transform = tr; if (f != null) el.style.filter = f; };
  const reveal = (el, r, dy) => setO(el, r, `translateY(${(1 - r) * dy}px)`, `blur(${(1 - r) * 8}px)`);

  function focusAt(list, u) {
    if (!list || !list.length) return { x: .5, y: .5, s: 1 };
    if (u <= list[0].t) return list[0];
    for (let i = 0; i < list.length - 1; i++) if (u < list[i + 1].t) {
      const a = list[i], b = list[i + 1], k = eio(prog(u, a.t, b.t));
      return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), s: lerp(a.s, b.s, k) };
    }
    return list[list.length - 1];
  }

  let seeking = [];
  function setVideo(v, u) {
    const target = clamp(u, 0, Math.max(0, (v.duration || u) - 0.04));
    if (Math.abs(v.currentTime - target) > 0.02) {
      seeking.push(new Promise((res) => { v.addEventListener('seeked', res, { once: true }); setTimeout(res, 1500); }));
      v.currentTime = target;
    }
  }
  const settle = () => { const p = seeking; seeking = []; return Promise.all(p); };

  const upd = {
    intro(el, u, s) {
      const d = s.duration;
      el.style.opacity = 1 - eio(prog(u, d - 0.5, d));
      const lw = el.querySelector('.logo-wrap'), a = e3(prog(u, 0.15, 1.5));
      lw.style.opacity = a; lw.style.transform = `scale(${0.96 + 0.08 * eio(prog(u, 0, d))})`; lw.style.filter = `blur(${(1 - a) * 12}px)`;
      el.querySelector('.sweep').style.transform = `translateX(${-900 + 1800 * eio(prog(u, 0.8, 2.6))}px) skewX(-16deg)`;
      reveal(el.querySelector('.kicker'), e3(prog(u, 1.9, 2.6)), 30);
      reveal(el.querySelector('.live'), e3(prog(u, 2.5, 3.1)), 20);
    },
    app(el, u, s) {
      const d = s.duration, k = u / d, dir = s.dir || 1;
      const enter = e4(prog(u, 0, 1.2)), exit = eio(prog(u, d - 0.5, d));
      el.style.opacity = 1;
      el.querySelector('.cam').style.opacity = e3(prog(u, 0, 0.7)) * (1 - exit);
      // odak anında telefon kameraya belirgin biçimde yaklaşır ve ekranı kameraya döner
      const f = focusAt(s.focus, u), sf = Math.max(1, f.s), lim = (sf - 1) / 2;
      const maxS = Math.max(1.0001, ...(s.focus || []).map((q) => q.s)), fs = clamp((sf - 1) / (maxS - 1));
      const ry = dir * (-24 * (1 - enter) + (-8 + 16 * eio(k)) * (1 - 0.65 * fs));
      const rx = 5 * (1 - enter) + 2 * Math.sin(k * Math.PI);
      const ty = 150 * (1 - enter) - 60 * exit + Math.sin(u * 0.9) * 5 + 95 * fs;
      const sc = BASE * (0.9 + 0.1 * enter + 0.07 * eio(k)) * (1 + 0.2 * fs) * (1 - 0.05 * exit);
      const ph = el.querySelector('.phone');
      ph.style.transform = `translate3d(0,${ty}px,0) rotateX(${rx}deg) rotateY(${ry}deg) scale(${sc})`;
      ph.querySelector('.glass').style.backgroundPosition = `${55 - ry * 5}% 0, 0 0`; // yansıma, dönüş açısına bağlı
      const spot = el.querySelector('.spot'); spot.style.opacity = enter * (1 - exit) * 0.9;
      spot.style.transform = `translate(-50%,-50%) scale(${0.9 + 0.1 * enter + 0.05 * k})`;
      el.querySelector('.live').style.opacity = e3(prog(u, 0.3, 0.9)) * (1 - exit);
      // ekran içi kamera (gerçek görüntünün içinde yakınlaşma/kayma)
      const tx = clamp((0.5 - f.x) * sf, -lim, lim), ty2 = clamp((0.5 - f.y) * sf, -lim, lim);
      el.querySelector('.zoomer').style.transform = `translate(${tx * 100}%,${ty2 * 100}%) scale(${sf})`;
      const v = vids[cfg.scenes.indexOf(s)];
      if (v && ph.classList.contains('hasvideo')) setVideo(v, u);
      // çizgiyle vurgu: parlak çerçeve adım adım çizilir, hafif dolgu ve (varsa) gerçek ekran yazısıyla etiket
      const zr = parseFloat(ph.style.getPropertyValue('--r')) || 0.5, zw = 1078 * zr, zh = 1078;
      el.querySelectorAll('.mark').forEach((m, i) => {
        const c = s.marks[i], draw = e3(prog(u, c.t, c.t + 0.5)), out = 1 - prog(u, c.to - 0.3, c.to);
        const w = c.w * zw, h = c.h * zh, sw = 5 / sf, pad = 8;
        m.style.cssText = `left:${(c.x - c.w / 2) * 100}%;top:${(c.y - c.h / 2) * 100}%;width:${w}px;height:${h}px;opacity:${draw > 0 ? out : 0}`;
        const sv = m.firstChild, rc = sv.firstChild;
        sv.setAttribute('width', w); sv.setAttribute('height', h);
        rc.setAttribute('x', -pad); rc.setAttribute('y', -pad); rc.setAttribute('width', w + pad * 2); rc.setAttribute('height', h + pad * 2); rc.setAttribute('rx', 24); rc.setAttribute('pathLength', 1);
        rc.style.cssText = `stroke-width:${sw}px;stroke-dashoffset:${1 - draw};fill:color-mix(in srgb, var(--key) ${Math.round(7 * prog(u, c.t + 0.3, c.t + 0.8))}%, transparent)`;
        const lb = m.querySelector('.mlabel');
        if (lb) { const lr = e3(prog(u, c.t + 0.45, c.t + 0.85)); lb.style.cssText = `opacity:${lr};transform:translateX(-50%) translateY(${(1 - lr) * 12 / sf}px) scale(${1 / sf})`; }
      });
      el.querySelectorAll('.tap').forEach((tp, i) => {
        const c = s.taps[i], q = (u - c.t) / 0.8, vis = q >= 0 && q <= 1;
        tp.style.cssText = `left:${c.x * 100}%;top:${c.y * 100}%;opacity:${vis ? 1 : 0}`;
        if (vis) {
          tp.firstChild.style.cssText = `transform:translate(-50%,-50%) scale(${(0.4 + 1.5 * e3(q)) / sf});opacity:${1 - q}`;
          tp.lastChild.style.cssText = `transform:translate(-50%,-50%) scale(${(1 - 0.25 * Math.sin(Math.min(q * 4, 1) * Math.PI)) / sf});opacity:${1 - prog(q, 0.35, 0.7)}`;
        }
      });
      const lines = s.lines || [];
      el.querySelectorAll('.line').forEach((ln, i) => {
        const c = lines[i], rin = e3(prog(u, c.t, c.t + 0.5)), rout = e3(prog(u, c.to - 0.4, c.to));
        const o = rin * (1 - rout) * (1 - exit);
        setO(ln, o, `translateY(${(1 - rin) * 34 - rout * 20}px)`, `blur(${(1 - o) * 7}px)`);
      });
      const an = e3(prog(u, 0.9, 1.5)), ao = an * (1 - exit) * (1 - fs), apn = el.querySelector('.appname');
      setO(apn, ao, `translateY(${(1 - an) * 20}px)`, `blur(${(1 - ao) * 5}px)`);
      const tagAt = lines.length ? lines[lines.length - 1].to + 0.15 : 1.0;
      const tin = e3(prog(u, tagAt, tagAt + 0.7)), tg = el.querySelector('.tagline'), to = tin * (1 - exit);
      setO(tg, to, `translateY(${(1 - tin) * 30}px)`, `blur(${(1 - to) * 6}px)`);
    },
    outro(el, u, s) {
      const d = s.duration;
      el.style.opacity = 1;
      el.querySelectorAll('.mini').forEach((m, i) => {
        const r = e4(prog(u, 0.1 + i * 0.12, 1.1 + i * 0.12)), c = i - 1.5;
        m.style.opacity = clamp(r * 1.5);
        // sırayla hafifçe büyür (hover etkisi), sonra yerine döner
        const cc = 2.0 + i * 0.95, p = Math.sin(Math.PI * prog(u, cc - 0.5, cc + 0.5)), pe = p * p * (3 - 2 * p);
        m.style.transform = `translate3d(${c * 236}px,${Math.abs(c) * 22 + (1 - r) * 300 - 10 * pe}px,0) rotateZ(${c * 4 * (1 - 0.6 * pe)}deg) scale(${0.36 * (1 + 0.1 * pe)})`;
        m.querySelector('.nm').style.opacity = 0.72 + 0.28 * pe;
        const ph = m.querySelector('.phone'); ph.style.transform = `rotateY(${(1 - r) * 30 + c * -6}deg)`;
        ph.querySelector('.glass').style.backgroundPosition = `${55 + c * 12 + (1 - r) * 40}% 0, 0 0`;
      });
      const lw = el.querySelector('.logo-wrap'), lr = e3(prog(u, 0.9, 1.7));
      lw.style.opacity = lr; lw.style.transform = `translateY(${(1 - lr) * 30}px) scale(${0.97 + 0.03 * lr + 0.03 * u / d})`;
      reveal(el.querySelector('.headline'), e3(prog(u, 1.7, 2.4)), 30);
      const c = el.querySelector('.cta'), cr = e3(prog(u, 2.5, 3.2));
      setO(c, cr, `translateX(-50%) translateY(${(1 - cr) * 26}px) scale(${0.94 + 0.06 * cr})`);
      c.style.boxShadow = `0 0 ${28 + 10 * Math.sin(u * 3)}px rgba(60,150,255,.5)`;
      el.querySelector('.live').style.opacity = e3(prog(u, 3.0, 3.6));
    }
  };

  function render(t) {
    t = clamp(t, 0, D);
    const m = mood(t);
    gradeEl.style.background = `radial-gradient(60% 38% at 22% 10%, ${rgb(m.key, 0.22)}, transparent 70%), radial-gradient(120% 72% at 50% 42%, ${rgb(m.a)} 0%, ${rgb(m.b)} 100%)`;
    cfg.scenes.forEach((s, i) => {
      const u = t - s.start, last = i === cfg.scenes.length - 1;
      const vis = u >= 0 && (u < s.duration || (last && u <= s.duration));
      els[i].style.display = vis ? 'block' : 'none';
      if (vis) upd[s.type](els[i], u, s);
    });
    drawFx(t, m);
    const g = Math.floor(t * 24);
    grain.style.backgroundPosition = `${(g * 53) % 192}px ${(g * 97) % 192}px`;
    fade.style.opacity = Math.max(1 - prog(t, 0, 0.2), prog(t, D - 0.35, D));
  }

  window.ADStage = { render, settle, ready, durationOk, durationNote, total: D, W, H, D };
})();
