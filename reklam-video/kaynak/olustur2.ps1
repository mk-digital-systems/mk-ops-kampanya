# sablon2.html + varlik\*.png  ->  ..\mk-ops-reklam2.html (tek dosya, görseller gömülü)
$k=$PSScriptRoot
$u8=New-Object Text.UTF8Encoding $false
$s=[IO.File]::ReadAllText("$k\sablon2.html",$u8)
function Uri($f){ 'data:image/png;base64,'+[Convert]::ToBase64String([IO.File]::ReadAllBytes("$k\..\varlik\$f")) }
$s=$s.Replace('{{LOGO}}',(Uri 'logo.png')).Replace('{{DASH}}',(Uri 'dashboard.png')).Replace('{{PLAN}}',(Uri 'plan.png')).Replace('{{STOK}}',(Uri 'stok.png')).Replace('{{ZIMMET}}',(Uri 'zimmet.png'))
[IO.File]::WriteAllText("$k\..\mk-ops-reklam2.html",$s,$u8)
"Hazır: " + (Resolve-Path "$k\..\mk-ops-reklam2.html")
