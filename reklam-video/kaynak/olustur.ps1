# sablon.html + varlik\*.png  ->  ..\mk-ops-reklam.html (tek dosya, görseller gömülü)
$k=$PSScriptRoot
$u8=New-Object Text.UTF8Encoding $false
$s=[IO.File]::ReadAllText("$k\sablon.html",$u8)
function Uri($f){ 'data:image/png;base64,'+[Convert]::ToBase64String([IO.File]::ReadAllBytes("$k\..\varlik\$f")) }
$s=$s.Replace('{{LOGO}}',(Uri 'logo.png')).Replace('{{DASH}}',(Uri 'dashboard.png')).Replace('{{PROJE}}',(Uri 'proje.png')).Replace('{{PUANTAJ}}',(Uri 'puantaj.png'))
[IO.File]::WriteAllText("$k\..\mk-ops-reklam.html",$s,$u8)
"Hazır: " + (Resolve-Path "$k\..\mk-ops-reklam.html")
