/* =====================================================================
   ÇİZİM KATMANI — stilize silüet sinematografisi (canlı çekim DEĞİLDİR)
   ===================================================================== */
const TAU=Math.PI*2;
function lg(g,x0,y0,x1,y1,st){const q=g.createLinearGradient(x0,y0,x1,y1);for(const [o,c] of st)q.addColorStop(o,c);return q}
function rgd(g,x,y,r0,r1,st){const q=g.createRadialGradient(x,y,r0,x,y,r1);for(const [o,c] of st)q.addColorStop(o,c);return q}
function rrect(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
const mixA=(a,b,u)=>a.map((v,i)=>v+(b[i]-v)*u);
const rgb=(a,al)=>al==null?`rgb(${a.map(Math.round).join(',')})`:`rgba(${a.map(Math.round).join(',')},${al})`;

/* kule vinç: kafes gövde, yük kolu, karşı ağırlık, ışık */
function crane(g,x,by,h,jl,col,t,blink){
  const w=26,top=by-h;
  g.strokeStyle=col;g.fillStyle=col;g.lineWidth=3;g.lineJoin='round';
  g.beginPath();g.moveTo(x-w/2,by);g.lineTo(x-w/2,top);g.moveTo(x+w/2,by);g.lineTo(x+w/2,top);
  for(let y=0;y<h;y+=30){g.moveTo(x-w/2,by-y);g.lineTo(x+w/2,by-y-30);g.moveTo(x+w/2,by-y);g.lineTo(x-w/2,by-y-30)}
  g.stroke();
  const sw=Math.sin(t*.22+x*.01)*5;
  g.beginPath();g.moveTo(x-jl*.3,top-6);g.lineTo(x+jl,top+sw*.1);g.moveTo(x-jl*.3,top+12);g.lineTo(x+jl,top+sw*.1);
  for(let k=0;k<=24;k++){const px=x-jl*.3+(jl*1.3)*k/24;const ty=top-6+(sw*.1+6)*k/24;g.moveTo(px,ty);g.lineTo(px+jl*.027,top+12+(sw*.1-12)*(k+1)/24*0)}
  g.stroke();
  g.beginPath();g.moveTo(x,top-72);g.lineTo(x+jl*.95,top-2);g.moveTo(x,top-72);g.lineTo(x-jl*.3,top-6);g.moveTo(x,top-72);g.lineTo(x,top);g.stroke();
  g.fillRect(x-jl*.3-8,top+4,34,40);
  const tx=x+jl*.58+Math.sin(t*.18+x)*jl*.06;
  g.fillRect(tx-6,top+8,12,10);g.lineWidth=2;g.beginPath();g.moveTo(tx,top+18);g.lineTo(tx,top+110+sw*3);g.stroke();
  g.fillRect(tx-7,top+110+sw*3,14,16);
  if(blink){const a=.25+.75*(Math.sin(t*3+x)>.6?1:0);g.fillStyle=`rgba(255,70,50,${a})`;g.beginPath();g.arc(x,top-76,5,0,TAU);g.fill();g.fillStyle=`rgba(255,70,50,${a*.25})`;g.beginPath();g.arc(x,top-76,22,0,TAU);g.fill()}
}
/* betonarme iskelet bina */
function frameBuilding(g,x,by,w,floors,fh,col,scaf){
  g.fillStyle=col;g.strokeStyle=col;
  const cols=Math.max(3,Math.round(w/90)),cw=w/(cols-1);
  for(let f=0;f<floors;f++){
    const y=by-(f+1)*fh;g.fillRect(x,y,w,12);
    for(let c=0;c<cols;c++)g.fillRect(x+c*cw-6,y,12,fh);
  }
  g.fillRect(x-4,by-floors*fh-4,w+8,10);
  for(let c=0;c<cols;c+=2)g.fillRect(x+c*cw-3,by-floors*fh-70,6,70);
  if(scaf){g.lineWidth=2;g.globalAlpha=.55;g.beginPath();for(let f=0;f<floors*2;f++){const y=by-f*fh/2;g.moveTo(x-18,y);g.lineTo(x+w+18,y)}
    for(let c=0;c<=w+36;c+=36){g.moveTo(x-18+c,by);g.lineTo(x-18+c,by-floors*fh)}g.stroke();g.globalAlpha=1}
}
/* ekskavatör */
function excavator(g,x,y,s,t,col){
  g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=col;g.strokeStyle=col;
  rrect(g,-125,-38,250,46,23);g.fill();
  g.beginPath();g.moveTo(-95,-36);g.lineTo(-95,-96);g.lineTo(-52,-128);g.lineTo(34,-128);g.lineTo(34,-36);g.closePath();g.fill();
  g.fillRect(-120,-52,90,18);
  const a1=-.8+Math.sin(t*.4)*.07,a2=.95+Math.sin(t*.4+1)*.12,a3=1.0+Math.sin(t*.4+2)*.15;
  g.translate(28,-96);g.rotate(a1);g.lineCap='round';g.lineWidth=17;g.beginPath();g.moveTo(0,0);g.lineTo(175,0);g.stroke();
  g.translate(175,0);g.rotate(a2);g.lineWidth=13;g.beginPath();g.moveTo(0,0);g.lineTo(125,0);g.stroke();
  g.translate(125,0);g.rotate(a3);g.beginPath();g.moveTo(0,-8);g.lineTo(48,-4);g.lineTo(60,34);g.lineTo(6,30);g.closePath();g.fill();
  g.restore();
}
function dumpTruck(g,x,y,s,col){
  g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=col;
  g.beginPath();g.moveTo(-150,-60);g.lineTo(60,-96);g.lineTo(60,-14);g.lineTo(-150,-14);g.closePath();g.fill();
  g.beginPath();g.moveTo(70,-14);g.lineTo(70,-86);g.lineTo(118,-86);g.lineTo(146,-48);g.lineTo(146,-14);g.closePath();g.fill();
  for(const wx of [-100,-30,100]){g.beginPath();g.arc(wx,-4,26,0,TAU);g.fill()}
  g.restore();
}
function worker(g,x,y,s,ph,col,vest){
  g.save();g.translate(x,y);g.scale(s,s);g.strokeStyle=col;g.fillStyle=col;g.lineCap='round';
  const sw=Math.sin(ph)*12;g.lineWidth=8;
  g.beginPath();g.moveTo(0,-60);g.lineTo(-7+sw,0);g.moveTo(0,-60);g.lineTo(7-sw,0);g.stroke();
  g.lineWidth=16;g.beginPath();g.moveTo(0,-62);g.lineTo(0,-118);g.stroke();
  g.lineWidth=6;g.beginPath();g.moveTo(0,-112);g.lineTo(-14-sw*.5,-80);g.moveTo(0,-112);g.lineTo(14+sw*.5,-80);g.stroke();
  g.beginPath();g.arc(0,-132,10,0,TAU);g.fill();
  g.fillStyle=`rgba(210,160,50,.9)`;g.beginPath();g.arc(0,-135,11,Math.PI,TAU);g.fill();
  if(vest){g.fillStyle='rgba(255,120,30,.75)';g.fillRect(-7,-116,14,30)}
  g.restore();
}
/* şantiye şefi — arkadan siluet; ışık sağdan vurur */
function chief(g,x,y,s,t,o){
  o=o||{};
  g.save();g.translate(x,y);g.scale(s,s);
  const sway=Math.sin(t*.7)*1.2;
  const P=new Path2D();
  // bacaklar + botlar
  P.moveTo(-40,-154);P.lineTo(-4,-154);P.lineTo(-8,-14);P.lineTo(-38,-14);P.closePath();
  P.moveTo(4,-154);P.lineTo(40,-154);P.lineTo(38,-14);P.lineTo(8,-14);P.closePath();
  P.moveTo(-42,-16);P.lineTo(-4,-16);P.lineTo(-2,0);P.lineTo(-46,0);P.closePath();
  P.moveTo(4,-16);P.lineTo(42,-16);P.lineTo(46,0);P.lineTo(2,0);P.closePath();
  // gövde + omuzlar
  P.moveTo(-17,-340);P.bezierCurveTo(-42,-338,-62,-328,-66,-308);P.lineTo(-58,-204);P.lineTo(-50,-150);P.lineTo(50,-150);P.lineTo(58,-204);P.lineTo(66,-308);P.bezierCurveTo(62,-328,42,-338,17,-340);P.closePath();
  // sol kol (sarkık)
  P.moveTo(-66,-308);P.bezierCurveTo(-82,-302,-90,-262,-88,-214);P.lineTo(-84,-168);P.lineTo(-68,-168);P.lineTo(-64,-214);P.lineTo(-58,-290);P.closePath();
  // sağ kol (fincan tutan, dirsekten kıvrık)
  P.moveTo(66,-308);P.bezierCurveTo(84,-298,96,-272,94,-244);P.lineTo(80,-226);P.lineTo(62,-246);P.lineTo(58,-290);P.closePath();
  // boyun + kafa
  P.rect(-10,-346,20,14);P.ellipse(0,-370+sway*.3,25,29,0,0,TAU);
  g.fillStyle='#080b11';g.fill(P);
  if(o.hat){g.fillStyle='#b88f2c';g.beginPath();g.arc(0,-378+sway*.3,35,Math.PI,TAU);g.fill();g.beginPath();g.ellipse(0,-378+sway*.3,46,8,0,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.2)';g.fillRect(-9,-413+sway*.3,5,28)}
  g.fillStyle='rgba(190,200,210,.26)';g.fillRect(-56,-278,112,8);g.fillRect(-52,-222,104,8);
  // sırt ışığı: yalnızca sağ kenarda ince parlama
  g.save();g.clip(P);g.globalCompositeOperation='lighter';
  g.fillStyle=lg(g,34,0,100,0,[[0,'rgba(255,184,120,0)'],[1,`rgba(255,196,130,${o.rim==null?.6:o.rim})`]]);g.fillRect(0,-430,110,440);
  g.fillStyle=lg(g,-100,0,-40,0,[[0,'rgba(120,170,255,.22)'],[1,'rgba(120,170,255,0)']]);g.fillRect(-110,-430,80,440);g.restore();
  // fincan + buhar
  if(o.mug){g.fillStyle='#d8d4cc';g.fillRect(84,-262,20,24);g.fillStyle='rgba(20,20,24,.8)';g.fillRect(84,-262,20,5);
    for(let i=0;i<9;i++){const ph=((t*.5+i/9)%1),yy=-266-ph*70,xx=94+Math.sin(ph*6+i)*8+ph*6;g.fillStyle=`rgba(230,230,235,${.3*(1-ph)})`;g.beginPath();g.arc(xx,yy,4+ph*10,0,TAU);g.fill()}}
  g.restore();
}
/* =========================== ŞANTİYE (S1, S5 penceresi) ===========================
   o: day 0..1 (şafak→sabah), px (kamera kayması), chief:{x,y,s}, fogAmt */
function drawSite(g,t,o){
  const day=o.day,HY=1020,px=o.px||0,P=f=>-px*f;
  const top=mixA([12,20,36],[70,128,190],day),mid=mixA([40,58,86],[142,188,226],day),hz=mixA([184,164,150],[232,228,216],day);
  g.fillStyle=lg(g,0,0,0,HY+40,[[0,rgb(top)],[.55,rgb(mid)],[1,rgb(hz)]]);g.fillRect(-300,-300,1680,HY+340);
  // güneş
  const sx=700+P(.05),sy=HY-30-o.sun*230,sr=lerp(70,95,day);
  g.fillStyle=rgd(g,sx,sy,10,780,[[0,'rgba(255,214,160,.7)'],[.18,'rgba(255,170,100,.28)'],[1,'rgba(255,170,100,0)']]);g.fillRect(-300,-300,1680,HY+340);
  g.fillStyle='rgba(255,236,196,.95)';g.beginPath();g.arc(sx,sy,sr,0,TAU);g.fill();
  // ışık huzmeleri
  g.save();g.globalCompositeOperation='lighter';
  for(let i=0;i<16;i++){const a=-Math.PI*(.06+.88*i/15)+Math.sin(t*.1+i)*.01,r=1800;g.fillStyle=`rgba(255,200,140,${.034+.02*Math.sin(t*.4+i*1.3)})`;
    g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+Math.cos(a-.018)*r,sy+Math.sin(a-.018)*r);g.lineTo(sx+Math.cos(a+.018)*r,sy+Math.sin(a+.018)*r);g.closePath();g.fill()}
  g.restore();
  // uzak şehir silueti
  g.save();g.translate(P(.08),0);const far=rgb(mixA([52,70,98],[110,140,176],day),.8);g.fillStyle=far;
  const r0=mulberry(7);for(let x=-200;x<1300;x+=46+r0()*40){const h=60+r0()*160;g.fillRect(x,HY+30-h,40+r0()*30,h+10)}g.restore();
  // sis bandı
  g.fillStyle=lg(g,0,HY-80,0,HY+120,[[0,'rgba(190,176,164,0)'],[.5,rgb(hz,.5)],[1,'rgba(190,176,164,0)']]);g.fillRect(-300,HY-80,1680,200);
  // orta plan: iskelet binalar + vinçler
  const dark=rgb(mixA([24,32,48],[50,64,86],day));
  g.save();g.translate(P(.22),0);
  frameBuilding(g,70,HY+40,430,7,70,dark,true);frameBuilding(g,640,HY+40,260,4,70,dark,false);frameBuilding(g,980,HY+40,200,5,70,dark,false);
  crane(g,320,HY+40,780,520,dark,t,true);crane(g,860,HY+40,600,420,dark,t,true);crane(g,-60,HY+40,520,360,dark,t,true);
  g.restore();
  // zemin
  g.fillStyle=lg(g,0,HY+30,0,1920,[[0,rgb(mixA([92,80,72],[150,132,112],day))],[.25,rgb(mixA([52,48,50],[98,86,74],day))],[1,rgb(mixA([18,20,26],[44,40,38],day))]]);g.fillRect(-300,HY+30,1680,1200);
  // orta zemin: ekskavatör, kamyon, işçiler
  const near=rgb(mixA([14,20,32],[40,48,60],day));
  g.save();g.translate(P(.5),0);
  excavator(g,230,HY+150,.95,t,near);
  dumpTruck(g,((t*16)%1500)-260,HY+215,.8,near);
  for(let i=0;i<6;i++)worker(g,160+i*150+Math.sin(t*.2+i)*14,HY+225+(i%3)*22,.42+(i%3)*.04,t*3+i,near,true);
  g.restore();
  // alçak sis + toz
  g.fillStyle=lg(g,0,HY+60,0,HY+360,[[0,rgb(hz,.0)],[.4,rgb(hz,.2+.1*(1-day))],[1,rgb(hz,0)]]);g.fillRect(-300,HY+60,1680,320);
  // ön plan: bariyer, koni, demir
  g.save();g.translate(P(1),0);
  const fg=rgb(mixA([8,11,18],[28,32,40],day));g.fillStyle=fg;
  g.fillRect(-60,1520,1300,10);g.fillRect(-60,1580,1300,6);
  for(let x=20;x<1200;x+=230){g.fillRect(x,1470,14,300)}
  g.fillStyle='rgba(255,120,40,.85)';for(const cx of [70,1010]){g.beginPath();g.moveTo(cx,1840);g.lineTo(cx+26,1760);g.lineTo(cx+52,1840);g.closePath();g.fill()}
  g.fillStyle=fg;for(let i=0;i<6;i++)g.fillRect(940+i*18,1260-i*6,3,640);
  g.restore();
  // şef
  if(o.chief){const c=o.chief;g.save();g.translate(P(1),0);chief(g,c.x,c.y,c.s,t,{hat:true,mug:true,rim:.35+.45*day});g.restore()}
  // toz zerrecikleri
  g.fillStyle=`rgba(255,226,190,${.22+.1*day})`;const r1=mulberry(11);
  for(let i=0;i<46;i++){const dx=(r1()*1080+t*(10+r1()*14))%1200-60,dy=(r1()*1900+Math.sin(t*.3+i)*30)%1920;g.beginPath();g.arc(dx,dy,.8+r1()*2.2,0,TAU);g.fill()}
}

/* =========================== MASA (üstten, S2) =========================== */
function drawDesk(g,t,o){
  const cold=o.cold==null?1:o.cold;
  g.fillStyle=lg(g,0,0,1080,1920,[[0,rgb(mixA([30,38,52],[56,52,52],1-cold))],[1,rgb(mixA([14,18,26],[30,28,28],1-cold))]]);g.fillRect(-600,-600,2300,3200);
  g.strokeStyle='rgba(255,255,255,.035)';g.lineWidth=2;g.beginPath();for(let y=-200;y<2300;y+=14){g.moveTo(-200,y+Math.sin(y*.3)*2);g.lineTo(1300,y)}g.stroke();
  // panjur ışığı
  g.save();g.globalCompositeOperation='lighter';
  for(let i=0;i<9;i++){const x=-400+i*210+Math.sin(t*.12)*30;g.fillStyle=`rgba(${cold?'150,185,235':'255,215,170'},.05)`;g.beginPath();g.moveTo(x,-100);g.lineTo(x+110,-100);g.lineTo(x+110+620,2100);g.lineTo(x+620,2100);g.closePath();g.fill()}g.restore();
  const sh=o.shake||0;
  // evraklar
  const r=mulberry(3);
  for(let i=0;i<7;i++){
    g.save();g.translate(250+r()*40+sh*(i%2?1:-1)*.5,720+i*10+r()*20);g.rotate((r()-.5)*.28);
    g.shadowColor='rgba(0,0,0,.5)';g.shadowBlur=28;g.shadowOffsetY=10;g.fillStyle=rgb(mixA([196,202,212],[214,208,198],1-cold));g.fillRect(-280,-380,560,760);g.shadowColor='transparent';
    g.strokeStyle='rgba(70,84,110,.35)';g.lineWidth=2;for(let y=-330;y<340;y+=38){g.beginPath();g.moveTo(-250,y);g.lineTo(250,y);g.stroke()}
    for(let x=-250;x<=250;x+=125){g.beginPath();g.moveTo(x,-340);g.lineTo(x,340);g.stroke()}
    if(i>=5){g.strokeStyle='rgba(190,30,26,.8)';g.lineWidth=5;g.beginPath();g.ellipse(-90+i*20,-120+i*40,70,34,.2,0,TAU);g.stroke();g.fillStyle='rgba(60,70,90,.55)';for(let k=0;k<7;k++)g.fillRect(-240,-310+k*76,150+r()*110,10)}
    g.restore();
  }
  // saat (kol saati)
  g.save();g.translate(920,330);g.rotate(-.3);g.fillStyle='#14181f';rrect(g,-52,-220,104,440,40);g.fill();
  g.fillStyle='#1c222c';g.beginPath();g.arc(0,0,120,0,TAU);g.fill();g.strokeStyle='#8b95a6';g.lineWidth=5;g.stroke();
  g.fillStyle='#e8edf5';g.beginPath();g.arc(0,0,106,0,TAU);g.fill();
  g.strokeStyle='#1a2030';g.lineWidth=5;for(let i=0;i<12;i++){const a=i*TAU/12;g.beginPath();g.moveTo(Math.sin(a)*86,-Math.cos(a)*86);g.lineTo(Math.sin(a)*100,-Math.cos(a)*100);g.stroke()}
  const sec=Math.floor(t)+ (1-Math.exp(-((t%1)*18)))*0.999;const mAng=((6*60+45+ (t-6)/60*1)/60)*TAU,hAng=((6+45/60+(t-6)/3600)/12)*TAU;
  g.lineCap='round';g.strokeStyle='#10151f';g.lineWidth=9;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(hAng)*54,-Math.cos(hAng)*54);g.stroke();
  g.lineWidth=6;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(mAng)*84,-Math.cos(mAng)*84);g.stroke();
  const sAng=(sec%60)/60*TAU;g.strokeStyle='#d8362b';g.lineWidth=3;g.beginPath();g.moveTo(-Math.sin(sAng)*16,Math.cos(sAng)*16);g.lineTo(Math.sin(sAng)*92,-Math.cos(sAng)*92);g.stroke();
  g.fillStyle='#d8362b';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();g.restore();
  // fincan (üstten)
  g.save();g.translate(250,1560);g.shadowColor='rgba(0,0,0,.55)';g.shadowBlur=36;g.shadowOffsetY=14;g.fillStyle='#d3d0c8';g.beginPath();g.arc(0,0,112,0,TAU);g.fill();g.shadowColor='transparent';
  g.fillStyle='#1d130d';g.beginPath();g.arc(0,0,92,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.07)';g.beginPath();g.arc(-26,-26,40,0,TAU);g.fill();
  g.fillStyle='#d3d0c8';rrect(g,98,-26,70,52,22);g.fill();
  for(let i=0;i<6;i++){const ph=((t*.3+i/6)%1);g.fillStyle=`rgba(230,235,245,${.12*(1-ph)})`;g.beginPath();g.arc(Math.sin(ph*5+i)*24,-ph*60,40+ph*50,0,TAU);g.fill()}g.restore();
  // baret
  g.save();g.translate(850,1640);g.shadowColor='rgba(0,0,0,.6)';g.shadowBlur=40;g.shadowOffsetY=16;g.fillStyle=rgb(mixA([150,118,34],[190,150,46],1-cold));g.beginPath();g.ellipse(0,0,190,172,0,0,TAU);g.fill();g.shadowColor='transparent';
  g.fillStyle=rgd(g,-40,-50,10,190,[[0,'rgba(255,240,190,.5)'],[1,'rgba(0,0,0,.35)']]);g.beginPath();g.ellipse(0,0,190,172,0,0,TAU);g.fill();
  g.fillStyle='rgba(0,0,0,.28)';g.fillRect(-18,-170,36,340);g.restore();
  // kalem
  g.save();g.translate(520,1560);g.rotate(.9);g.fillStyle='#2b3a55';rrect(g,-130,-8,260,16,8);g.fill();g.fillStyle='#d8362b';g.fillRect(-130,-8,24,16);g.restore();
}

/* =========================== OFİS — omuz üstünden (S3-F, S5) ===========================
   o: day 0..1, win:{x,y,w,h}, lap:{x,y,w,h}   — ekran DOM ile bindirilir */
const LAP={x:262,y:790,w:600,h:380};
function drawOffice(g,t,o){
  const day=o.day;
  g.fillStyle=lg(g,0,0,0,1920,[[0,rgb(mixA([22,28,40],[78,82,90],day))],[1,rgb(mixA([10,12,18],[44,40,38],day))]]);g.fillRect(-600,-600,2300,3200);
  // pencere + dışarısı
  const W0={x:70,y:130,w:940,h:760};
  g.save();rrect(g,W0.x,W0.y,W0.w,W0.h,6);g.clip();g.translate(W0.x+W0.w/2,W0.y+W0.h*.66);g.scale(.5,.5);g.translate(-540,-1020);
  drawSite(g,t,{day:o.day,sun:o.sun,px:o.px||0});g.restore();
  g.fillStyle='rgba(8,10,16,.94)';g.fillRect(W0.x-26,W0.y-26,W0.w+52,26);g.fillRect(W0.x-26,W0.y+W0.h,W0.w+52,32);g.fillRect(W0.x-26,W0.y-26,26,W0.h+58);g.fillRect(W0.x+W0.w,W0.y-26,26,W0.h+58);
  g.fillRect(W0.x+W0.w*.36,W0.y,18,W0.h);g.fillRect(W0.x+W0.w*.68,W0.y,18,W0.h);
  g.fillStyle=`rgba(255,200,150,${.06+.1*day})`;g.fillRect(W0.x,W0.y,W0.w,W0.h);
  // masa
  g.fillStyle=lg(g,0,1120,0,1920,[[0,rgb(mixA([40,42,50],[110,98,86],day))],[1,rgb(mixA([14,16,22],[44,38,34],day))]]);g.fillRect(-300,1120,1680,900);
  g.fillStyle=`rgba(255,200,150,${.1+.12*day})`;g.beginPath();g.moveTo(180,1120);g.lineTo(960,1120);g.lineTo(1100,1500);g.lineTo(60,1500);g.closePath();g.fill();
  // laptop gövdesi
  const L=LAP;
  g.fillStyle='#0b0e14';rrect(g,L.x-18,L.y-18,L.w+36,L.h+36,18);g.fill();
  g.fillStyle='#161b24';g.beginPath();g.moveTo(L.x-70,L.y+L.h+60);g.lineTo(L.x+L.w+70,L.y+L.h+60);g.lineTo(L.x+L.w+10,L.y+L.h+18);g.lineTo(L.x-10,L.y+L.h+18);g.closePath();g.fill();
  g.fillStyle='#1c222d';g.fillRect(L.x-70,L.y+L.h+60,L.w+140,14);
  // ekran ışığı
  g.save();g.globalCompositeOperation='lighter';g.fillStyle=rgd(g,L.x+L.w/2,L.y+L.h+40,10,520,[[0,`rgba(120,170,255,${.2*(1-day*.5)})`],[1,'rgba(120,170,255,0)']]);g.fillRect(-300,L.y,1680,900);g.restore();
  // fincan + buhar (masa sağında)
  g.save();g.translate(940,1330);g.fillStyle='#cfcbc2';rrect(g,-44,-50,88,100,10);g.fill();g.fillStyle='#1d130d';g.fillRect(-38,-46,76,12);
  for(let i=0;i<7;i++){const ph=((t*.4+i/7)%1);g.fillStyle=`rgba(235,235,240,${.16*(1-ph)})`;g.beginPath();g.arc(Math.sin(ph*5+i)*12,-60-ph*110,12+ph*26,0,TAU);g.fill()}g.restore();
  // şef: ön plan, omuz üstü (arkadan, pencere ışığıyla)
  g.save();g.translate(150+(o.cx||0),1600);
  const sh=new Path2D();
  sh.moveTo(-470,420);sh.bezierCurveTo(-430,160,-300,70,-110,60);sh.lineTo(-60,-6);sh.lineTo(60,-6);sh.lineTo(110,60);sh.bezierCurveTo(300,70,440,170,500,420);sh.lineTo(500,700);sh.lineTo(-470,700);sh.closePath();
  const hd=new Path2D();hd.ellipse(0,-128,92,118,0,0,TAU);
  g.fillStyle='#06080d';g.fill(sh);g.fill(hd);
  // sırt ışığı: sağ kenarlarda ince sıcak parlama
  g.save();g.globalCompositeOperation='lighter';
  g.save();g.clip(hd);g.fillStyle=lg(g,30,0,96,0,[[0,'rgba(255,190,130,0)'],[1,`rgba(255,205,150,${.35+.4*day})`]]);g.fillRect(-100,-260,220,280);g.restore();
  g.save();g.clip(sh);g.fillStyle=lg(g,200,60,480,300,[[0,'rgba(255,200,150,0)'],[1,`rgba(255,200,150,${.25+.3*day})`]]);g.fillRect(60,40,460,320);g.restore();
  g.restore();g.restore();
}