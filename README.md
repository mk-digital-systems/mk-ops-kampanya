# MK OPS Kampanya

MK OPS (https://mk-ops.tr) için reklam filmleri, kampanya görselleri ve yayın sitesi. Bu repo yalnızca kampanya çalışmalarını içerir; **MK OPS uygulamasının kaynak kodu burada yoktur.**

## Klasörler

| Klasör | İçerik |
|---|---|
| `site/` | **Yayın sitesi** (Vercel'de yayınlanan klasör): ana sayfa, film sayfaları, kapaklar |
| `reklam-video/` | Film 1–3 üretim dosyaları (`kaynak/` şablon ve derleme betikleri, `varlik/` görseller) |
| `gorunmeyen-yuk/` | "Görünmeyen Yük" filmi (45 sn) + `URETIM-PLANI.md` (storyboard, video promptları, dış ses, lisans) |
| `1111/` | Dikey (1080×1920) kampanya görselleri |
| `2222/` | Gönderi (1080×1350) kampanya görselleri |
| `_panel-ekran-goruntuleri/` | Ham MK OPS panel ekran görüntüleri |
| `site-guncelle.ps1` | Film dosyalarını `site/` içine kopyalar |

## Vercel ayarı

Projeyi GitHub'dan içe aktarırken **Root Directory = `site`**, Framework Preset = *Other*, Build Command boş. Böylece yalnızca `site/` yayınlanır; üretim klasörleri yayına girmez.

Adresler: `/` ana sayfa · `/filmler/<film-adi>/` film.

## Çalışma akışı

1. Filmi düzenle (`reklam-video/kaynak/` ya da `gorunmeyen-yuk/kaynak/`).
2. Derle: ilgili `olustur*.ps1` betiğini çalıştır.
3. `.\site-guncelle.ps1` ile `site/` içine kopyala.
4. Commit + push → Vercel otomatik yayınlar.

Yeni film ekleme: [site/YENI-FILM-EKLEME.md](site/YENI-FILM-EKLEME.md).

## Gizlilik uyarısı

- `_panel-ekran-goruntuleri/` ve `1111/`, `2222/` içinde **maskelenmemiş** demo panel verisi (kişi adları, araç plakaları) bulunur. Repoyu **Private** tutun. Public yapacaksanız önce bu klasörlerdeki görselleri maskelenmiş sürümlerle değiştirin.
- Reklamlarda kullanılan ekranlar `gorunmeyen-yuk/assets/` içinde maskelenmiştir. Film 1–3'te kullanılan ekran kırpmaları ise maskelenmemiştir.
- `.env`, anahtar, parola ya da müşteri verisi bu repoya konmamalıdır.

## Durum ve yapılacaklar

Ayrıntılı takip: [YOL-HARITASI.md](YOL-HARITASI.md)
