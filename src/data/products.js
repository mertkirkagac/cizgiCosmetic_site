// Ürün kategorileri — slug'lar URL'de kullanılır
const categories = [
  {
    slug: 'kisisel-bakim-spreyleri',
    name: 'Kişisel Bakım Spreyleri',
    short: 'Deodorant, saç spreyi ve vücut spreylerinde hassas formülasyon.',
    description:
      'Deodorantlar, saç spreyleri, kuru şampuanlar ve vücut spreyleri için dermatolojik uyumluluğu önceliklendiren aerosol çözümleri üretiyoruz. Cilt dostu itici gaz oranları ve homojen püskürtme karakteri, her dolumda aynı kalitede sonuç verir.',
    icon: 'mist',
    items: ['Deodorant & Antiperspirant', 'Saç Spreyi', 'Kuru Şampuan', 'Vücut Spreyi', 'Tıraş Köpüğü & Jeli']
  },
  {
    slug: 'oda-ve-ortam-kokulari',
    name: 'Oda & Ortam Kokuları',
    short: 'Kalıcı ve dengeli koku salınımı sağlayan ortam spreyleri.',
    description:
      'Ev, ofis ve ticari alanlar için oda parfümleri, tekstil kokuları ve otomatik makine yedekleri üretiyoruz. Esans yükleme oranı ve valf seçimi, kokunun ortamda dengeli ve uzun süre kalıcı olmasını sağlayacak şekilde optimize edilir.',
    icon: 'leaf',
    items: ['Oda Parfümü', 'Tekstil & Çamaşır Kokusu', 'Otomatik Makine Yedeği', 'Araç İçi Koku']
  },
  {
    slug: 'ev-bakim-urunleri',
    name: 'Ev Bakım Ürünleri',
    short: 'Yüzey ve mobilya bakımında güçlü aerosol formülleri.',
    description:
      'Mobilya cilaları, halı köpükleri, fırın temizleyiciler ve leke çıkarıcılar gibi ev bakım aerosolleri; etkin madde stabilitesi ve püskürtme deseni testlerinden geçirilerek üretilir.',
    icon: 'spark',
    items: ['Mobilya Cilası', 'Halı & Döşeme Köpüğü', 'Fırın Temizleyici', 'Statik Toz Alıcı']
  },
  {
    slug: 'teknik-aerosoller',
    name: 'Teknik Aerosoller',
    short: 'Endüstriyel yağlayıcı, temizleyici ve koruyucu spreyler.',
    description:
      'Pas sökücüler, yağlayıcılar, kontak temizleyiciler ve galvaniz spreyler dahil endüstriyel aerosol ürün grubu; sanayi standartlarına uygun basınç ve doluluk toleranslarıyla dolumlanır.',
    icon: 'gear',
    items: ['Pas Sökücü & Yağlayıcı', 'Kontak Temizleyici', 'Galvaniz & Boya Spreyi', 'Silikon Sprey']
  },
  {
    slug: 'insektisit-ve-biyosidal',
    name: 'İnsektisit & Biyosidal',
    short: 'Ruhsatlandırma süreçleriyle birlikte biyosidal aerosol üretimi.',
    description:
      'Haşere kovucu ve öldürücü spreyler ile yüzey dezenfektanları, biyosidal mevzuatına uygun formülasyon ve ruhsatlandırma danışmanlığı ile birlikte üretilir.',
    icon: 'shield',
    items: ['Sinek & Haşere Spreyi', 'Yüzey Dezenfektanı', 'Kovucu Spreyler']
  }
];

const services = [
  {
    title: 'Fason Dolum',
    text: 'Mevcut formülünüzü kendi markanız altında, günlük yüksek kapasiteli hatlarımızda dolumluyoruz.'
  },
  {
    title: 'Formülasyon Geliştirme',
    text: 'AR-GE laboratuvarımızda sıfırdan formül geliştirme, stabilite ve raf ömrü testleri.'
  },
  {
    title: 'Özel Marka (Private Label)',
    text: 'Ambalaj tasarımından etiketlemeye, size özel hazır ürün gamıyla markanızı hızla pazara taşıyın.'
  },
  {
    title: 'Ambalaj & Lojistik',
    text: 'Teneke ve alüminyum kutu tedariki, koli-palet düzeni ve yurt içi / ihracat sevkiyat yönetimi.'
  }
];

module.exports = {
  categories,
  services,
  findCategory: (slug) => categories.find((c) => c.slug === slug)
};
