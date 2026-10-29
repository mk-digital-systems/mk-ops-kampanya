/* =====================================================================
   SES TASARIMI — tarayıcıda üretilen (Web Audio) atmosfer, efekt ve müzik zemini.
   Bu bir dış SES DEĞİLDİR; seslendirme için bkz. DIS-SES.md
   ===================================================================== */
const AU={ctx:null,master:null,nodes:[],on:false,muted:true,noise:null,brown:null,
  init(){
    if(this.ctx)return;const C=new (window.AudioContext||window.webkitAudioContext)();this.ctx=C;
    this.master=C.createGain();this.master.gain.value=this.muted?0:.9;
    const comp=C.createDynamicsCompressor();this.master.connect(comp);comp.connect(C.destination);
    const mk=(brown)=>{const len=C.sampleRate*4,b=C.createBuffer(1,len,C.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;if(brown){l=(l+.02*w)/1.02;d[i]=l*3.5}else d[i]=w}return b};
    this.noise=mk(false);this.brown=mk(true);
  },
  setMuted(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:.9,this.ctx.currentTime,.05)},
  stop(){this.nodes.forEach(n=>{try{n.stop()}catch(e){}try{n.disconnect()}catch(e){}});this.nodes=[];this.on=false},
  start(t0){
    if(!this.ctx)return;this.stop();const C=this.ctx;if(C.state==='suspended')C.resume();this.on=true;
    const now=C.currentTime+.06,at=t=>now+(t-t0);
    const reg=n=>{this.nodes.push(n);return n};
    // t0'dan itibaren geçerli bir kazanç eğrisi kur
    const env=(gn,pts)=>{let v=pts[0][1];for(let i=0;i<pts.length;i++){if(pts[i][0]<=t0)v=pts[i][1];else{if(i>0&&pts[i-1][0]<t0){const u=(t0-pts[i-1][0])/(pts[i][0]-pts[i-1][0]);v=pts[i-1][1]+(pts[i][1]-pts[i-1][1])*u}break}}
      gn.gain.setValueAtTime(v,now);for(const [t,val] of pts)if(t>t0)gn.gain.linearRampToValueAtTime(val,at(t))};
    const out=(gn)=>{gn.connect(this.master);return gn};
    const noiseSrc=(buf)=>{const s=reg(C.createBufferSource());s.buffer=buf;s.loop=true;s.start(now);return s};
    // 1) rüzgâr
    {const s=noiseSrc(this.noise),f=C.createBiquadFilter();f.type='bandpass';f.frequency.value=420;f.Q.value=.6;
     const lfo=reg(C.createOscillator());lfo.frequency.value=.12;const lg2=C.createGain();lg2.gain.value=160;lfo.connect(lg2);lg2.connect(f.frequency);lfo.start(now);
     const gn=C.createGain();s.connect(f);f.connect(gn);out(gn);env(gn,[[0,0],[1.5,.22],[6,.18],[9,.05],[14,.03],[15,0],[29,0],[30,.05],[38,.04],[39,0]])}
    // 2) uzak iş makinesi uğultusu
    {const s=noiseSrc(this.brown),f=C.createBiquadFilter();f.type='lowpass';f.frequency.value=150;const gn=C.createGain();s.connect(f);f.connect(gn);out(gn);
     env(gn,[[0,0],[1,.5],[6,.45],[8,.1],[15,0],[29.9,0],[30.4,.1],[38,.08],[39,0]])}
    // 3) alçak pad (soğuk → gerilim)
    {const gn=C.createGain();out(gn);const f=C.createBiquadFilter();f.type='lowpass';f.frequency.value=260;f.connect(gn);
     [[55,'sawtooth',.5],[82.41,'sine',.6],[55.9,'sawtooth',.0]].forEach(([fr,ty,v],i)=>{const o=reg(C.createOscillator());o.type=ty;o.frequency.value=fr;const og=C.createGain();og.gain.value=v;o.connect(og);og.connect(f);o.start(now);
       if(i===2){env(og,[[0,0],[9,0],[15,.55],[21.4,.7],[21.5,0]])}});
     env(gn,[[0,0],[2,.14],[6,.2],[15,.26],[21.4,.28],[21.5,0],[24,0]])}
    // 4) mavi/sıcak pad (MK OPS geldiğinde → çözülme)
    {const gn=C.createGain();out(gn);const f=C.createBiquadFilter();f.type='lowpass';f.frequency.value=1800;f.connect(gn);
     [[110,.5],[164.8,.4],[220,.35],[277.2,.25],[329.6,.2]].forEach(([fr,v])=>{const o=reg(C.createOscillator());o.type='sine';o.frequency.value=fr;const og=C.createGain();og.gain.value=v;o.connect(og);og.connect(f);o.start(now)});
     env(gn,[[0,0],[23.9,0],[26,.22],[30,.18],[36,.2],[39,.12],[39.6,.3],[43,.28],[45,0]])}
    // 5) saat tik-takı (S2 → S3)
    for(let s=6;s<21.4;s+=1){if(s<t0)continue;const v=.05+.28*prog(s,6,16);this.click(at(s),v,3200,.018)}
    // 6) telefon titreşimi
    NT.forEach(o=>{if(o.ts>=t0)this.buzz(at(o.ts),.55)});
    // 7) kesme darbeleri (S3)
    [15.0,16.1,17.2,18.3,19.4,20.6].forEach(ts=>{if(ts>=t0){this.whoosh(at(ts),.35);this.hit(at(ts),.5,70,.25)}});
    // 8) karartma + sessizlik sonrası ilk nefes
    if(t0<=24.1)this.hit(at(24.1),.9,52,1.6);
    // 9) modül geçişleri: yumuşak tık
    FOC.forEach(ts=>{if(ts-.5>=t0)this.blip(at(ts-.35),.12,880+(FOC.indexOf(ts))*110)});
    // 10) cümle vurguları
    if(40.0>=t0)this.hit(at(40.0),.7,60,1.2);if(41.0>=t0)this.hit(at(41.0),.5,80,.9);if(42.0>=t0)this.blip(at(42.0),.18,1320);
    if(24.3>=t0)this.blip(at(24.3),.14,1760);
    // 11) S5: hafif klavye/fare tıkları
    for(let s=31;s<38.5;s+=.55+Math.sin(s)*.2){if(s>=t0)this.click(at(s),.14,1800,.012)}
    if(37.0>=t0)this.whoosh(at(37.0),.18);
  },
  click(t,v,fr,d){const C=this.ctx,s=C.createBufferSource();s.buffer=this.noise;const f=C.createBiquadFilter();f.type='highpass';f.frequency.value=fr;const g=C.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0008,t+d);s.connect(f);f.connect(g);g.connect(this.master);s.start(t,Math.random()*2,d+.02);this.nodes.push(s)},
  buzz(t,v){const C=this.ctx;for(let i=0;i<3;i++){const o=C.createOscillator();o.type='square';o.frequency.value=170;const f=C.createBiquadFilter();f.type='lowpass';f.frequency.value=420;const g=C.createGain();const a=t+i*.13;g.gain.setValueAtTime(0,a);g.gain.linearRampToValueAtTime(v*.5,a+.01);g.gain.linearRampToValueAtTime(0,a+.09);o.connect(f);f.connect(g);g.connect(this.master);o.start(a);o.stop(a+.12);this.nodes.push(o)}},
  whoosh(t,v){const C=this.ctx,s=C.createBufferSource();s.buffer=this.noise;const f=C.createBiquadFilter();f.type='bandpass';f.Q.value=1.2;f.frequency.setValueAtTime(400,t);f.frequency.exponentialRampToValueAtTime(3600,t+.25);const g=C.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.12);g.gain.linearRampToValueAtTime(0,t+.3);s.connect(f);f.connect(g);g.connect(this.master);s.start(t,Math.random()*2,.4);this.nodes.push(s)},
  hit(t,v,fr,d){const C=this.ctx,o=C.createOscillator();o.type='sine';o.frequency.setValueAtTime(fr*2,t);o.frequency.exponentialRampToValueAtTime(fr,t+.12);const g=C.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+d+.05);this.nodes.push(o)},
  blip(t,v,fr){const C=this.ctx,o=C.createOscillator();o.type='sine';o.frequency.value=fr;const g=C.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+.5);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+.55);this.nodes.push(o)}
};
