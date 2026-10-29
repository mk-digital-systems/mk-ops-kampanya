# MK OPS — GÖRÜNMEYEN YÜK
Marka filmi · 45 sn · 9:16 (1080 × 1920) · HTML/CSS/JS · harici kütüphane yok

Ana dosya: **`gorunmeyen-yuk.html`** (aynı klasördeki `assets/` ile birlikte açılmalı)

## 1. Önce dürüst durum özeti

| Konu | Durum |
|---|---|
| Sahne görselleri | **Canlı çekim değil.** Projede şantiye/insan video ya da fotoğrafı yok; üçüncü taraf stok görüntüsü indirmedim (lisans riski). Şantiye, şef ve ofis sahneleri kodla çizilmiş **stilize silüet animasyonudur**. Gerçek çekim gibi sunulmamalıdır. |
| Gerçek klip yuvası | Hazır: `assets/video/sahne1.mp4`, `sahne2.mp4`, `sahne3.mp4`, `sahne5.mp4` dosyalarını koyarsanız ilgili sahnenin arka planı gerçek klibe geçer (bkz. §6). **Gerçek bir klip ile test edilmedi.** |
| Ürün ekranları | Gerçek MK OPS panelinden alındı. Personel adları ve araç plakaları **pikselleştirilerek anonimleştirildi**. Ekranlardaki tutarlar/proje adları panelin demo verisidir. |
| Taşeron | Panelde bu modüle ait temiz ekran görüntüsü yok. Film "taşeron"u **yalnızca dış ses/yazıyla** anar; uydurma ekran yapılmadı. |
| Dış ses | **Gerçek dış ses üretilmedi.** Metin ve saniye zamanlaması hazır (§3), altyazı olarak gösterilir. İsterseniz "Taslak dış ses" düğmesi tarayıcı sesiyle okur (yalnızca taslak amaçlı, kalitesiz olabilir, senkron garanti değil). |
| Ses tasarımı | Gerçek, tarayıcıda üretilir (rüzgâr, uzak makine uğultusu, saat tik-takı, telefon titreşimi, kesme darbeleri, mavi pad, vurgular). Dosya yoktur, hepsi Web Audio ile üretilir. **Kulakla dinleyip mix kontrolü yapılmadı** (yalnızca hatasız çalıştığı test edildi). |

## 2. Sahne ve süre tablosu (toplam 45,0 sn)

| # | Süre | Sahne | Ne olur |
|---|---|---|---|
| 1 | 00:00–00:06 | Sabah 06.45 | Karanlıktan açılır. Gün doğarken şantiye silueti: vinçler, iskelet binalar, ekskavatör, işçiler. Şef elinde kahvesiyle bakar. 02.0'de "06.45 — Yeni bir iş günü." yazılır, 03.9'da film adı belirir. |
| 2 | 00:06–00:15 | Görünmeyen yük | Masa üstten çekilir: evraklar, kol saati, kahve, baret, telefon. 10 bildirim giderek sıklaşır (puantaj, plaka, taşeron imalatı, hakediş…). Kamera telefona yaklaşır. Saat tik-takı belirginleşir. |
| 3 | 00:15–00:22 | Baskı | 6 hızlı kesme (≈1 sn): gelen arama → evraklar → puantaj listesi (hata hücresi) → araç kayıtları (belirsiz konum) → dağınık ekranlar → bilgisayar başında şef. 21.4'te görüntü kararır, sesler kesilir. |
| 4 | 00:22–00:30 | Dönüm noktası | Siyah. "YA HEPSİ TEK YERDE OLSAYDI?" Lacivert zeminde MK OPS logosu (mercek parlaması). Gerçek panelden 4 temiz kadraj: Personel & Puantaj, Projeler, Araçlar, Hakediş. |
| 5 | 00:30–00:39 | Kontrol yeniden sizde | Aynı şef, bu kez gün ışığında, sakin. Laptopta MK OPS (puantaj → proje → genel bakış). Kamera yavaşça açılır. Ekranda: PERSONELİNİZ. PROJELERİNİZ. ARAÇLARINIZ. TAŞERONLARINIZ. → "İşinizi yöneten bilgiler, tek platformda." |
| 6 | 00:39–00:45 | Final | Logo, "İŞİNİZ BÜYÜSÜN." "KONTROL SİZDE KALSIN." MK OPS · Şantiye ve Operasyon Yönetim Platformu · **48 SAAT ÜCRETSİZ DENEYİN** · **mk-ops.tr**. Son ~2,5 sn sabit. |

Renk hikâyesi: soğuk/soluk (1–3) → lacivert + elektrik mavisi (4) → dengeli, doğal, sıcak (5) → lacivert marka finali (6).

## 3. Dış ses metni ve zamanlama (çekim/stüdyo için hazır)

| Başlangıç–bitiş | Metin | Not |
|---|---|---|
| 12.4–14.0 | "Bir şantiyeyi yönetmek…" | kısa duraklama |
| 14.3–16.6 | "…sadece yapılan işi takip etmek değildir." | |
| 18.0–19.5 | "Asıl zor olan…" | |
| 19.8–21.5 | "…her şeyin nerede olduğunu bilmektir." | 21.4'te sesler kesilir |
| 26.0–26.9 | "MK OPS." | |
| 27.3–29.8 | "Şantiyenizin operasyonel kontrol merkezi." | |
| 32.4–36.0 | "Personeliniz. Projeleriniz. Araçlarınız. Taşeronlarınız." | ekranda kelime kelime yazılır |
| 36.4–39.0 | "İşinizi yöneten bilgiler, tek platformda." | ekranda yazılır |

Önerilen ses karakteri: sakin, düşük tonlu, güven veren erkek ya da kadın sesi; hızlı değil.

## 4. Tarayıcıda çalıştırma

1. `gorunmeyen-yuk.html` dosyasına çift tıklayın (Chrome/Edge). `assets/` klasörü yanında olmalı.
2. Film otomatik başlar. **Tarayıcılar sesi kullanıcı etkileşimi olmadan başlatmaz**: "🔇 Ses kapalı" düğmesine ya da `M` tuşuna basın.
3. Kontroller: ⏸ duraklat/oynat, ↺ yeniden başlat, süre çubuğu, sahne şeridi (sahneye tıklayın), ses, altyazı (C), taslak dış ses, temiz mod (H), kayıt (K), tam ekran (F). `←/→` 2 sn sarar. Fare durunca kontroller kaybolur.
4. Adres parametreleri: `?t=12.5` o saniyede durur, `?kayit=1` kontrolsüz 3 sn gecikmeyle başlar, `?altyazi=1` kayıt modunda da altyazıyı gösterir, `?arayuz=0` kontrolleri tamamen gizler, `?selftest=1` otomatik testi çalıştırır.

## 5. Ekran kaydıyla MP4 önerisi

- **OBS Studio:** Tuval 1080×1920, 30 veya 60 FPS. Tarayıcı penceresini 9:16 yapın ya da "Tarayıcı Kaynağı" ekleyip `…/gorunmeyen-yuk.html?kayit=1` adresini verin. "Masaüstü sesi"ni açıp filmde sesi açın. Sonra MP4 olarak dışa aktarın.
- **Ses:** Film sesini ve dış sesi bir video düzenleyicide (DaVinci/CapCut/Premiere) birleştirmeniz en iyisidir. Hazır dış ses dosyanız varsa 12.4. saniyeden itibaren §3'teki zamanlamayla yerleştirin.
- **Kare kare dışa aktarma (isteğe bağlı):** Her kare yalnızca `t` değerinden hesaplandığı için (`?t=…`) kare kare yakalayıp FFmpeg ile birleştirmek mümkündür. Bu scripti yazmadım.

## 6. Gerçek video eklemek (önerilen yükseltme)

Gerçek çekimle filmin sinemasal etkisi kat kat artar. Çekim listesi:

| Dosya | Süre | İçerik |
|---|---|---|
| `assets/video/sahne1.mp4` | 6 sn | Şafakta şantiye, vinç/iş makinesi, kahveli şef (arkadan/yan) |
| `assets/video/sahne2.mp4` | 9 sn | Masa/telefon/evrak yakın planları, bildirim titreşimi |
| `assets/video/sahne3.mp4` | 7 sn | Hızlı kesmeler: telefon görüşmesi, evrak, ekran, şef |
| `assets/video/sahne5.mp4` | 9 sn | Aynı şef, laptopla çalışırken, kamera geri çekilir, gün ışığı |

Dikey 9:16, mümkünse 1080×1920, sık anahtar kareli H.264. Dosya varsa o sahnenin arka planı gerçek klibe geçer. Kenar kullanıcı verisi içeren görüntü çekmeyin.

## 7. Kullanılan varlıklar

- `assets/logo.png`: MK OPS logosu (projedeki afişten kırpıldı)
- `assets/puantaj.png`, `proje.png`, `dashboard.png`, `stok.png`: panel ekran görüntüleri (kişi adları ve plakalar maskelendi)
- Ses: dosya yok, Web Audio ile üretilir
- Yazı tipi: Inter / Segoe UI (sistemde yoksa yedek yazı tipi)
- Kaynak: `kaynak/` klasörü. Değişiklik için parçaları düzenleyip `kaynak/olustur.ps1` çalıştırın.

## 8. Yapılan testler

- Süre: `DUR = 45`, 6 sahne ardışık ve boşluksuz, toplam 45,0 sn (otomatik test).
- 0–45 sn arası her 0,25 sn'de çizim çalıştırıldı: **0 hata**; sahnelerdeki animasyonlu başlık/metinler 1080 px güvenli genişliğin dışına taşmadı.
- Tekrar oynatma: 9 farklı karede, "taze açılış" ile "başka kareler gezildikten sonra aynı kare" ekran görüntüleri **piksel piksel aynı** çıktı.
- Kare kare görsel kontrol: sahne başına en az birer ekran görüntüsü incelendi (1–6. sahne). Düzeltilen hatalar: şef siluetinde kaba çizim, ofis sahnesinde dev kafa, CTA/etiket konumu, tablo satır kırılması.
- Son kare: "mk-ops.tr" 9 karakterin tamamı görünür, CTA düğmesi görünür, 43.0–45.0 sn sabit.
- Mobil önizleme: 520×900 pencerede ölçeklendi ve kontroller doğru yerleşti. (Headless tarayıcı pencereyi ~500 px'in altına indirmediği için gerçek telefonda test edilmedi.)
- Ses motoru: çalıştırma/durdurma/sarma hatasız (duman testi). **Dinleyerek kalite kontrolü yapılmadı.**
- **Yapılmayanlar:** canlı oynatmada 60 FPS ölçümü, düğmelere elle tıklayarak duraklat/ses testi, gerçek video klibiyle test, gerçek telefonda test.

## 9. Mevcut işlere dokunulmadı

Bu çalışma yalnızca `gorunmeyen-yuk/` klasöründe. Mevcut uygulama kodu, veritabanı, `reklam-video/` ve diğer klasörler değiştirilmedi. Deploy, push, migration yapılmadı.
