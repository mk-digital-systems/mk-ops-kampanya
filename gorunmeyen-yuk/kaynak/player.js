/* =====================================================================
   OYNATICI, KONTROLLER, TASLAK DIŞ SES (tarayıcı TTS), KENDİ KENDİNİ TEST
   ===================================================================== */
const qs=new URLSearchParams(location.search);
let T=0,playing=true,last=performance.now(),ttsOn=false,lastTT=0;
const stage=$('#stage'),ui=$('#ui');
function fit(){
  const bars=document.body.classList.contains('hideui');
  const th=bars?0:$('#hint').offsetHeight,bh=bars?0:$('#ui').offsetHeight;
  const availH=innerHeight-th-bh;
  const k=qs.get('olcek')==='1'?1:Math.min(innerWidth/W,availH/H);
  stage.style.transform=`scale(${k})`;
  stage.style.left=((innerWidth-W*k)/2)+'px';stage.style.top=(th+(availH-H*k)/2)+'px';
}
addEventListener('resize',fit);
new MutationObserver(fit).observe(document.body,{attributes:true,attributeFilter:['class']});
if(window.ResizeObserver){new ResizeObserver(fit).observe($('#ui'));new ResizeObserver(fit).observe($('#hint'))}
let lastTap=0;stage.addEventListener('pointerup',()=>{const n=Date.now();if(n-lastTap<350){document.body.classList.remove('rec');document.body.classList.toggle('hideui')}lastTap=n});
document.addEventListener('fullscreenchange',()=>{if(!document.body.classList.contains('rec'))document.body.classList.toggle('hideui',!!document.fullscreenElement)});
fit();
// sahne zaman çizelgesi
const scn=$('#scn');SC.forEach((s,i)=>{const e=document.createElement('i');e.style.width=((s.b-s.a)/DUR*100)+'%';e.textContent=s.n;e.title=s.a+'–'+s.b+' sn';e.onclick=()=>seekTo(s.a);scn.appendChild(e)});
function upd(){$('#tm').textContent=T.toFixed(1)+' / '+DUR.toFixed(1)+' sn';$('#seek').value=T;$('#bPlay').textContent=playing?'⏸ Duraklat':'▶ Oynat';
  [...scn.children].forEach((e,i)=>e.classList.toggle('cur',T>=SC[i].a&&T<SC[i].b))}
function audioSync(){if(!AU.ctx)return;if(playing&&!AU.muted)AU.start(T);else AU.stop()}
function speak(txt){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt);u.lang='tr-TR';u.rate=.92;u.pitch=.9;const v=speechSynthesis.getVoices().find(v=>v.lang&&v.lang.toLowerCase().startsWith('tr'));if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){}}
function setPlay(p){playing=p;if(p&&T>=DUR)T=0;if(!p)try{speechSynthesis.cancel()}catch(e){}audioSync();upd()}
function seekTo(t){T=clamp(t,0,DUR);try{speechSynthesis.cancel()}catch(e){}audioSync();upd();render(T)}
function restart(){T=0;playing=true;audioSync();upd()}
function setSound(on){if(on){AU.init();AU.setMuted(false);$('#bSnd').textContent='🔊 Ses açık';$('#bSnd').classList.add('on');audioSync()}else{AU.setMuted(true);AU.stop();$('#bSnd').textContent='🔇 Ses kapalı';$('#bSnd').classList.remove('on')}}
function recMode(on){document.body.classList.toggle('rec',on);document.body.classList.toggle('hideui',on);if(on&&!qs.has('altyazi')){capOn=false}}
function startRecording(){recMode(true);T=0;playing=false;try{speechSynthesis.cancel()}catch(e){}AU.stop();setTimeout(()=>{playing=true;last=performance.now();audioSync()},3000)}
function loop(now){
  const dt=Math.min(.1,(now-last)/1000);last=now;
  if(playing){const p=T;T+=dt;if(T>=DUR){T=DUR;playing=false;AU.stop()}
    if(ttsOn)for(const v of VO){if(p<v[0]&&T>=v[0])speak(v[2])}}
  render(T);
  if(!document.body.classList.contains('hideui'))upd();
  requestAnimationFrame(loop);
}
$('#bPlay').onclick=()=>setPlay(!playing);
$('#bRestart').onclick=restart;
$('#bSnd').onclick=()=>setSound(AU.muted);
$('#bCap').onclick=()=>{capOn=!capOn;$('#bCap').classList.toggle('on',capOn)};
$('#bTts').onclick=()=>{ttsOn=!ttsOn;$('#bTts').classList.toggle('on',ttsOn);if(!ttsOn)try{speechSynthesis.cancel()}catch(e){}};
$('#bHide').onclick=()=>document.body.classList.add('hideui');
$('#bRec').onclick=startRecording;
$('#bFs').onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()};
$('#seek').oninput=e=>{playing=false;seekTo(parseFloat(e.target.value))};
addEventListener('keydown',e=>{
  if(e.code==='Space'){e.preventDefault();setPlay(!playing)}
  else if(e.key==='r'||e.key==='R')restart();
  else if(e.key==='h'||e.key==='H')document.body.classList.toggle('hideui');
  else if(e.key==='k'||e.key==='K')startRecording();
  else if(e.key==='f'||e.key==='F')$('#bFs').onclick();
  else if(e.key==='m'||e.key==='M')setSound(AU.muted);
  else if(e.key==='c'||e.key==='C')$('#bCap').onclick();
  else if(e.key==='ArrowRight')seekTo(T+2);else if(e.key==='ArrowLeft')seekTo(T-2);
  else if(e.key==='Escape')document.body.classList.remove('hideui','rec');
});
// ilk kullanıcı etkileşiminde ses motorunu hazırla (tarayıcı otomatik ses çalmaya izin vermez)

if(qs.has('pre'))qs.get('pre').split(',').forEach(x=>render(parseFloat(x)));
if(qs.has('t')){T=parseFloat(qs.get('t'))||0;playing=false}
if(qs.get('arayuz')==='0'){document.body.classList.add('hideui');ui.style.display='none';$('#hint').style.display='none'}
if(qs.has('altyazi'))capOn=qs.get('altyazi')!=='0';
if(qs.get('kayit')==='1'){recMode(true);T=0;playing=false;const d=parseFloat(qs.get('gecikme')||'3');setTimeout(()=>{playing=true;last=performance.now()},d*1000)}

/* ---------- kendi kendini test: ?selftest=1 ----------
   Tüm zaman çizelgesini 0.25 sn adımlarla gezer; hata yakalar, metinlerin güvenli alanda olup olmadığını ölçer. */
function selftest(){
  const out={dur:DUR,scenes:SC.map(s=>`${s.a}-${s.b} ${s.n}`),sceneSum:SC.reduce((a,s)=>a+(s.b-s.a),0),continuous:SC.every((s,i)=>i===0||s.a===SC[i-1].b)&&SC[0].a===0&&SC[SC.length-1].b===DUR,errors:[],overflow:[]};
  const sels=['.ch','.cin','#cap','.pill','.pn','.pnl','.ln'];
  for(let t=0;t<=DUR;t+=.25){
    try{render(t)}catch(e){out.errors.push(t+': '+e.message)}
    document.querySelectorAll('.ch').forEach(el=>{
      const cs=getComputedStyle(el);if(cs.visibility==='hidden'||+cs.opacity<.5)return;
      let p=el.parentElement,vis=true;while(p&&p.id!=='stage'){const s=getComputedStyle(p);if(s.visibility==='hidden'||s.display==='none'||+s.opacity<.4){vis=false;break}p=p.parentElement}
      if(!vis)return;const r=el.getBoundingClientRect();if(!r.width)return;
      if(r.left<-2||r.right>W+2)out.overflow.push(`${t}: "${el.textContent}" x=${Math.round(r.left)}..${Math.round(r.right)}`)});
  }
  out.overflow=[...new Set(out.overflow)].slice(0,30);
  try{AU.init();AU.setMuted(true);AU.start(0);AU.start(24);AU.start(40);AU.stop();out.audioSmoke='ok'}catch(e){out.errors.push('audio: '+e.message)}
  render(DUR);
  out.finalFrame={ctaVisible:getComputedStyle($('#cta')).display!=='none',urlChars:UR.chars.filter(c=>!c.sp).length,urlText:UR.chars.map(c=>c.el.textContent||' ').join('')};
  $('#st').textContent=JSON.stringify(out,null,1);document.title='SELFTEST-DONE';
}
if(qs.get('selftest')==='1'){document.body.classList.add('hideui');setTimeout(selftest,300)}
else requestAnimationFrame(n=>{last=n;loop(n)});
</script>
</body>
</html>
