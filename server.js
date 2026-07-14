const app = require('./src/app');
const config = require('./src/config');

const server = app.listen(config.port, () => {
  console.log(`Çizgi Cosmetic ${config.env} ortamında ${config.port} portunda yayında`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM alındı, sunucu kapatılıyor...');
  server.close(() => process.exit(0));
});
