/* ============================================================
   FİLM KAYIT DEFTERİ — yeni film eklemek için tek yapılacak iş:
   1) filmler/<slug>/index.html klasörünü oluştur (film dosyası + varsa assets/)
   2) kapaklar/<slug>.jpg ekle (540×960)
   3) aşağıya bir kayıt ekle. Ana sayfa kendiliğinden günceller.
   seri: aynı seriye ait filmler birlikte gruplanır.
   ============================================================ */
window.FILMLER = [
  {
    slug: 'gorunmeyen-yuk',
    baslik: 'GÖRÜNMEYEN YÜK',
    aciklama: 'Bir şantiye şefinin gününde birikip büyüyen küçük sorunlar. Marka filmi.',
    sure: 45, oran: '9:16', seri: 'Marka Filmleri', etiket: 'Hikâyeli', ses: true,
    durum: 'taslak' // gerçek çekim/dış ses sonrası 'yayinda' yapın
  },
  {
    slug: 'mk-ops-1',
    baslik: 'EXCEL VE WHATSAPP İLE Mİ?',
    aciklama: 'Dağınık kayıtlardan tek platforma. Gerçek panel ekranlarıyla ürün tanıtımı.',
    sure: 25, oran: '9:16', seri: 'Ürün Tanıtımı', etiket: 'Bölüm 1', ses: false,
    durum: 'yayinda'
  },
  {
    slug: 'mk-ops-2',
    baslik: 'SAHANIZDA NE OLUYOR?',
    aciklama: 'Genel bakış, iş planı, malzeme ve araç takibi. Panel turu.',
    sure: 25, oran: '9:16', seri: 'Ürün Tanıtımı', etiket: 'Bölüm 2', ses: false,
    durum: 'yayinda'
  },
  {
    slug: 'mk-ops-3',
    baslik: 'DURUM NE? TEK BAKIŞTA.',
    aciklama: 'Soru–cevap formatında kısa, vurucu bir reklam.',
    sure: 25, oran: '9:16', seri: 'Ürün Tanıtımı', etiket: 'Bölüm 3', ses: false,
    durum: 'yayinda'
  }
];
