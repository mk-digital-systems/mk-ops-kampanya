# MK OPS — GÖRÜNMEYEN YÜK · Sinematik Üretim Planı
Storyboard · çekim listesi · yapay zekâ video promptları · seslendirme planı · lisans değerlendirmesi

> **Durum:** Değerlendirme taslağıdır. Mevcut HTML, sahne zamanlamaları ve kontroller **korunmuştur ve değiştirilmemiştir**. Yeni video üretilmedi, deploy yapılmadı. Bu plan onaylandıktan sonra son düzenlemeye geçilir.

---

## 0. Yönetici özeti (5 karar)

1. **Hikâye ve 45 sn'lik zamanlama aynen kalıyor.** Gerçek görüntü, mevcut `sahne1/2/3/5.mp4` yuvalarına, aynı saniye aralıklarıyla girecek (Bölüm 3'teki tablo).
2. **Önemli teknik gerçek:** Yapay zekâ video araçları Türkçe/okunur ekran yazısını güvenilir üretemez. Bu yüzden **telefon bildirimleri, laptop ekranı, panel görüntüleri gerçek görüntüye "bindirilmez", HTML'den ayrı kesme (insert) olarak girer.** Kamera çekimleri ekranı belirsiz/ışıklı bırakır. Her çekim planı `[GÖRÜNTÜ]` ya da `[HTML]` diye etiketlendi.
3. **Karakter:** "Aynı şantiye şefi" tutarlılığı için yüzü hep sırt/profil/uzak plan/el ve silüet kadrajlarla veririz. Hem yapay zekâ tutarlılığı hem lisans/kimlik riski düşer.
4. **Görüntü kaynağı önerisi:** Birincil yol **yapay zekâ video (ücretli plan) veya kısa gerçek çekim**. İkincil yol **doğrulanmış lisanslı stok** (Pexels, Pixabay, Coverr). Mixkit lisans metni doğrulanamadığı için **kullanılmayacak**.
5. **Seslendirme:** Gerçek bir erkek ses sanatçısı önerilir; metin ve zamanlama Bölüm 6'da hazır, toplam ses ≈ 17 sn, filmin sessiz anları bilinçli.

---

## 1. Görsel dil (bütün çekimler için ortak)

| Öğe | Karar |
|---|---|
| Biçim | Dikey 9:16, 1080×1920 (kaynak 2160×3840 üretilebilirse tercih edilir) |
| Kare hızı | 24 fps sinema hissi. HTML oynatıcı ekran hızına göre gösterir, sorun olmaz |
| Lens hissi | 35 mm tam kare, hafif sığ alan derinliği, T2.8. Hafif anamorfik parlama sadece güneş/ekran kaynağında |
| Kamera | Tripod/gimbal. Yavaş, kontrollü hareketler (push-in, dolly-out, kayma). Dramatik sallantı yalnızca S3 baskı kesmelerinde, hafif |
| Renk | **Akt 1 (S1–S3):** soğuk, hafif soluk, düşük doygunluk, mavi-gri gölge, tek sıcak vurgu (gün doğumu/baret). **Akt 2 (S4):** lacivert + elektrik mavisi (HTML grafikleri). **Akt 3 (S5):** dengeli, doğal, güven veren, sıcak gün ışığı |
| Doku | Hafif film greni (HTML'de zaten var, kaynakta ağır grain verme) |
| Marka güvenliği | Görüntülerde **okunabilir yazı, marka logosu, plaka, tabela olmamalı** |

### Karakter ve süreklilik bloğu ("şef")

Her prompt ve çekimde aynı tarif kullanılır:

- **Kişi:** Kurgusal Türk erkek, 40'lı yaşların ortası, orta yapılı, kısa koyu saç (şakaklarda hafif kırlaşma), 2–3 günlük sakal. Gerçek bir kişiye/ünlüye benzetme isteme.
- **Şantiye:** sarı baret, antrasit iş montu üstünde turuncu yansıtıcı yelek, koyu iş pantolonu, kahverengi iş botu.
- **Ofis:** baret yok, yelek çıkarılmış, gömlek kolları sıvalı.
- **Sabit aksesuarlar (süreklilik için):** **beyaz kadranlı, siyah kayışlı kol saati** (S2'deki saat çekimiyle eşleşir), **beyaz seramik kahve kupası** (S1 ve S5'te aynı kupa).
- **Yüz kullanımı:** Çoğu planda sırtı veya yan profili görünür. Net yüz çekimi yok.

---

## 2. Karar notu: ekranlar (HTML) neden ayrı

| İçerik | Nasıl üretilir |
|---|---|
| Telefon bildirimleri (S2, S3-A) | **[HTML]** mevcut telefon animasyonu, gerçek görüntü plakasının önünde/arasında |
| Laptop ekranı, MK OPS paneli (S4, S5) | **[HTML]** gerçek panel ekran görüntüleri (anonimleştirilmiş), mevcut modül şeridi |
| Evrak, tablo, plaka listesi (S3) | **[GÖRÜNTÜ]** bulanık/hızlı, okunmaz. Okunmasına gerek yok, baskı hissi verir |
| Logo, tipografi, final | **[HTML]** |

Bu yaklaşım Türkçe metnin yapay zekâ tarafından bozulmasını (harf karışması) tamamen önler ve gerçek panel görüntüsü kullanma kararınızla uyumludur.

---

## 3. Sahne sahne storyboard ve çekim listesi (45 sn)

Süreler mevcut HTML ile aynıdır. "Dosya" sütunu, nihai kurgulanmış klibin adıdır.

### SAHNE 1 — 00:00–00:06 · "Sabah 06.45" · Dosya: `sahne1.mp4` (6 sn)

**Duygu:** Sessiz, soğuk, hafif ağır bir sabah. Her şey normal görünüyor. Gözle görülmeyen bir yük başlıyor.

| Plan | Süre | Çekim | Kamera / lens | Işık / ortam | Hareket |
|---|---|---|---|---|---|
| **1A** | 0.0–2.6 | Gün doğarken geniş şantiye: kule vinçler, betonarme iskelet, uzakta ekskavatör, sis | Alçak açı, 24 mm, çok yavaş push-in, kamera sabit yükseklikte | Doğudan alçak güneş, hafif sis, mavi-gri gölge, ufukta tek sıcak şerit. Soğuk grade | Uzakta işçiler yürür, vinç kolu çok yavaş döner |
| **1B** | 2.6–4.4 | Şef, sırtı/¾ arka, platformda duruyor, elinde buharlı kahve, şantiyeye bakıyor | 50 mm, omuz hizası, yavaş orbit (sağdan sola ~10°) | Sırt ışığı (güneş arkadan), baret kenarında sıcak parlama | Kahveyi hafifçe kaldırır, bir yudum alır, nefes buharı |
| **1C** | 4.4–6.0 | Kupa tutan elin yakın planı → arkada odak dışı güneş/vinç | 85 mm makro-yakın, rack focus: el → şantiye | Güneş parlaması sol üstte | Parmaklar kupayı sarar, buhar yükselir |

- **Boşluk bırak:** Sol alt köşe ("06.45 — Yeni bir iş günü." yazısı) ve üst orta (film adı) temiz kalmalı.
- **Ses:** rüzgâr, uzak dizel uğultusu, vinç metal sesi, düşük drone. VO yok.

### SAHNE 2 — 00:06–00:15 · "Görünmeyen yük" · Dosya: `sahne2.mp4` (9 sn)

**Duygu:** Küçük şeyler birikiyor. Henüz kriz yok, ama sıkışma hissi başlıyor.

| Plan | Süre | Tür | Çekim | Kamera / lens | Işık / ortam | Hareket |
|---|---|---|---|---|---|---|
| **2A** | 6.0–8.0 | GÖRÜNTÜ | Şantiye ofisi masası, **üstten/hafif açılı**: evraklar, baret, kupa, kol saati; telefon **ekranı kapalı** (karanlık), titreşiyor | 35 mm, tepeden, hafif aşağı kayma | Pencereden soğuk sabah ışığı, panjur çizgileri, yumuşak gölge | Telefon masada titreşir, evraklar hafif kayar |
| **2B** | 8.0–9.8 | GÖRÜNTÜ | Evrak yığını + kol saati makro; saat ibresi ilerliyor | 85 mm makro, yavaş push-in, saat ve evrak arasında rack focus | Aynı soğuk ışık, saat camında yansıma | Saniye ibresi tik atar, bir parmak evrakın kenarını çevirir |
| **2C** | 9.8–11.4 | GÖRÜNTÜ | Açık laptop, ekranda bulanık tablo parıltısı, bir el trackpad'de | 50 mm, omuz üstü, odak dışı ekran | Ekran ışığı ele vurur | El imleci arar, durur, tekrar arar |
| **2D** | 11.4–15.0 | **HTML + plaka** | Masa bokeh plakası (kilitli, odak dışı) **arkada**, mevcut **HTML telefon bildirimleri** önde, giderek sıklaşan bildirimler | Plaka: 85 mm, çok sığ alan, ışık titreşimi | Soğuk, hafif kırmızımsı tek aksan (ekran ışığı) | Bildirimler 10 adete kadar çıkar |

- **Ses:** saat tik-takı giderek artar, telefon titreşimi (ahşap masada), kağıt hışırtısı.
- **VO:** 12.2'den itibaren (Bölüm 6).

### SAHNE 3 — 00:15–00:22 · "Baskı" · Dosya: `sahne3.mp4` (7 sn)

**Duygu:** Hızlı, bunaltıcı ama anlaşılır. Kesme ≈ 1.1 sn. Hafif el kamerası hissi.

| Plan | Süre | Çekim | Kamera / lens | Işık | Hareket |
|---|---|---|---|---|---|
| **3A** | 15.0–16.1 | Titreşip çalan telefon masada, bir el telefonu kapar (ekran karanlık) | 35 mm, yakın, hafif el kamerası | Soğuk, kontrastlı | El hızlıca uzanır |
| **3B** | 16.1–17.2 | Evrak yığını hızla karıştırılan eller (içerik okunmaz) | 50 mm yakın | Sert yan ışık | Kağıtlar saçılır |
| **3C** | 17.2–18.3 | Monitör ekranında bulanık tablo, imleç satırlar arasında dolaşır | 85 mm, odak dışı ekran | Mavi-beyaz ekran ışığı | İmleç hızlıca gezinir |
| **3D** | 18.3–19.4 | Dosya/klasör rafı, bir el hızla klasör çeker, üstteki liste okunmaz | 35 mm, kayma | Düşük anahtar ışık | Klasör çekilir, bırakılır |
| **3E** | 19.4–20.6 | Birden çok ekran/laptop kaosu, omuz üstü | 35 mm, hafif zoom-out | Soğuk ekran ışıkları | Şef (sırt) iki ekran arasında bakar |
| **3F** | 20.6–22.0 | Şef profili, laptop ışığıyla hafif aydınlanmış (siluet-yarı), yavaş push-in | 85 mm, çok yavaş push-in | Ekran ışığı yüzün yarısına, arkası karanlık | Kıpırdamadan bakar; **21.4'te görüntü kararır, sesler kesilir** |

### SAHNE 4 — 00:22–00:30 · "Dönüm noktası" · **Görüntü yok, tamamen [HTML]**

Siyah → "YA HEPSİ TEK YERDE OLSAYDI?" → MK OPS logosu (mercek parlaması) → **gerçek panelden 4 temiz kadraj** (Personel & Puantaj, Projeler, Araçlar, Hakediş). Mevcut HTML aynen kalır. (Opsiyonel: ince bir anamorfik mercek parlaması overlay'i, siyah zeminde.)

### SAHNE 5 — 00:30–00:39 · "Kontrol yeniden sizde" · Dosya: `sahne5.mp4` (9 sn)

**Duygu:** Sakin, odaklı, güven veren. Gün yükselmiş, ışık dengeli ve sıcak.

| Plan | Süre | Tür | Çekim | Kamera / lens | Işık / ortam | Hareket |
|---|---|---|---|---|---|---|
| **5A** | 30.0–32.0 | GÖRÜNTÜ | Aynı şef, **omuz üstü**, laptop başında; ekran odak dışı/ışıklı; arkada pencerede aydınlık şantiye | 35 mm, yavaş dolly-out | Pencereden sıcak sabah ışığı, dengeli kontrast | Rahat oturuş, fareyi kullanır, hafif başını eğer |
| **5B** | 32.0–35.0 | **HTML** | MK OPS paneli: puantaj → proje → genel bakış (mevcut modül şeridi) | — | — | VO: "Personeliniz. Projeleriniz…" |
| **5C** | 35.0–37.0 | GÖRÜNTÜ | Şef **pencere yanında**, telefonla kısa konuşur (yan profil, ses yok) | 50 mm, yarı yakın | Pencere ışığı yüz kenarında sıcak, arka plan şantiye | Telefonla konuşur, bir şeyi işaret eder, rahat |
| **5D** | 37.0–39.0 | GÖRÜNTÜ | Geniş ofis, pencere önü silüet-yarı, kamera **yavaşça uzaklaşır**, dışarıda şantiye canlı | 24 mm, dolly-out | Parlak sabah, dengeli, doğal | Şef sakin, odaklı |

- **Ses:** sakin pad açılır, şantiyeden hafif ambiyans, klavye tıkları; VO "İşinizi yöneten bilgiler…" 36.4'te.

### SAHNE 6 — 00:39–00:45 · Final · **Tamamen [HTML]**

Logo, "İŞİNİZ BÜYÜSÜN." "KONTROL SİZDE KALSIN.", MK OPS, Şantiye ve Operasyon Yönetim Platformu, 48 SAAT ÜCRETSİZ DENEYİN, mk-ops.tr. Mevcut HTML aynen kalır.

---

## 4. Yapay zekâ video promptları

**Genel kural (hangi araç olursa):** Önce **ana kare (hero still)** üret, sonra **görüntüden videoya (image-to-video)** çevir. Prompt'lar İngilizce yazıldı (araçlar İngilizcede daha tutarlı). Her klip 5–8 sn üretilir, 1–2.6 sn'lik kısmı kurguda kullanılır. Her kareyi en az 4–6 kez üret, en iyisini seç.

### 4.1 Ortak bloklar (her prompt'un başına/sonuna eklenir)

**STYLE_BLOCK**
```
Cinematic live-action, photorealistic, vertical 9:16, shot on 35mm full-frame, shallow depth of field, 24 fps, natural motion blur, subtle film grain, restrained commercial colour grade, realistic skin and fabric texture, physically plausible lighting.
```

**CHARACTER_BLOCK (şef)**
```
A fictional Turkish construction site manager, mid-40s, medium build, short dark hair with slight grey at the temples, light stubble, wearing a yellow hard hat, charcoal work jacket with an orange high-visibility vest, dark work trousers and brown work boots, white-dial wristwatch with a black strap on his left wrist, holding a white ceramic mug.
```
*(Ofis sahnelerinde: "no hard hat, vest removed, shirt sleeves rolled up".)*

**NEGATIVE_BLOCK**
```
text, captions, subtitles, watermark, logos, brand names, readable signs, license plates, extra fingers, deformed hands, warped faces, plastic skin, cartoon, illustration, 3D render look, oversaturated colours, flicker, morphing, jump cuts, lens distortion artifacts.
```

**Çekim notu:** Yüz detayı gerekmeyen çekimlerde "face turned away / seen from behind / in profile, no close-up of the face" yaz. Bu hem tutarlılığı hem lisans/kimlik riskini azaltır.

### 4.2 Sahne promptları

#### 1A — Geniş şantiye, şafak (2.6 sn kullanılır)
```
{STYLE_BLOCK} Wide establishing shot of a large Turkish construction site at dawn, tower cranes and a concrete frame building under construction, rebar and formwork visible, an unbranded yellow excavator working far in the distance, a few workers in orange vests walking slowly, low golden sun rising on the horizon through light morning mist, cold blue-grey shadows with one warm sun accent. Low angle, 24mm lens, very slow push-in, stable camera. Quiet, heavy, contemplative atmosphere. {NEGATIVE_BLOCK}
```

#### 1B — Şef kahveyle şantiyeye bakıyor (1.8 sn)
```
{STYLE_BLOCK} {CHARACTER_BLOCK} Seen from behind and slightly to the side, standing on a raised dirt platform overlooking the construction site at sunrise, steam rising from the mug, he takes a slow sip and lowers it. Backlit by the low sun, warm rim light on the hard hat and shoulders, cold blue tones in the shadows. 50mm lens at shoulder height, slow orbit of about 10 degrees, shallow depth of field, the site softly blurred behind him. No close-up of the face. {NEGATIVE_BLOCK}
```

#### 1C — Elin ve kupanın yakın planı (1.6 sn)
```
{STYLE_BLOCK} Extreme close-up of a weathered hand holding a white ceramic mug at dawn, steam curling upward, a white-dial wristwatch with black strap visible at the wrist, a high-visibility vest cuff in frame. Rack focus from the hand to the blurred construction site and sun flare behind. 85mm macro-style lens, warm sun flare top-left, cool ambient light. Calm, slow, tactile. {NEGATIVE_BLOCK}
```

#### 2A — Masa, üstten, telefon titreşiyor (2.0 sn)
```
{STYLE_BLOCK} Top-down slightly angled shot of a site-office desk in cold morning light through window blinds: stacks of printed paperwork, a yellow hard hat, a white ceramic mug, a wristwatch, and a smartphone with a dark screen vibrating on the wooden desk, nudging the papers. Soft blind-shadow stripes across the desk, desaturated cool grade. Slow downward drift of the camera. No readable text. {NEGATIVE_BLOCK}
```

#### 2B — Evrak ve kol saati makro (1.8 sn)
```
{STYLE_BLOCK} Macro close-up of a white-dial wristwatch on a desk beside a stack of paperwork, the second hand ticking forward, a fingertip turning the corner of a page. Slow push-in with rack focus from the watch to the paper. 85mm macro lens, cold side light, glass reflection on the watch face, desaturated palette, tense quiet mood. Paper content blurred and unreadable. {NEGATIVE_BLOCK}
```

#### 2C — Laptop, bulanık tablo, el (1.6 sn)
```
{STYLE_BLOCK} Over-the-shoulder shot of a laptop in a dim site office, the screen showing an out-of-focus spreadsheet glow (no readable content), a hand on the trackpad searching, stopping, searching again. Cool blue-white screen light on the hand and desk, dark room, subtle dust in the air. 50mm lens, screen kept out of focus, face not shown. {NEGATIVE_BLOCK}
```

#### 2D — Masa bokeh plakası (HTML telefon bunun önünde) (3.6 sn)
```
{STYLE_BLOCK} Locked-off, heavily defocused plate of a cluttered office desk: stacks of paper, a mug, a hard hat as soft bokeh shapes, cold morning window light, a faint reddish accent from a screen glow, tiny dust motes drifting. Very shallow depth of field, 85mm, no sharp subjects, large clean area in the centre-right for a graphic overlay. No text. {NEGATIVE_BLOCK}
```

#### 3A — Çalan telefon, el kapıyor (1.1 sn)
```
{STYLE_BLOCK} Close shot of a smartphone with a dark screen ringing and vibrating on a desk, a hand quickly reaching in to grab it. Slight handheld shake, cold contrasty light, 35mm lens, fast motion. {NEGATIVE_BLOCK}
```

#### 3B — Evrak karıştıran eller (1.1 sn)
```
{STYLE_BLOCK} Hands rapidly shuffling and sorting printed paperwork on a desk, pages sliding and scattering, hard side lighting, cold tones, slight handheld motion, 50mm, shallow depth of field, content of the papers blurred and unreadable. {NEGATIVE_BLOCK}
```

#### 3C — Monitör, imleç dolaşıyor (1.1 sn)
```
{STYLE_BLOCK} Close shot of a computer monitor showing an out-of-focus dense spreadsheet glow, a mouse cursor darting between rows, blue-white screen light reflected on a desk, 85mm shallow depth of field, no readable text. {NEGATIVE_BLOCK}
```

#### 3D — Klasör rafı (1.1 sn)
```
{STYLE_BLOCK} Side-tracking shot along a shelf of binders and folders in a small site office, a hand quickly pulling one out and putting it back, low-key lighting, cold desaturated look, 35mm, text on spines blurred and unreadable. {NEGATIVE_BLOCK}
```

#### 3E — Çoklu ekran kaosu, omuz üstü (1.2 sn)
```
{STYLE_BLOCK} Over-the-shoulder shot of a man seen from behind between a laptop and a second monitor, both glowing with out-of-focus content, looking from one to the other, slight zoom-out, cold screen light, dark office, no readable text, no face. {NEGATIVE_BLOCK}
```

#### 3F — Şef profili, ekran ışığı (1.4 sn)
```
{STYLE_BLOCK} {CHARACTER_BLOCK} (no hard hat, vest removed, shirt sleeves rolled up) Side profile in a dark site office, half his face lit by cold laptop light, the rest in deep shadow, very slow push-in, still and tense, no expression close-up, 85mm lens, shallow depth of field. {NEGATIVE_BLOCK}
```

#### 5A — Omuz üstü, laptop başında, sakin (2.0 sn)
```
{STYLE_BLOCK} {CHARACTER_BLOCK} (no hard hat, vest removed, shirt sleeves rolled up) Over-the-shoulder shot of him seated at a laptop in a bright site office, the screen softly glowing and out of focus, a large window behind showing a lively construction site in warm morning sun. He works calmly with the mouse. Slow dolly-out, 35mm lens, warm natural window light, balanced contrast, composed and confident mood. Face not shown. {NEGATIVE_BLOCK}
```

#### 5C — Pencere yanında telefonla konuşuyor (2.0 sn)
```
{STYLE_BLOCK} {CHARACTER_BLOCK} (no hard hat, vest removed, shirt sleeves rolled up) Medium shot in side profile beside a large window, speaking calmly on a phone and pointing out toward the site with his free hand, warm morning light on the edge of his face, the construction site softly blurred in the background. 50mm lens, steady camera, natural relaxed movement. No lip-sync required (silent). {NEGATIVE_BLOCK}
```

#### 5D — Geniş ofis, dolly-out (2.0 sn)
```
{STYLE_BLOCK} Wide shot of a bright site office, a man in shirt sleeves partly silhouetted against a big window overlooking a busy construction site in warm morning sun, slow dolly-out revealing the room, balanced natural colours, 24mm lens, calm and assured atmosphere. His face is not shown. {NEGATIVE_BLOCK}
```

### 4.3 Üretim iş akışı (özet)

1. Karakter ve ofis için **referans kareleri** (hero stills) üret, onayla.
2. Her çekim için **ilk kare = onaylanmış referans**, hareketi prompt'tan ver (image-to-video).
3. Her çekim için 4–6 üretim, en iyi 1'i seç.
4. Kurguda 24 fps'e oturt, **soğuk→dengeli** renk geçişini ver, hafif grain.
5. Sahne bazında tek klip olarak dışa aktar: `sahne1.mp4`, `sahne2.mp4`, `sahne3.mp4`, `sahne5.mp4` (**dikey 1080×1920**, sık anahtar kareli H.264).

---

## 5. Görüntü kaynağı ve lisans değerlendirmesi

### 5.1 Doğrulanmış ücretsiz stok kaynakları (lisans metni okundu)

| Kaynak | Ticari/reklam kullanımı | Atıf | Önemli kısıtlar | Karar |
|---|---|---|---|---|
| **[Pexels](https://www.pexels.com/license/)** | Evet (reklam, sosyal medya dahil) | Gerekmez | Tanınabilir kişiler **kötü/olumsuz görünümde** gösterilemez. Ürünü onaylıyormuş gibi gösterme **yasak**. Değiştirilmemiş içeriği satma/yeniden dağıtma yasak. Marka/ticari unvan olarak kullanma yasak | **Kullanılabilir.** Tanınabilir yüz içeren, "baskı altındaki kişi" gibi olumsuz bağlama giren kareler **kullanma**; yüzsüz/sırt/el/silüet çekimleri seç |
| **[Pixabay](https://pixabay.com/service/license-summary/)** | Evet | Gerekmez | Değiştirilmemiş içeriği tek başına dağıtma/satma yasak. Tanınabilir marka/logo, ticari kullanımda sorun. **Tanınabilir kişiler** özel dikkat gerektirir. Yanıltıcı kullanım yasak. Özet sayfası YZ içeriğini kapsamıyor | **Kullanılabilir**, aynı kısıtlarla. Üçüncü taraf hakları (marka, mülkiyet) senin sorumluluğunda |
| **[Coverr](https://coverr.co/license)** | Evet | Gerekmez | **YZ eğitimi/veri seti için kullanım yasak.** Videolardaki **marka/logo için izin gerekir**; tanınabilir kişilerin model sözleşmesi **kullanıcıya verilmez**; bina/özel mülkiyet için izin gerekebilir | **Kullanılabilir**, ama yüzsüz, markasız, tanınabilir mülk/bina içermeyen çekimler seç. Kişi içeren kareler riskli |
| **Mixkit** | **Doğrulanamadı** | — | Sayfa lisans metnini göstermedi ("her içerik türü için ayrı lisans") | **Kullanma.** Lisans metni açıkça doğrulanmadan kullanılmaz |

**Kaynak seçerken kontrol listesi:** (1) görüntüde okunur marka/plaka/tabela var mı, (2) yüz tanınabilir mi, (3) görüntü reklamı onaylıyormuş izlenimi veriyor mu, (4) içerik sayfasının lisans ekran görüntüsünü ve indirme tarihini kaydet, (5) sadece **kendi kurgunda değiştirilmiş** halde kullan.

**Kaynak bulma arama terimleri:** `construction site sunrise`, `tower crane dawn`, `construction worker silhouette`, `hard hat coffee`, `office desk top view`, `laptop over shoulder office`, `phone vibrating desk`, `window morning office`. Türkiye şantiyesi hissi için `rebar`, `concrete formwork` gibi terimler ekle.

> **Yapılmadı / kapsam dışı:** Wikimedia Commons, Videvo ve benzerlerini araştırmadım. Her dosya ayrı lisans taşıdığı için **doğrulanana kadar kullanılmayacak**. Stok müzik/ses kaynaklarını da doğrulamadım (Bölüm 7).

### 5.2 Yapay zekâ video araçları (ticari kullanım)

Bu bölüm yalnızca **ikincil kaynaklardan** derlendi (blog ve inceleme siteleri), **resmî şartlar doğrudan okunmadı.** Her araç için **güncel resmî Kullanım Şartları'nı üretimden önce kendiniz doğrulayın.**

| Araç | İkincil kaynaklardan görünen durum | Dikkat |
|---|---|---|
| **Runway** | Ücretli planlarda ticari kullanım ve filigransız çıktı; sahiplik iddia etmediğini belirtiyor | Ücretsiz planda filigran var, ticari hakkı kaynaklar çelişiyor. Modeli geliştirmede çıktıyı kullanma/opt-out konusu **resmî şartlardan doğrulanmalı** ([bkz. özet](https://terms.law/ai-output-rights/runway/)) |
| **Google Veo / Flow** | Çıktılarda görünmez **SynthID** filigranı var. Ticari kullanım katmana göre farklı anlatılıyor | Görünür filigran kuralları değişmiş olabilir. **SynthID'i kaldırmaya çalışma** (şartlara aykırı olabilir). Resmî Flow/Gemini şartlarını kontrol et |
| **Kling** | Ücretsiz katman ticari kullanım için lisanslı değil. Ücretli planlarda hak var ama **hangi plandan itibaren** olduğu kaynaklara göre değişiyor ve şartlarda ticari kullanım için yazılı izin maddesi geçtiği söyleniyor | **En belirsiz olan.** Pro/üst plan ve yazılı doğrulama olmadan reklamda kullanma. Abonelik öncesi üretilen klipler için geriye dönük hak garantisi yok |

**Genel öneri:** Reklam için **ücretli plan** kullan, ödeme/plan belgesini ve lisans ekran görüntüsünü sakla, üretimleri kendi hesabınla yap. Reklam platformlarının (Meta, TikTok, YouTube) yapay zekâ ile üretilmiş gerçekçi içerik **etiketleme** kuralları ayrıca kontrol edilmelidir (bu plan için doğrulanmadı).

### 5.3 Üçüncü yol: kısa gerçek çekim

Filmin büyük bölümü sırt/profil/el/silüet olduğu için **1 günlük, 4–5 kişilik** küçük çekim mümkün ve **hukuken en temiz** yoldur. Gereksinimler: şantiye çekim izni ve İSG kuralları (baret/yelek), oyuncu için yazılı **görüntü hakkı/rıza sözleşmesi**, markasız ekipman. Bu seçenek karakteri ve süreklilik riskini sıfıra yaklaştırır.

### 5.4 Önerilen yol

| Seçenek | Gerçekçilik | Lisans netliği | Maliyet/risk |
|---|---|---|---|
| **A. Kısa gerçek çekim** | En yüksek | En net (kendi çekiminiz) | Orta; izin + oyuncu |
| **B. YZ video (ücretli plan)** | Yüksek (el/yüz hatalarına dikkat) | Planı ve şartları doğrula | Düşük–orta; tutarlılık riski |
| **C. Stok (Pexels/Pixabay/Coverr)** | Değişken; aynı karakteri bulmak zor | Net ama kişi/marka şartları kısıtlayıcı | Düşük; "aynı şef" süreklilik zayıf |

**Önerim:** Ana yol **A veya B**, boşlukları **C** ile (yüzsüz detay çekimleri: makine, vinç, masa, kupa) doldur. Aynı kurguda karıştırılabilir.

---

## 6. Türkçe erkek dış ses planı

### 6.1 Ton ve yönerge

- **Ses:** 40'lı yaşların başı, sıcak baritona yakın, **belgesel/kısa film tonu**, "reklam sesi" değil. Ağırbaşlı, kendinden emin, yumuşak. Gülümseyerek konuşan ses **kullanma** (S1–S3'te gergin, S4–S6'da giderek güven veren).
- **Tempo:** ≈ 4.5–5.5 hece/sn. Cümleler arasında nefes payı.
- **Telaffuz:** "MK OPS" → **"Em Ka Ops"** (onayınıza açık). "mk-ops.tr" → **"em ka ops nokta te re"**.
- **Teknik teslim:** 48 kHz, 24-bit WAV, kuru (efektsiz) kayıt, ayrı dosya/cümle bazlı. Sosyal medya mix hedefi yaklaşık −14 LUFS bütünleşik.
- **Yapay ses kullanılacaksa:** ticari lisans ve ses hakkı belgelenmeli (bu planda **doğrulanmadı**); gerçek bir ses sanatçısı önerilir.

### 6.2 Metin ve zamanlama (45 sn)

| Başlangıç–bitiş | Metin | Hece ≈ | Süre | Yönerge |
|---|---|---|---|---|
| 0.0–12.0 | *(VO yok. Ambiyans, rüzgâr, saat)* | — | — | Sessizlik filmin parçası |
| 12.2–14.0 | **"Bir şantiyeyi yönetmek…"** | 8 | 1.8 sn | Yavaş, düz. Sonunda nefes/askıda |
| 14.5–17.1 | **"…sadece yapılan işi takip etmek değildir."** | 15 | 2.6 sn | Hafif sertleşen kesinlik |
| 17.9–19.1 | **"Asıl zor olan…"** | 5 | 1.2 sn | Kısık, baskı artıyor |
| 19.3–21.3 | **"…her şeyin nerede olduğunu bilmektir."** | 13 | 2.0 sn | Yavaş ama kararlı. **21.4'te ses ve görüntü kesilir** |
| 21.4–25.8 | *(Tam sessizlik; siyah ekran; "YA HEPSİ TEK YERDE OLSAYDI?" yazısı)* | — | — | En güçlü an, VO yok |
| 25.9–26.6 | **"MK OPS."** | 3 | 0.7 sn | Düşük, güven veren, logo anında |
| 27.0–29.6 | **"Şantiyenizin operasyonel kontrol merkezi."** | 14 | 2.6 sn | Sıcak, net |
| 29.6–32.2 | *(Müzik/ambiyans)* | — | — | Geçiş |
| 32.3–36.0 | **"Personeliniz. Projeleriniz. Araçlarınız. Taşeronlarınız."** | 21 | 3.7 sn | Her kelime ≈ 0.9 sn, aralarında kısa duraklama, hafif yükselen güven |
| 36.4–38.9 | **"İşinizi yöneten bilgiler, tek platformda."** | 15 | 2.5 sn | Sakin, tamamlayıcı |
| 40.0–41.1 | *(opsiyonel)* **"İşiniz büyüsün."** | 5 | 1.1 sn | Ekrandaki yazıyla birlikte |
| 41.2–42.4 | *(opsiyonel)* **"Kontrol sizde kalsın."** | 7 | 1.2 sn | Ekrandaki yazıyla birlikte |
| 42.5–44.5 | *(opsiyonel)* **"Kırk sekiz saat ücretsiz deneyin."** | 12 | 2.0 sn | Ekranda CTA ile eş zamanlı |

**Toplam konuşma ≈ 17 sn (opsiyonlu ≈ 22 sn).** Film boyunca yeterli nefes alanı var.

**Alternatif (daha yumuşak) kapanış:** S5 sonunda "İşinizi yöneten bilgiler, tek platformda." yerine *"İşinizi yöneten bilgiler. Tek yerde."* (kısa, daha film gibi). Seçim sizin.

**Mevcut HTML ile fark:** Altyazı zamanlamaları mevcut HTML'de birkaç yerde küçük farklıdır (örn. S3'teki iki cümlenin başlangıcı 18.0/19.8 → burada 17.9/19.3 önerilir). **Onay sonrası** son düzenlemede HTML'deki `VO` listesi bu zamanlamaya çekilir. Şimdi değiştirilmedi.

---

## 7. Ses ve müzik planı (VO dışı)

| Katman | İçerik | Kaynak durumu |
|---|---|---|
| Ambiyans | rüzgâr, uzak dizel/ekskavatör, vinç metal sesi, geri vites bip (uzak), kuş (S5'te) | Lisanslı foley veya kendi kaydınız. **Stok ses lisansı bu planda doğrulanmadı** |
| Foley | telefon titreşimi ahşapta, kağıt hışırtısı, saat tik-takı, klavye/fare, sandalye, kupa | Aynı |
| Müzik | **S1:** sessiz, düşük ambiyans pad. **S2–S3:** sabit düşük nabız, hafif gerilim (60→90 bpm hissi). **S4:** sessizlik → logo anında sıcak yükselen yaylı/piyano. **S5:** sakin, açılan, güven veren. **S6:** kadans, çözülme. Anahtar önerisi: La minör → La majör | Besteleme veya **lisansı doğrulanmış** müzik. Mevcut HTML'deki üretilmiş ses bir **taslak mix** olarak kalabilir |
| Sessizlik | 21.4–25.9 arası bilinçli tam sessizlik | — |

---

## 8. Gerçek MK OPS panel görüntüleri

- Mevcut anonimleştirilmiş panel görüntüleri kullanılmaya devam eder (kişi adları/plakalar pikselli).
- **Yeni ekran kaydı gerekirse:** demo müşteri hesabıyla, 60 fps, 1080×1920 değil **tarayıcı penceresi 1600×1000** kaydedip HTML'de kırpılır. Akışlar: puantaj kaydırma, proje ilerleme çubuğu, araç uyarıları, hakediş kartı, stok tablosu.
- **Taşeron modülü:** Temiz ekran görüntüsü yok. Gösterilecekse önce gerçek bir ekran kaydı alınmalı; **uydurma ekran yapılmayacak**.
- Gerçek müşteri verisi, kişi adı, telefon, plaka, ticari tutar içeren kayıtlar kullanılmayacak.

---

## 9. Entegrasyon (onaydan sonra yapılacak son düzenleme)

1. Dört klip `assets/video/` içine konur (`sahne1/2/3/5.mp4`).
2. HTML'de, klip hazır olan sahnelerde şu an gizlenen **[HTML] insert'lerinin** (S2-D telefon, S5-B panel) klibin içinde doğru saniyelerde **birlikte görünmesi** sağlanır. Şu an klip devreye girince bu katmanlar gizleniyor; bu **bir eksik** ve son düzenlemede çözülecek.
3. Altyazı/VO zamanlamaları §6.2'ye çekilir.
4. Gerçek dış ses ve müzik mix'i eklenir; HTML'deki üretilmiş ses taslak olarak kalır veya kapatılır.
5. Test: 45 sn, zamanlama, taşma, tekrar oynatma, mobil, son kare.

---

## 10. Sizden karar bekleyen noktalar

1. **Yol seçimi:** A (kısa gerçek çekim), B (YZ video) veya C (stok) ya da karışım?
2. **Karakter bloğu** (yaş, kıyafet, sarı baret, beyaz kadranlı saat) uygun mu?
3. **Ses:** gerçek ses sanatçısı mı, yapay ses mi? "Em Ka Ops" telaffuzu doğru mu?
4. **VO opsiyonları:** Final cümleleri (S6) seslendirilsin mi?
5. **Müzik:** özel beste mi, lisanslı kütüphane mi?
6. **YZ aracı ve bütçe** (seçilirse): resmî şartları kendiniz mi doğrulayacaksınız, yoksa ben şart metinlerini tek tek okuyup rapor edeyim mi?

---

## Kaynaklar (lisans araştırması)

- Pexels lisansı: https://www.pexels.com/license/
- Pixabay Content License özeti: https://pixabay.com/service/license-summary/
- Coverr lisansı: https://coverr.co/license
- Mixkit lisansı: https://mixkit.co/license/ (metin doğrulanamadı)
- Runway şartları özeti (ikincil): https://terms.law/ai-output-rights/runway/
- YZ video lisans özeti (ikincil): https://licenseorg.com/blog/ai-video-licensing-2026
- Veo/Flow SynthID ve ticari kullanım (ikincil): https://flowith.io/blog/veo-faq-commercial-rights-watermarks
- Kling fiyat/hak özeti (ikincil): https://www.atlascloud.ai/blog/guides/kling-ai-pricing

> YZ araçları için bağlantılar **ikincil/üçüncü taraf** özetleridir. Resmî şartlar okunmadan ticari kararın dayanağı yapılmamalıdır.
