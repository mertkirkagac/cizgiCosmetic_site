const router = require('express').Router();
const pages = require('../controllers/pageController');
const contact = require('../controllers/contactController');

router.get('/', pages.home);
router.get('/kurumsal', pages.kurumsal);
router.get('/uretim', pages.uretim);
router.get('/urunler', pages.urunler);
router.get('/urunler/:slug', pages.urunKategori);
router.get('/kalite', pages.kalite);
router.get('/iletisim', pages.iletisim);
router.post('/iletisim', contact.submit);

module.exports = router;
