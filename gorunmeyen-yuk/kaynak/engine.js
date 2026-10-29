const W=1080,H=1920,DUR=45;
const FONT='"Inter","Segoe UI Variable Display","Segoe UI",Arial,sans-serif';
const $=s=>document.querySelector(s);
const clamp=(x,a=0,b=1)=>x<a?a:x>b?b:x;
const prog=(t,a,b)=>clamp((t-a)/(b-a));
const lerp=(a,b,u)=>a+(b-a)*u;
const eOut=u=>1-Math.pow(1-u,3), eIn=u=>u*u*u;
const eIO=u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;
const eExp=u=>u>=1?1:1-Math.pow(2,-10*u);
const sm=u=>u*u*(3-2*u);
const spring=p=>p<=0?0:1-Math.exp(-6.5*p)*Math.cos(15*p);
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=mulberry(20251);
const mixc=(a,b,u)=>`rgb(${a.map((v,i)=>Math.round(lerp(v,b[i],u))).join(',')})`;

/* ---------------- kinetik yazı motoru ---------------- */
function buildText(host,spec){
  const el=document.createElement('div');el.className='txt'+(spec.cls?' '+spec.cls:'');
  el.style.top=(spec.top||0)+'px';host.appendChild(el);
  const chars=[];let k=0;const ins=[];
  spec.lines.forEach((ln,li)=>{
    const d=document.createElement('div');d.className='ln';d.style.fontSize='100px';
    const inn=document.createElement('span');inn.className='in';d.appendChild(inn);el.appendChild(d);ins.push(inn);
    ln.segs.forEach(([txt,cls])=>{for(const ch of txt){
      const s=document.createElement('span');s.className='ch'+(cls?' '+cls:'');
      if(ch===' '){s.className+=' sp'}else{s.textContent=ch}
      inn.appendChild(s);chars.push({el:s,li,k:k++,sp:ch===' ',r:R(),c:''});
    }});
  });
  spec.lines.forEach((ln,li)=>{
    const d=el.children[li];const w=ins[li].offsetWidth||1;
    const fs=Math.min(ln.max||200,100*(spec.maxW||940)/w);
    d.style.fontSize=fs.toFixed(1)+'px';ln._fs=fs;ln._w=w*fs/100;
    if(ln.lh)d.style.lineHeight=ln.lh;
  });
  return {el,chars,spec,n:k,ins};
}
function runText(tx,t,t0,o){
  o=o||{};const st=o.st==null?.04:o.st,ex=o.ex,exSt=o.exSt==null?.01:o.exSt,exMode=o.exMode||'fall';
  const endT=ex==null?1e9:ex+tx.n*exSt+.9;
  if(t<t0||t>endT){tx.el.style.display='none';return false}
  tx.el.style.display='block';
  for(const c of tx.chars){
    if(c.sp)continue;
    const ln=tx.spec.lines[c.li];const mode=ln.mode||'drop';
    const p=t-(t0+c.k*st);
    let y=0,sx=1,sy=1,rot=0,op=0,bl=0,sc=1;
    if(p>0){
      op=1;
      if(mode==='drop'){
        const fd=.34+c.r*.1;
        if(p<fd){const u=p/fd;y=-(1-u*u)*(1500+c.r*300);sy=1.28;sx=.84;rot=(c.r-.5)*10*(1-u);bl=(1-u)*3}
        else{const q=p-fd;const e=Math.exp(-8*q)*Math.cos(22*q);sy=1-.4*e;sx=1+.24*e;y=-Math.abs(Math.sin(q*13))*Math.exp(-6*q)*34}
      }else if(mode==='grow'){
        sc=spring(p);op=clamp(p*9);bl=(1-clamp(p*5))*10;
      }else if(mode==='shrink'){
        sc=1+2.6*Math.exp(-8.5*p)*Math.cos(8*p);op=clamp(p*12);bl=13*Math.exp(-13*p);
      }else{ y=(1-eOut(clamp(p/.5)))*70;op=clamp(p*4);bl=(1-clamp(p*3))*8 }
    }
    if(ex!=null){
      const q=t-(ex+c.k*exSt);
      if(q>0){
        if(exMode==='fall'){y+=q*q*2900;sy*=1+q*1.1;rot+=(c.r-.5)*34*q;op*=1-clamp(q/.4)}
        else{const u=clamp(q/.42);sc*=1-eIn(u);op*=1-u}
      }
    }
    const s=`translate3d(0,${y.toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg) scale(${(sx*sc).toFixed(3)},${(sy*sc).toFixed(3)})`;
    const key=s+'|'+op.toFixed(2)+'|'+(bl>.4?bl.toFixed(1):0);
    if(c.c!==key){c.c=key;const e=c.el.style;e.transform=s;e.opacity=op.toFixed(3);e.filter=bl>.4?`blur(${bl.toFixed(1)}px)`:'none'}
  }
  return true;
}
const L=(text,cls)=>[[text,cls||'']];

