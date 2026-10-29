# sablon3.html + varlik\*.png  ->  ..\mk-ops-reklam3.html (tek dosya, görseller gömülü)
$k=$PSScriptRoot
$u8=New-Object Text.UTF8Encoding $false
$s=[IO.File]::ReadAllText("$k\sablon3.html",$u8)
function Uri($f){ 'data:image/png;base64,'+[Convert]::ToBase64String([IO.File]::ReadAllBytes("$k\..\varlik\$f")) }
$s=$s.Replace('{{LOGO}}',(Uri 'logo.png')).Replace('{{PUANTAJ3}}',(Uri 'puantaj3.png')).Replace('{{DASH3}}',(Uri 'dash3.png')).Replace('{{STOK3}}',(Uri 'stok3.png'))
[IO.File]::WriteAllText("$k\..\mk-ops-reklam3.html",$s,$u8)
"Hazır: " + (Resolve-Path "$k\..\mk-ops-reklam3.html")
