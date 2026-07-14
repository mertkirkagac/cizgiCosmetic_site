# Çizgi Cosmetic — Kurumsal Web Sitesi

Balıkesir merkezli aerosol sprey üretim firması Çizgi Cosmetic için Node.js kurumsal web sitesi.

## Teknoloji

- **Node.js + Express** — sunucu ve yönlendirme
- **EJS** — sunucu taraflı şablonlama (SEO dostu, build adımı yok)
- **Vanilla CSS/JS** — framework bağımlılığı yok; hero'daki sprey animasyonu canvas ile gerçek zamanlı çizilir
- **Helmet + Compression** — güvenlik başlıkları ve gzip

## Mimari

```
├── server.js                 # Giriş noktası (HTTP sunucu)
├── src/
│   ├── app.js                # Express uygulaması, middleware zinciri
│   ├── config/index.js       # Port, site bilgileri (tel, adres, e-posta)
│   ├── routes/index.js       # URL → controller eşlemesi
│   ├── controllers/          # Sayfa ve iletişim formu mantığı
│   ├── data/products.js      # Ürün kategorileri ve hizmetler (içerik burada düzenlenir)
│   └── views/
│       ├── partials/         # head, header, footer
│       └── pages/            # home, kurumsal, uretim, urunler, kalite, iletisim, 404
└── public/                   # css, js, img (statik dosyalar)
```

## Çalıştırma

```bash
npm install
npm start          # üretim
npm run dev        # geliştirme (dosya değişince yeniden başlar)
```

Site varsayılan olarak `http://localhost:3000` adresinde açılır. Hosting sağlayıcısı `PORT` ortam değişkeni verirse otomatik kullanılır.

## Node.js hosting'e dağıtım (cPanel vb.)

1. Proje dosyalarını yükleyin (`node_modules` hariç)
2. "Setup Node.js App" ekranında: Application root → proje klasörü, Startup file → `server.js`, Node sürümü → 18+
3. `npm install` çalıştırın ve uygulamayı başlatın
4. `NODE_ENV=production` ortam değişkenini ekleyin

## İçerik güncelleme

- **Telefon / adres / e-posta:** `src/config/index.js`
- **Ürün grupları ve hizmetler:** `src/data/products.js`
- **Sayfa metinleri:** `src/views/pages/*.ejs`
- **İletişim formu:** şu an sunucu loguna yazar; SMTP bilgileri hazır olduğunda `src/controllers/contactController.js` içine nodemailer eklenecek şekilde tasarlandı
