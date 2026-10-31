/* ============================================================
   MK DIGITAL SYSTEMS — Reklam Filmi Ayarları
   Toplam süre SAHNE SÜRELERİNİN TOPLAMIDIR (sabit değil).
   Süre, zaman çizelgesi, müzik, kayıt ve dışa aktarma buna göre otomatik ayarlanır.
   Önerilen aralık 35–50 sn; dışına çıkarsa uyarı verilir, 50 sn üstü reddedilir.

   Uygulama sahnelerinde:
   lines  : [{text, t, to}]  hikâye cümleleri (sahne içi saniye). Metinler uygulamanın
                              gerçek ekran yazılarından alınmıştır.
   focus  : [{t, x, y, s}]   ekran içi kamera: t sn'de (x,y) noktasına (0–1, görselin oranı) s kat yakınlaş.
   taps   : [{t, x, y}]      dokunma halkası (gerçek ekran koordinatları).
   marks  : [{t, to, x, y, w, h, label}]  gerçek ekrandaki bir alanı çizgiyle vurgular (label: ekranda yazan gerçek ifade).
   name   : uygulama adı (görselin altında yazar)
   video  : "assets/x.mp4"   ileride gerçek ekran kaydı: doluysa görselin yerine oynar
                              (kare kare senkron; ses içermez). Boşsa görsel kullanılır.
   ============================================================ */
window.AD_CONFIG = {
  minDuration: 35,
  maxDuration: 50,
  fps: 30,
  width: 1080,
  height: 1920,
  playBadge: "Google Play'de yayında",
  music: "",   // lisanslı müzik dosyası yolu (örn. "assets/muzik.mp3"). Boşsa kodla üretilen müzik çalar.
  fontStack: "'Segoe UI', 'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
  serifStack: "Georgia, 'Times New Roman', serif",

  scenes: [
    {
      id: "intro", type: "intro", label: "Açılış",              // 0–4 sn
      duration: 4,
      logo: "assets/mk-logo.png",
      kicker: "Mobil Uygulamalarımız",
      mood: { bg: ["#050b1c", "#010309"], key: "#3d86ff" }
    },
    {
      id: "bebek", type: "app", name: "Bebeğimin İlk Yılı", label: "Bebeğimin İlk Yılı",   // 4–13 sn
      duration: 9, serif: true,
      image: "assets/bebegimin-ilk-yili.png", video: "",
      tagline: "En değerli anılar, hep sizinle.",
      mood: { bg: ["#2a1810", "#0a0605"], key: "#ffb273" },
      dir: 1,
      lines: [{ text: "İlk doğum günüm.", t: 1.2, to: 3.8 }, { text: "İlk adımım.", t: 3.8, to: 6.1 }],
      focus: [{ t: 0.6, x: .5, y: .5, s: 1 }, { t: 1.8, x: .5, y: .37, s: 1.2 }, { t: 3.4, x: .5, y: .37, s: 1.2 },
              { t: 4.4, x: .5, y: .68, s: 1.2 }, { t: 5.8, x: .5, y: .68, s: 1.2 }, { t: 7.0, x: .5, y: .5, s: 1 }],
      marks: [{ t: 1.8, to: 3.7, x: .5, y: .37, w: .9, h: .19 }, { t: 4.4, to: 6.0, x: .5, y: .68, w: .9, h: .19 }],
      taps: []
    },
    {
      id: "adisyon", type: "app", name: "MK Adisyon", label: "MK Adisyon",           // 13–21 sn
      duration: 8,
      image: "assets/mk-adisyon.png", video: "",
      tagline: "Masa, mutfak, kasa. Tek ekranda.",
      mood: { bg: ["#101a26", "#04070b"], key: "#7ad3ff" },
      dir: -1,
      lines: [{ text: "Masalar tek bakışta.", t: 1.2, to: 3.7 }, { text: "Hesap isteyen masa belli.", t: 3.7, to: 5.9 }],
      focus: [{ t: 0.6, x: .5, y: .5, s: 1 }, { t: 3.2, x: .5, y: .5, s: 1 }, { t: 4.2, x: .66, y: .5, s: 1.35 }, { t: 5.7, x: .66, y: .5, s: 1.35 }, { t: 6.8, x: .5, y: .5, s: 1 }],
      marks: [{ t: 4.3, to: 5.9, x: .717, y: .535, w: .38, h: .135, label: "Hesap istedi" }],
      taps: [{ t: 4.9, x: .72, y: .535 }]
    },
    {
      id: "aura", type: "app", name: "Aura Günlük", label: "Aura Günlük",            // 21–29 sn
      duration: 8, serif: true,
      image: "assets/aura-gunluk.png", video: "",
      tagline: "Duygularınıza özel bir alan.",
      mood: { bg: ["#1a1340", "#06040f"], key: "#8f78ff" },
      dir: 1,
      lines: [{ text: "Bugünün sende ne bıraktı?", t: 1.2, to: 5.6 }],
      focus: [{ t: 0.6, x: .5, y: .5, s: 1 }, { t: 2.0, x: .5, y: .3, s: 1.25 }, { t: 5.2, x: .5, y: .3, s: 1.255 }, { t: 6.4, x: .5, y: .5, s: 1 }],
      marks: [{ t: 2.4, to: 5.5, x: .5, y: .255, w: .86, h: .165 }], taps: []
    },
    {
      id: "mavi", type: "app", name: "Mavi Kadrajla Öğreniyorum", label: "Mavi Kadrajla Öğreniyorum", // 29–37 sn
      duration: 8,
      image: "assets/mavi-kadraj.png", video: "",
      tagline: "Öğrenmenin renkli dünyası.",
      mood: { bg: ["#0e2a52", "#030914"], key: "#4aa8ff" },
      dir: -1,
      lines: [{ text: "Renkler.", t: 1.0, to: 2.4 }, { text: "Sayılar.", t: 2.4, to: 3.8 }, { text: "Hayvanlar.", t: 3.8, to: 5.2 }, { text: "Harfler.", t: 5.2, to: 6.5 }],
      focus: [{ t: 0.6, x: .5, y: .5, s: 1 }, { t: 1.6, x: .5, y: .68, s: 1.2 }, { t: 6.2, x: .5, y: .68, s: 1.2 }, { t: 7.2, x: .5, y: .5, s: 1 }],
      marks: [
        { t: 1.3, to: 2.6, x: .265, y: .55, w: .46, h: .235 }, { t: 2.6, to: 4.0, x: .75, y: .55, w: .46, h: .235 },
        { t: 4.0, to: 5.4, x: .265, y: .795, w: .46, h: .235 }, { t: 5.4, to: 6.7, x: .75, y: .795, w: .46, h: .235 }
      ],
      taps: [{ t: 1.4, x: .265, y: .55 }, { t: 2.7, x: .75, y: .55 }, { t: 4.1, x: .265, y: .795 }, { t: 5.5, x: .75, y: .795 }]
    },
    {
      id: "outro", type: "outro", label: "Final",                 // 37–43 sn
      duration: 6,
      logo: "assets/mk-logo.png",
      headline: "Dört uygulama. Tek marka.",
      cta: "Google Play'de keşfedin",
      mood: { bg: ["#07132e", "#010309"], key: "#3d86ff" }
    }
  ]
};
