# Yeni film ekleme (3 adım)

1. `filmler/<film-adi>/index.html` oluşturun (film dosyası; görseli varsa yanına `assets/`). Film kendi içinde çalışır, siteye başka bağımlılığı yoktur.
2. `kapaklar/<film-adi>.jpg` ekleyin (540×960).
3. `filmler.js` içine bir kayıt ekleyin (slug, başlık, açıklama, süre, seri, etiket, durum).

Ana sayfa listeyi ve seri filtrelerini kendiliğinden günceller.

Adresler: `/` ana sayfa · `/filmler/<film-adi>/` film.

**Uygulama reklamları:** `filmler.js` kaydına `bolum: 'uygulamalar'` ekleyin; dosyaları `uygulamalar/<film-adi>/` altına koyun. Film ana sayfada değil `/uygulamalar/` sayfasında listelenir, adresi `/uygulamalar/<film-adi>/` olur (örn. `/uygulamalar/mk-digital-reklam/`).

Vercel: bu `site/` klasörünü kök dizin yapın (Framework: Other, build komutu boş). Yalnızca bu klasör yüklenmeli; `kaynak/`, `reklam-video/`, `gorunmeyen-yuk/` klasörleri yedek ve üretim dosyalarıdır.
Not: `noindex` açık; arama motorlarında çıkmaz. Herkese açmak isterseniz `index.html` içindeki robots satırını ve `vercel.json` başlığını kaldırın.
