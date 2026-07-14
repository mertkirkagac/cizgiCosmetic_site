const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        scriptSrc: ["'self'"]
      }
    }
  })
);
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  express.static(path.join(__dirname, '..', 'public'), {
    maxAge: config.env === 'production' ? '7d' : 0
  })
);

// Tüm şablonlarda kullanılabilen genel değişkenler
app.use((req, res, next) => {
  res.locals.site = config.site;
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  next();
});

app.use('/', routes);

// 404
app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Sayfa Bulunamadı' });
});

// Genel hata yakalayıcı
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('pages/404', { title: 'Bir Hata Oluştu' });
});

module.exports = app;
