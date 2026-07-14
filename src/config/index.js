module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  site: {
    name: 'Çizgi Cosmetic',
    tagline: 'Aerosol Dolum ve Fason Üretim',
    url: process.env.SITE_URL || 'https://www.cizgicosmetic.com.tr',
    phone: '+90 266 000 00 00',
    phoneHref: '+902660000000',
    whatsapp: '+90 500 000 00 00',
    whatsappHref: '905000000000',
    email: 'info@cizgicosmetic.com.tr',
    address: 'Organize Sanayi Bölgesi, Balıkesir / Türkiye'
  }
};
