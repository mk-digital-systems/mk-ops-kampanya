/* =====================================================================
   FİLM — GÖRÜNMEYEN YÜK · 45 sn · her kare t (saniye) değerinden hesaplanır
   ===================================================================== */
const fx=$('#fx'),g=fx.getContext('2d');
const SC=[
 {n:'Sabah 06.45',a:0,b:6},{n:'Görünmeyen yük',a:6,b:15},{n:'Baskı',a:15,b:22},
 {n:'Dönüm noktası',a:22,b:30},{n:'Kontrol sizde',a:30,b:39},{n:'Final',a:39,b:45}];
/* dış ses metni (altyazı + taslak TTS için) — [başlangıç, bitiş, metin, ekranda ayrıca yazılı mı] */
const VO=[
 [12.4,14.0,'Bir şantiyeyi yönetmek…'],
 [14.3,16.6,'…sadece yapılan işi takip etmek değildir.'],
 [18.0,19.5,'Asıl zor olan…'],
 [19.8,21.5,'…her şeyin nerede olduğunu bilmektir.'],
 [26.0,26.9,'MK OPS.'],
 [27.3,29.8,'Şantiyenizin operasyonel kontrol merkezi.'],
 [32.4,36.0,'Personeliniz. Projeleriniz. Araçlarınız. Taşeronlarınız.',true],
 [36.4,39.0,'İşinizi yöneten bilgiler, tek platformda.',true]];

/* ---------- kamera yardımcıları ---------- */
function kf(t,a){ // Catmull-Rom ile pürüzsüz kamera yolu: [[t,x,y,s],...]
  const n=a.length;if(t<=a[0][0])return{x:a[0][1],y:a[0][2],s:a[0][3]};if(t>=a[n-1][0])return{x:a[n-1][1],y:a[n-1][2],s:a[n-1][3]};
  let i=1;while(t>a[i][0])i++;
  const p0=a[Math.max(0,i-2)],p1=a[i-1],p2=a[i],p3=a[Math.min(n-1,i+1)],u=(t-p1[0])/(p2[0]-p1[0]),u2=u*u,u3=u2*u;
  const f=k=>.5*((2*p1[k])+(-p0[k]+p2[k])*u+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*u2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*u3);
  return{x:f(1),y:f(2),s:f(3)};
}
const camG=c=>{g.translate(540,960);g.scale(c.s,c.s);g.translate(-c.x,-c.y)};
const w2s=(c,x,y)=>[540+(x-c.x)*c.s,960+(y-c.y)*c.s];
const lay=(el,show,op)=>{el.style.visibility=show?'visible':'hidden';if(show&&op!=null)el.style.opacity=op.toFixed(3)};
const shakeAt=(t,list,amp,dur)=>{let s=0;for(const ts of list){const q=t-ts;if(q>0&&q<dur)s+=Math.exp(-9*q)*Math.sin(70*q)*amp*(ts*7%2<1?1:-1)}return s};

/* ---------- isteğe bağlı gerçek video yuvaları (assets/video/*.mp4) ---------- */
const SLOTS=[{k:'sahne1',a:0,b:6},{k:'sahne2',a:6,b:15},{k:'sahne3',a:15,b:22},{k:'sahne5',a:30,b:39}].map(s=>{
  const v=document.createElement('video');v.muted=true;v.playsInline=true;v.preload='auto';v.src='assets/video/'+s.k+'.mp4';
  s.v=v;s.ready=false;v.addEventListener('loadeddata',()=>{s.ready=true});v.addEventListener('error',()=>{s.ready=false});return s});
const slotOn=t=>SLOTS.find(s=>s.ready&&t>=s.a&&t<s.b);
function drawSlot(s,t){const v=s.v,d=Math.max(0,Math.min(t-s.a,(v.duration||99)-.05));if(Math.abs(v.currentTime-d)>.03)v.currentTime=d;
  const vw=v.videoWidth||1080,vh=v.videoHeight||1920,k=Math.max(1080/vw,1920/vh);g.drawImage(v,(1080-vw*k)/2,(1920-vh*k)/2,vw*k,vh*k)}
const gradeCold=(a)=>{g.fillStyle=`rgba(40,70,110,${a})`;g.fillRect(0,0,1080,1920)};

/* =========================== SAHNE 1 — Sabah 06.45 =========================== */
const clockTx=$('#clockTx'),filmTitle=$('#filmTitle');
function sceneSite(t){
  const c=kf(t,[[0,560,1160,1.0],[3,600,1220,1.07],[6,650,1280,1.16]]);
  g.save();camG(c);
  drawSite(g,t,{day:.04*prog(t,0,6),sun:.18+.2*prog(t,0,6),px:(c.x-540)*.6,chief:{x:700,y:1530,s:1.25}});
  g.restore();
  gradeCold(.15);
  g.fillStyle=lg(g,0,1920,1080,0,[[0,'rgba(255,170,100,.0)'],[1,'rgba(255,170,100,.10)']]);g.fillRect(0,0,1080,1920);
}
function siteTexts(t){
  // 06.45 yazısı: daktilo gibi
  const full='06.45 — Yeni bir iş günü.',n=Math.floor(clamp((t-2.0)/1.7)*full.length);
  clockTx.textContent=full.slice(0,n);clockTx.style.opacity=(clamp((t-2.0)*3)*(1-prog(t,5.3,5.8))).toFixed(2);
  filmTitle.style.opacity=(eOut(prog(t,3.9,5.0))*(1-prog(t,5.3,5.8))*.95).toFixed(2);
  filmTitle.style.transform=`translateY(${(1-eOut(prog(t,3.9,5.0)))*14}px)`;
}

/* =========================== SAHNE 2 — Görünmeyen yük =========================== */
const phone=$('#phone'),pns=$('#pns'),pbd=$('#pbd'),ptEl=phone.querySelector('.pt');
const NT=[
 [6.7,'Muhasebe','Puantaj listesi güncellendi mi?'],
 [8.1,'Depo','35 BK ••• plakalı araç hangi sahada?'],
 [9.3,'Proje Mühendisi','Taşeronun son imalatı işlendi mi?'],
 [10.3,'Müteahhit','Hakediş bilgileri hazır mı?'],
 [11.1,'Saha','Metraj tablosu hangisi?'],
 [11.7,'Usta','Kim izinli bugün?'],
 [12.2,'Ofis','Sigorta tarihi neydi?'],
 [12.6,'Muhasebe','Güncel liste var mı?'],
 [12.95,'Patron','Durum ne?'],
 [13.25,'Patron','Bir bakar mısın?']].map(([ts,n,m],i)=>({ts,n,m,i}));
NT.forEach(o=>{const el=document.createElement('div');el.className='pn';el.innerHTML=`<div class="ic"></div><div><b>${o.n}</b><span>${o.m}</span></div>`;pns.appendChild(el);o.el=el});
const BUZZ=NT.map(o=>o.ts);
function sceneDesk(t){
  const sh=shakeAt(t,BUZZ,9,.45);
  const c=kf(t,[[6,560,1060,.8],[9.3,540,1100,.95],[11.2,360,860,1.2],[13.0,560,1000,1.3],[15.0,740,1150,2.0]]);
  g.save();camG(c);drawDesk(g,t,{cold:1,shake:sh});g.restore();
  gradeCold(.12);
  // telefon: dünya koordinatında (740,1170) merkez, masada hafif döndürülmüş
  const [sx,sy]=w2s(c,740+sh*.6,1170+sh*.4);
  phone.style.display='block';
  phone.style.transform=`translate(${sx.toFixed(1)}px,${sy.toFixed(1)}px) rotate(-6deg) scale(${(c.s*.96).toFixed(3)}) translate(-180px,-370px)`;
  const tm=lerp(6*60+52,8*60+34,prog(t,6,15));ptEl.textContent=String(Math.floor(tm/60)).padStart(2,'0')+':'+String(Math.floor(tm%60)).padStart(2,'0');
  let cnt=0;NT.forEach(o=>{if(t>=o.ts)cnt++});
  NT.forEach(o=>{
    const q=t-o.ts;if(q<0){o.el.style.display='none';return}
    let rank=0;NT.forEach(p=>{if(p.i>o.i)rank+=eOut(prog(t,p.ts,p.ts+.3))});
    const u=eOut(prog(q,0,.35));
    o.el.style.display='flex';o.el.style.opacity=(clamp(q*8)*(1-clamp((rank-5.2)*.9))).toFixed(3);
    o.el.style.transform=`translateY(${(196+rank*84-(1-u)*70).toFixed(1)}px) scale(${(.95+.05*u).toFixed(3)})`;
  });
  pbd.textContent=cnt?cnt+' yeni bildirim':'';
}

/* =========================== SAHNE 3 — Baskı (hızlı, anlaşılır kesmeler) =========================== */
const shotsEl=$('#shots');
const IMGS={puantaj:'assets/puantaj.png',proje:'assets/proje.png',dash:'assets/dashboard.png',stok:'assets/stok.png'};
const mkImg=src=>{const i=new Image();i.src=src;return i};
const SH=[];
function mkShot(a,b,build,upd){const el=document.createElement('div');el.className='shot';shotsEl.appendChild(el);const o={a,b,el,upd};build(el,o);SH.push(o)}
// A — telefon araması
mkShot(15.0,16.1,(el,o)=>{el.innerHTML='<div class="call"><div class="av">T</div><div class="nm">Taşeron — Ekip Başı</div><div class="sb">gelen arama…</div><div class="rej"></div><div class="ans">✆</div></div>';o.call=el.firstChild;o.ans=el.querySelector('.ans')},
 (o,lt)=>{const sh=Math.sin(lt*85)*5*(Math.sin(lt*14)>0?1:.2);o.call.style.transform=`translate(${sh}px,${Math.cos(lt*70)*3}px) rotate(${3+lt*2}deg) scale(${1+.08*lt})`;o.ans.style.transform=`scale(${1+.1*Math.sin(lt*22)})`});
// B — evraklar
mkShot(16.1,17.2,(el,o)=>{o.sheets=[];const r=mulberry(9);for(let i=0;i<7;i++){const s=document.createElement('div');s.className='sheet';s.style.left=(40+r()*360)+'px';s.style.top=(120+r()*520+i*70)+'px';s.dataset.r=((r()-.5)*28).toFixed(1);if(i===6)s.innerHTML='<em style="left:70px;top:230px;transform:rotate(-8deg)">güncel mi?</em><em style="left:150px;top:520px;font-size:70px">???</em>';el.appendChild(s);o.sheets.push(s)}},
 (o,lt)=>{o.sheets.forEach((s,i)=>{const q=lt-i*.1,u=eOut(clamp(q/.18));s.style.opacity=clamp(q*20);s.style.transform=`rotate(${(+s.dataset.r)*u}deg) scale(${1+(1-u)*.5}) translate(${Math.sin(lt*60+i)*(q>0&&q<.3?6:0)}px,0)`})});
// C — puantaj listesi
mkShot(17.2,18.3,(el,o)=>{const w=document.createElement('div');w.className='win';w.style.cssText='left:0;top:160px;width:1080px;height:1600px;border-radius:0';const p=document.createElement('div');p.style.cssText='position:absolute;left:0;top:0;width:2900px';p.appendChild(mkImg(IMGS.puantaj));p.firstChild.style.width='2900px';
  const ring=document.createElement('div');ring.style.cssText='position:absolute;left:2150px;top:330px;width:170px;height:140px;border:6px solid #ff4d3d;border-radius:20px;box-shadow:0 0 40px rgba(255,77,61,.8)';p.appendChild(ring);w.appendChild(p);el.appendChild(w);o.pan=p;o.ring=ring},
 (o,lt)=>{o.pan.style.transform=`translate(${lerp(-300,-1750,lt/1.1)}px,${-60+Math.sin(lt*9)*5}px)`;o.ring.style.opacity=.4+.6*(Math.sin(lt*26)>0?1:.2)});
// D — araç kayıtları
mkShot(18.3,19.4,(el,o)=>{const t=document.createElement('div');t.className='tbl';let h='<div style="color:#8fa3c4;font-weight:700"><span>PLAKA</span><span>ŞANTİYE</span><span>DURUM</span></div>';
  const pl=['35 BK 4••','06 DM •01','34 AB 7••','41 KL 2••','35 BK 9••','16 TR •45','34 ZY 3••','06 MK •12','35 BK 1••','41 DG 6••','34 YE •88','16 AA 5••'];
  pl.forEach((p,i)=>{h+=`<div><span>${p}</span><span class="${i%3?'':'q'}">${i%3?'—':'?'}</span><span class="${i%2?'q':''}">${i%2?'güncel değil':'?'}</span></div>`});t.innerHTML=h;el.appendChild(t);o.t=t},
 (o,lt)=>{o.t.style.transform=`translateY(${lerp(360,-120,lt/1.1)}px)`;o.t.style.opacity=1});
// E — ekranlarda dağınık pencereler
mkShot(19.4,20.6,(el,o)=>{o.ws=[];const spec=[['dash',60,360,800,-4],['proje',250,620,760,3],['stok',120,900,820,-2],['puantaj',300,1180,740,5],['dash',-40,1420,760,-6]];spec.forEach(([k,x,y,w,r])=>{const d=document.createElement('div');d.className='win';d.style.cssText=`left:${x}px;top:${y}px;width:${w}px;`;d.innerHTML='<div class="bar"></div>';d.appendChild(mkImg(IMGS[k]));d.dataset.r=r;el.appendChild(d);o.ws.push(d)});
  const c=document.createElement('div');c.id='cur';el.appendChild(c);o.cur=c},
 (o,lt)=>{o.ws.forEach((d,i)=>{const q=lt-i*.1,u=eOut(clamp(q/.25));d.style.opacity=clamp(q*14);d.style.transform=`rotate(${+d.dataset.r*u}deg) scale(${1.25-.25*u})`});
  o.cur.style.display='block';o.cur.style.transform=`translate(${540+Math.sin(lt*9)*380}px,${900+Math.cos(lt*7)*520}px)`;o.el.style.transform=`scale(${1.12-.12*lt})`});
const SHOT_F={a:20.6,b:21.6};
let shotState=-1;
function sceneShots(t){
  const idx=SH.findIndex(s=>t>=s.a&&t<s.b);
  shotsEl.style.visibility=idx>=0?'visible':'hidden';
  SH.forEach((s,i)=>{s.el.style.display=i===idx?'block':'none'});
  if(idx>=0){const s=SH[idx],lt=t-s.a,e=s.el;
    s.upd(s,lt);
    const whip=1-eOut(clamp(lt/.1));e.style.opacity=(1-whip*.5).toFixed(2);e.style.filter=`blur(${whip*10}px)`}
}
function sceneF(t){ // şef bilgisayar başında: soğuk, karanlık
  const c=kf(t,[[20.6,380,1250,1.15],[21.6,300,1330,1.5]]);
  g.save();camG(c);drawOffice(g,t,{day:0,sun:.1,px:0,cx:0});g.restore();gradeCold(.2);
  lapShow(c,t,'puantaj',.55);
}

/* =========================== Laptop ekranı (S3-F, S5) =========================== */
const lapEl=document.createElement('div');lapEl.className='win';lapEl.style.cssText='left:0;top:0;width:600px;height:380px;border-radius:6px;transform-origin:0 0;display:none;background:#0c121c';
const lapImgs={};['puantaj','proje','dash'].forEach(k=>{const i=mkImg(IMGS[k]);i.style.cssText='position:absolute;left:0;top:0;width:100%;opacity:0';lapEl.appendChild(i);lapImgs[k]=i});
const lapCur=document.createElement('div');lapCur.id='cur';lapEl.appendChild(lapCur);
$('#world').appendChild(lapEl);
function lapShow(c,t,key,dim,pos){
  const [sx,sy]=w2s(c,LAP.x,LAP.y);
  lapEl.style.display='block';lapEl.style.transform=`translate(${sx.toFixed(1)}px,${sy.toFixed(1)}px) scale(${c.s.toFixed(3)})`;
  for(const k in lapImgs){lapImgs[k].style.opacity=(k===key?1:0)*(1-(dim||0)*.0)}
  lapImgs[key].style.top=(-(pos||0))+'px';lapImgs[key].style.filter=dim?`brightness(${1-dim*.5})`:'none';
  lapCur.style.display='none';
}
const lapSeq=(t)=>t<33?['puantaj',lerp(0,120,prog(t,30,33))]:t<36?['proje',lerp(0,150,prog(t,33,36))]:['dash',lerp(0,90,prog(t,36,39))];

/* =========================== SAHNE 4 — Dönüm noktası =========================== */
const Q4=buildText($('#txtl'),{top:620,lines:[{segs:L('YA HEPSİ'),max:190,mode:'rise',lh:1},{segs:L('TEK YERDE'),max:190,mode:'rise',lh:1},{segs:L('OLSAYDI?','k1'),max:210,mode:'rise',lh:1}]});
const WM=buildText($('#hud'),{top:0,maxW:780,lines:[{segs:L('MK OPS'),max:260,mode:'rise',lh:1}]});WM.el.style.transformOrigin='540px 50%';
const WMF=WM.spec.lines[0]._fs,WMW=WM.spec.lines[0]._w;
const tile=$('#tile');
function hudState(t){
  const A={tx:540,ty:760,ts:.85,wx:540,wy:1000,ws:.55};
  const Hd={tx:112,ty:100,ts:.34,wx:182+WMW*(64/WMF)/2,wy:104,ws:64/WMF};
  const C={tx:540,ty:440,ts:.6,wx:540,wy:632,ws:104/WMF};
  const u1=eIO(prog(t,25.5,26.3)),u2=t>=39?1:0,o={};
  for(const k in A)o[k]=lerp(lerp(A[k],Hd[k],u1),C[k],u2);return o;
}
const PNL=[
 {src:'puantaj',iw:1800,ih:1242,tg:[370,0,1250,640],chip:'PERSONEL & PUANTAJ'},
 {src:'proje',iw:1800,ih:1598,tg:[0,0,1100,760],chip:'PROJELER'},
 {src:'dash',iw:1800,ih:1310,tg:[60,730,1180,1100],chip:'ARAÇLAR'},
 {src:'dash',iw:1800,ih:1310,tg:[40,380,1760,700],chip:'HAKEDİŞ'}];
const FOC=[25.9,27.1,28.3,29.4];
PNL.forEach((p,i)=>{const d=document.createElement('div');d.className='pnl';const im=mkImg(IMGS[p.src]);im.style.width=p.iw+'px';d.appendChild(im);$('#mstrip').appendChild(d);p.el=d;p.im=im;
  const tw=p.tg[2]-p.tg[0],th=p.tg[3]-p.tg[1];p.s=Math.min(900/tw,700/th);p.cx=(p.tg[0]+p.tg[2])/2;p.cy=(p.tg[1]+p.tg[3])/2});
const chip=$('#chip');
function idxf(t){let f=0;for(let k=1;k<FOC.length;k++)f+=eIO(prog(t,FOC[k]-.5,FOC[k]));return f}
function sceneModules(t){
  const f=idxf(t),enter=eOut(prog(t,25.5,26.3)),exit=eIO(prog(t,29.75,30.3));
  PNL.forEach((p,i)=>{
    const x=90+(i-f)*1010+(1-enter)*1200-exit*1400,d=Math.abs(f-i);
    p.el.style.transform=`translate3d(${x.toFixed(1)}px,0,0) rotateY(${((i-f)*-9).toFixed(2)}deg) scale(${(1-Math.min(.1,d*.07)).toFixed(3)})`;
    p.el.style.filter=d>.2?`blur(${Math.min(9,d*7).toFixed(1)}px) brightness(${(1-Math.min(.5,d*.4)).toFixed(2)})`:'none';
    const drift=1+.05*clamp((t-(FOC[i]-.6))/1.6),s=p.s*drift;
    p.im.style.transform=`translate(${(450-p.cx*s).toFixed(1)}px,${(350-p.cy*s).toFixed(1)}px) scale(${s.toFixed(4)})`;
  });
  const ci=Math.min(3,Math.floor(f+.5));chip.textContent=PNL[ci].chip;chip.style.opacity=(enter*(1-exit)*(1-Math.abs(f-Math.round(f))*1.6>0?1:.3)).toFixed(2);
}
function navyBG(t,a){
  const m=a==null?1:a;
  g.fillStyle=lg(g,0,0,0,1920,[[0,'#030816'],[.55,'#0a1b3c'],[1,'#030a1a']]);g.fillRect(0,0,1080,1920);
  const orb=(x,y,r,col,al)=>{g.fillStyle=rgd(g,x,y,0,r,[[0,`rgba(${col},${al})`],[1,`rgba(${col},0)`]]);g.fillRect(x-r,y-r,r*2,r*2)};
  orb(540+Math.sin(t*.2)*80,760,820,'31,139,255',.32*m);orb(800,1500+Math.cos(t*.25)*60,720,'25,227,208',.16*m);
  g.strokeStyle=`rgba(80,170,255,${.14*m})`;g.lineWidth=2;
  for(let k=0;k<16;k++){const z=((k+((t*.4)%1))/16),y=1080+(840)*z*z;g.beginPath();g.moveTo(0,y);g.lineTo(1080,y);g.stroke()}
  for(let i=-14;i<=14;i++){g.beginPath();g.moveTo(540+i*34,1080);g.lineTo(540+i*150,1920);g.stroke()}
  const r=mulberry(5);for(let i=0;i<60;i++){const x=(r()*1080+Math.sin(t*.3+i)*20),y=((r()*1920-t*(8+r()*20))%1920+1920)%1920;g.fillStyle=`rgba(190,220,255,${.12+.18*r()})`;g.beginPath();g.arc(x,y,1+r()*2,0,TAU);g.fill()}
}

/* =========================== SAHNE 6 — Final =========================== */
const F1=buildText($('#txtl'),{top:770,lines:[{segs:L('İŞİNİZ BÜYÜSÜN.'),max:130,mode:'drop',lh:1}]});
const F2=buildText($('#txtl'),{top:880,lines:[{segs:L('KONTROL SİZDE KALSIN.','k1'),max:130,mode:'drop',lh:1}]});
const FS=document.createElement('div');FS.className='cin';FS.style.cssText='left:0;width:1080px;text-align:center;top:1030px;font-size:36px;font-weight:500;letter-spacing:.16em;color:#bcd6ff';FS.textContent='Şantiye ve Operasyon Yönetim Platformu';$('#final').appendChild(FS);
const UR=buildText($('#txtl'),{top:1370,lines:[{segs:L('mk-ops.tr'),max:124,mode:'drop',lh:1}]});
const cta=$('#cta');cta.style.top='1190px';

/* =========================== ANA RENDER =========================== */
const capEl=$('#cap');
let capOn=false,lastT=-1;
function render(t){
  g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';
  const sl=slotOn(t);
  // --- kanvas arka planı ---
  if(t<6){ if(sl)drawSlot(sl,t),gradeCold(.1); else sceneSite(t) }
  else if(t<15){ if(sl)drawSlot(sl,t),gradeCold(.1); else sceneDesk(t) }
  else if(t<20.6){ g.fillStyle='#0a0e15';g.fillRect(0,0,1080,1920) }
  else if(t<21.7){ if(sl)drawSlot(sl,t); else sceneF(t) }
  else if(t<30){ navyBG(t,sm(prog(t,22.3,24)));
    const q=t-24.1;if(q>0&&q<1.4){const w=Math.pow(1-q/1.4,1.5),sg=lg(g,0,0,1080,0,[[0,'rgba(120,200,255,0)'],[.5,`rgba(190,235,255,${.85*w})`],[1,'rgba(120,200,255,0)']]);g.fillStyle=sg;g.fillRect(0,760-3-5*w,1080,6+10*w)} }
  else if(t<39){
    const c=kf(t,[[30,420,1260,1.7],[34,520,1120,1.3],[39,540,960,1.0]]);
    if(sl)drawSlot(sl,t);else{g.save();camG(c);drawOffice(g,t,{day:.55+.4*prog(t,30,39),sun:.45+.3*prog(t,30,39),px:0,cx:0});g.restore()}
    g.fillStyle='rgba(255,214,170,.06)';g.fillRect(0,0,1080,1920);
    g.fillStyle=lg(g,0,0,0,760,[[0,'rgba(6,10,18,.55)'],[1,'rgba(6,10,18,0)']]);g.fillRect(0,0,1080,760);
    if(!sl){const [k,pos]=lapSeq(t);lapShow(c,t,k,0,pos)}
  } else navyBG(t,1);
  // --- DOM katmanları ---
  const showWorld=(t>=6&&t<15&&!sl)||(t>=20.6&&t<21.7&&!sl)||(t>=30&&t<39&&!sl);
  lay($('#world'),showWorld,1);
  phone.style.display=(t>=6&&t<15&&!sl)?'block':'none';
  lapEl.style.display=((t>=20.6&&t<21.7)||(t>=30&&t<39))&&!sl?'block':'none';
  lay($('#cin'),t<6,1);if(t<6)siteTexts(t);
  lay(shotsEl,t>=15&&t<20.6&&!sl,1);if(t>=15&&t<20.6&&!sl)sceneShots(t);
  // S4 metin
  const v4=t>=22&&t<39.9;
  lay($('#txtl'),t>=22,1);
  runText(Q4,t,22.7,{st:.055,ex:24.0,exSt:.012,exMode:'shrink'});
  // logo / MK OPS
  const hs=hudState(t);
  const hv=(t>=24&&t<30.2)||t>=39;lay($('#hud'),hv,1);
  let tOp=0,tSc=hs.ts,bl=0;
  if(t>=24.05&&t<30.2){const tp=t-24.05;tOp=clamp(tp*1.6)*(1-prog(t,29.9,30.2));tSc=hs.ts*lerp(1.25,1,eOut(prog(tp,0,1.4)));bl=(1-clamp(tp/1.4))*16}
  else if(t>=39){const tp=t-39.1;tOp=clamp(tp*2.2);tSc=hs.ts*lerp(1.15,1,eOut(prog(tp,0,.9)));bl=(1-clamp(tp/.8))*10}
  tile.style.opacity=tOp.toFixed(2);tile.style.filter=bl>.4?`blur(${bl.toFixed(1)}px)`:'none';
  tile.style.transform=`translate(${hs.tx.toFixed(1)}px,${hs.ty.toFixed(1)}px) scale(${tSc.toFixed(4)})`;
  runText(WM,t<39?t:t-14.7,24.9,{st:.07,ex:t<39?29.95:null,exSt:.002,exMode:'shrink'});
  WM.el.style.transform=`translate(${(hs.wx-540).toFixed(1)}px,${(hs.wy-WMF*.5).toFixed(1)}px) scale(${hs.ws.toFixed(4)})`;  // modüller
  const vm=t>=25.4&&t<30.5;lay($('#mods'),vm,1);if(vm)sceneModules(t);
  // final metinleri
  runText(F1,t,40.0,{st:.04});runText(F2,t,41.0,{st:.035});
  FS.style.opacity=(clamp((t-41.9)*2)).toFixed(2);
  runText(UR,t,42.3,{st:.035});
  const cp=t-42.0;
  lay($('#final'),t>=39,1);
  if(cp<0)cta.style.display='none';else{const bl=t>43.2?.5+.5*Math.sin((t-43.2)*5):0;cta.style.display='flex';const s=Math.max(.001,spring(cp*1.6));cta.style.transform=`scale(${(s*(1+.012*bl)).toFixed(3)})`;cta.style.opacity=clamp(cp*8).toFixed(2);cta.style.boxShadow=`0 20px ${80+30*bl}px rgba(31,139,255,${(.5+.25*bl).toFixed(2)}),0 0 0 2px rgba(255,255,255,.25) inset`}
  // geçişler: karartma (açılış, S1→S2, S3-F→S4, S4→S5, S5→S6)
  let fd=1-prog(t,0,1.4);
  fd=Math.max(fd,tri(t,5.55,6.0,6.5),tri(t,21.35,21.6,22.2),tri(t,29.7,30.0,30.5)*.9,tri(t,38.6,39.0,39.5)*.9);
  $('#fade').style.opacity=clamp(fd).toFixed(3);
  // altyazı (dış ses metni)
  const cue=VO.find(v=>t>=v[0]&&t<v[1]);
  if(cue&&capOn&&!cue[3]){capEl.textContent=cue[2];capEl.style.opacity=(clamp((t-cue[0])*6)*clamp((cue[1]-t)*6)).toFixed(2)}else capEl.style.opacity=0;
  // S5 ekran yazıları
  s5Text(t);
  // film grain 24 fps
  const gf=Math.floor(t*24);if(gf!==lastGrain){lastGrain=gf;$('#grain').style.backgroundPosition=`${(gf*97)%256}px ${(gf*61)%256}px`}
}
const tri=(t,a,b,c)=>t<a||t>c?0:(t<b?(t-a)/(b-a):(c-t)/(c-b));
let lastGrain=-1,sceneSiteTexts=0;
/* S5: dış ses cümleleri ekranda ince tipografiyle */
const S5W=['PERSONELİNİZ.','PROJELERİNİZ.','ARAÇLARINIZ.','TAŞERONLARINIZ.'];
const s5el=document.createElement('div');s5el.className='cin';s5el.style.cssText='left:0;width:1080px;text-align:center;top:260px;font-size:78px;font-weight:300;letter-spacing:.14em;padding-left:.14em;color:#fff';$('#txtl').appendChild(s5el);
const s5b=document.createElement('div');s5b.className='cin';s5b.style.cssText='left:90px;width:900px;text-align:center;top:230px;font-size:62px;font-weight:700;letter-spacing:.02em;text-shadow:0 4px 32px rgba(0,0,0,.85);white-space:normal;line-height:1.2;color:#fff';$('#txtl').appendChild(s5b);
function s5Text(t){
  let a=0,txt='';
  if(t>=32.4&&t<36.2){const k=Math.min(3,Math.floor((t-32.4)/.9));txt=S5W[k];const lt=(t-32.4)-k*.9;a=clamp(lt*6)*(k===3?clamp((36.2-t)*4):clamp((.9-lt)*6))}
  s5el.textContent=txt;s5el.style.opacity=a.toFixed(2);
  const b=t>=36.5&&t<38.9?clamp((t-36.5)*3)*clamp((38.9-t)*4):0;
  s5b.innerHTML='İşinizi yöneten bilgiler,<br><span style="color:#9ff7ee">tek platformda.</span>';s5b.style.opacity=b.toFixed(2);
}
