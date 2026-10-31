# MK DIGITAL SYSTEMS — Sinematik Reklam (9:16, 1080×1920)

Saf HTML/CSS/JS, kütüphanesiz. Toplam süre **sahne sürelerinin toplamıdır** (şu an 43 sn); sabit bir süre varsayımı yoktur.

## Önizleme
`index.html` dosyasını Chrome/Edge ile açın → **Oynat**. Boşluk = oynat/duraklat, ←/→ = ±1 sn.
`index.html?safe=1` (veya "Daha fazla → Güvenli alan") TikTok/Instagram arayüzünün kapatabileceği alanları kırmızı gösterir.

## Kurgu (config.js'ten otomatik hesaplanır)
| Sn | Sahne |
|---|---|
| 0–4 | Marka açılışı (orijinal logo) |
| 4–13 | Bebeğimin İlk Yılı |
| 13–21 | MK Adisyon |
| 21–29 | Aura Günlük |
| 29–37 | Mavi Kadrajla Öğreniyorum |
| 37–43 | Final: dört uygulama + logo + Google Play |

**Süreyi değiştirmek:** `js/config.js` içindeki sahne `duration` değerlerini düzenleyin. Zaman çizelgesi, sahne butonları, müzik, efektler, kayıt ve dışa aktarma otomatik uyum sağlar. İzin verilen en çok süre 50 sn (`maxDuration`), 35 sn altında uyarı verilir.
Hikâye cümleleri (`lines`), ekran içi kamera (`focus`), dokunma halkaları (`taps`) ve vurgu çerçeveleri (`marks`) de aynı dosyadadır; hepsi gerçek ekran görüntüsünün koordinatlarına (0–1) bağlıdır.

## Görseller (`assets/`)
- Aktif dosyalar: `mk-logo.png`, `bebegimin-ilk-yili.png`, `mk-adisyon.png`, `aura-gunluk.png`, `mavi-kadraj.png`. Değiştirip sayfayı yenilemek yeterli; telefon gövdesi görselin **gerçek en-boy oranına** uyar.
- Kaynak çözünürlükleri: Bebeğimin İlk Yılı 180×370, MK Adisyon 197×361, Aura 201×362, Mavi Kadraj 641×1280, logo 1254×1254.
  Üç uygulama ekranı çok küçüktür; büyütmek gerçek detay kazandırmaz (yapay zekâ ile arayüz uydurulmadı). En az 1080 px genişlikte ekran görüntüsü verildiğinde `assets/` içine aynı adla koyun.
- **Gerçek ekran kaydı (MP4):** `config.js` içinde ilgili sahnede `video: "assets/bebek-kayit.mp4"` yazın. Kayıt, görselin yerine telefonun içinde oynar; kare kare zamana bağlanır (videonun sesi kullanılmaz). Sentetik bir test klibiyle doğrulandı; gerçek kayıtla denenmedi.

## Müzik ve ses
- Varsayılan: kodla sentezlenen müzik (telif sorunu yok), sahneye göre enerji artar.
- Lisanslı müzik: `config.js` → `music: "assets/muzik.mp3"`. Dosya yüklemesi için sayfayı `node tools/serve.mjs` ile açın (`http://localhost:8080/`); `file://` altında tarayıcı engeller. Dosya süreyi aşarsa kesilir ve sonda yumuşakça kısılır.
- Ses efektleri (geçiş süpürmeleri, telefon girişi, dokunma tıkları, final çınlaması) config'teki zamanlardan türetilir; görüntüyle birebir senkrondur. Reklam sesiz izlenince de anlaşılır (tüm mesajlar ekran yazısıdır).

## Video çıktısı (önerilen yol)
```
cd tools
npm install        # ilk seferde: puppeteer-core + ffmpeg-static
node render.mjs
```
Çıktı: `out/mk-digital-reklam.mp4` (H.264 + AAC) ve `.webm` (VP9 + Opus), sabit 30 kare/sn, 1080×1920, ayrıca `out/muzik.wav`. Süre config'ten gelir. Chrome/Edge gerekir (`CHROME_PATH`). 43 sn için birkaç dakika sürer.
Hızlı kare kontrolü: `node render.mjs --stills 0,5,20`.

**Tarayıcıda kayıt (deneysel):** "Daha fazla → Tarayıcıda kaydet" sekmeyi yakalayıp WebM indirir; çözünürlük sekme boyutuna, kare hızı tarayıcıya bağlıdır. Yayın için yukarıdaki yöntemi kullanın.
**WebM → MP4:** `ffmpeg -i in.webm -c:v libx264 -pix_fmt yuv420p -crf 16 -c:a aac -movflags +faststart out.mp4`

## Bilinen sınırlar
- Resmî Google Play rozeti dosyası yok; yerine yazılı "Google Play'de yayında / keşfedin" rozeti kullanıldı. Resmî rozet SVG/PNG'si ve doğrulanmış bir mağaza bağlantısı verilirse (QR için) eklenir.
- Dört uygulama ikonu dosyası verilmedi; finalde telefonlar gösteriliyor.
- 15 sn'lik sürüm için altyapı: sahne `duration` değerlerini kısaltıp `lines/focus` zamanlarını ayarlamak yeterlidir; ayrı bir hazır kurgu yok.
