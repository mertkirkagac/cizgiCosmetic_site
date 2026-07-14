const { categories, services, findCategory } = require('../data/products');

exports.home = (req, res) => {
  res.render('pages/home', {
    title: 'Aerosol Dolum ve Fason Üretim | Balıkesir',
    categories,
    services
  });
};

exports.kurumsal = (req, res) => {
  res.render('pages/kurumsal', { title: 'Kurumsal' });
};

exports.uretim = (req, res) => {
  res.render('pages/uretim', { title: 'Üretim & Tesis', services });
};

exports.urunler = (req, res) => {
  res.render('pages/urunler', { title: 'Ürün Grupları', categories });
};

exports.urunKategori = (req, res, next) => {
  const category = findCategory(req.params.slug);
  if (!category) return next(); // 404'e düşer
  res.render('pages/urun-kategori', { title: category.name, category, categories });
};

exports.kalite = (req, res) => {
  res.render('pages/kalite', { title: 'Kalite & Sertifikalar' });
};

exports.iletisim = (req, res) => {
  res.render('pages/iletisim', { title: 'İletişim', sent: false, errors: [], form: {} });
};
