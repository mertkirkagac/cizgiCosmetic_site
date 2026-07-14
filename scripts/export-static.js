const fs = require('fs/promises');
const path = require('path');
const app = require('../src/app');
const config = require('../src/config');
const { categories } = require('../src/data/products');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');
const basePath = normalizeBase(process.env.SITE_BASE_PATH || '/cizgiCosmetic_site');

const routes = [
  '/',
  '/kurumsal',
  '/uretim',
  '/urunler',
  ...categories.map((category) => `/urunler/${category.slug}`),
  '/kalite',
  '/iletisim'
];

function normalizeBase(value) {
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
}

function outputPathForRoute(route) {
  const cleanRoute = route.replace(/^\/+|\/+$/g, '');
  return path.join(distDir, cleanRoute, 'index.html');
}

function prefixRootPath(match, quote, url) {
  if (
    url.startsWith('//') ||
    url.startsWith('/cizgiCosmetic_site/') ||
    url.startsWith('/assets/')
  ) {
    return match;
  }

  return match.replace(`${quote}${url}`, `${quote}${basePath}${url}`);
}

function rewriteHtml(html) {
  return html
    .replace(/\b(href|src|action)=("|')(\/[^"']*)\2/g, (match, attr, quote, url) =>
      prefixRootPath(match, quote, url)
    )
    .replace(/url\(("|')(\/[^"']*)\1\)/g, (match, quote, url) =>
      prefixRootPath(match, quote, url)
    )
    .replace(
      /<form method="POST" action="[^"]*" class="contact-form" novalidate>/,
      `<form method="post" action="mailto:${config.site.email}" enctype="text/plain" class="contact-form" novalidate>`
    );
}

async function copyPublic() {
  await fs.cp(publicDir, distDir, {
    recursive: true,
    filter: (source) => !source.endsWith('.DS_Store')
  });
}

async function exportRoute(origin, route) {
  const response = await fetch(`${origin}${route}`);
  if (!response.ok) {
    throw new Error(`Failed to export ${route}: ${response.status} ${response.statusText}`);
  }

  const html = rewriteHtml(await response.text());
  const filePath = outputPathForRoute(route);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html);
}

async function main() {
  await fs.rm(distDir, { recursive: true, force: true });
  await copyPublic();

  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const { port } = server.address();
    const origin = `http://127.0.0.1:${port}`;

    for (const route of routes) {
      await exportRoute(origin, route);
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
