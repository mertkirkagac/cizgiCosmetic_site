// İletişim formu — şimdilik sunucu loguna yazar.
// SMTP bilgileri hazır olduğunda nodemailer entegre edilecek yer burasıdır.

const validate = (body) => {
  const errors = [];
  const form = {
    name: (body.name || '').trim().slice(0, 100),
    company: (body.company || '').trim().slice(0, 100),
    email: (body.email || '').trim().slice(0, 150),
    phone: (body.phone || '').trim().slice(0, 30),
    message: (body.message || '').trim().slice(0, 2000)
  };

  if (form.name.length < 2) errors.push('Lütfen adınızı giriniz.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push('Geçerli bir e-posta adresi giriniz.');
  if (form.message.length < 10) errors.push('Mesajınız en az 10 karakter olmalıdır.');

  return { errors, form };
};

exports.submit = (req, res) => {
  const { errors, form } = validate(req.body);

  if (errors.length) {
    return res.status(422).render('pages/iletisim', { title: 'İletişim', sent: false, errors, form });
  }

  console.log('[İletişim Formu]', JSON.stringify({ ...form, at: new Date().toISOString() }));

  res.render('pages/iletisim', { title: 'İletişim', sent: true, errors: [], form: {} });
};
