# Üretim klasörlerindeki güncel film dosyalarını site/ içine kopyalar.
# Kullanım (repo kökünde):  .\site-guncelle.ps1
# Önce kaynak/olustur*.ps1 ile filmleri derleyin, sonra bunu çalıştırın.
$ErrorActionPreference='Stop'
$r=$PSScriptRoot
$map=@(
  @{slug='mk-ops-1';        src="$r\reklam-video\mk-ops-reklam.html"},
  @{slug='mk-ops-2';        src="$r\reklam-video\mk-ops-reklam2.html"},
  @{slug='mk-ops-3';        src="$r\reklam-video\mk-ops-reklam3.html"},
  @{slug='gorunmeyen-yuk';  src="$r\gorunmeyen-yuk\gorunmeyen-yuk.html"})
foreach($m in $map){
  $dst="$r\site\filmler\$($m.slug)"
  New-Item -ItemType Directory -Force $dst | Out-Null
  Copy-Item $m.src "$dst\index.html" -Force
  "güncellendi: filmler/$($m.slug)/"
}
# gorunmeyen-yuk görselleri (video klipleri siteye alınmaz; gerekirse elle ekleyin)
Copy-Item "$r\gorunmeyen-yuk\assets\*.png" "$r\site\filmler\gorunmeyen-yuk\assets\" -Force
"Tamam. Yeni film eklediyseniz site\filmler.js ve site\kapaklar\ güncelleyin."
