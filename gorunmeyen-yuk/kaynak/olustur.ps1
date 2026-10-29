# kaynak parçalarını tek HTML'de birleştirir:  ..\gorunmeyen-yuk.html  (görseller assets\ klasöründen yüklenir)
$k=$PSScriptRoot
$u8=New-Object Text.UTF8Encoding $false
$parts='head.html','engine.js','art.js','film.js','audio.js','player.js'
$s=($parts | % { [IO.File]::ReadAllText("$k\$_",$u8) }) -join "`n"
[IO.File]::WriteAllText("$k\..\gorunmeyen-yuk.html",$s,$u8)
"Hazır: " + (Resolve-Path "$k\..\gorunmeyen-yuk.html") + "  (" + [math]::Round($s.Length/1KB) + " KB)"
