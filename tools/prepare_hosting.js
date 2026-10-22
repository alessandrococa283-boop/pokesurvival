const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const FILES = [
  '404.html',
  'favicon.ico',
  'index.html',
  'manifest.webmanifest',
  'robots.txt',
  'sitemap.xml',
  'sw.js',
  'version.json'
];
const DIRECTORIES = [
  'assets',
  'contacto',
  'css',
  'en',
  'guia',
  'legendarios',
  'logros',
  'movimientos',
  'novedades',
  'objetos',
  'pokedex',
  'proyecto',
  'shinies',
  'tipos'
];
const EXCLUDED_HOSTING_DIRECTORIES = new Set([path.join('assets', 'cards')]);

function copyTree(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  let count = 0;
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDED_HOSTING_DIRECTORIES.has(path.relative(ROOT, from))) continue;
      count += copyTree(from, to);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
      count++;
    }
  }
  return count;
}

fs.rmSync(PUBLIC, { recursive: true, force: true });
fs.mkdirSync(PUBLIC, { recursive: true });
let copied = 0;
for (const file of FILES) {
  const source = path.join(ROOT, file);
  if (!fs.existsSync(source)) throw new Error(`Falta un archivo necesario para Hosting: ${file}`);
  fs.copyFileSync(source, path.join(PUBLIC, file));
  copied++;
}

const app = path.join(ROOT, 'js', 'app.min.js');
if (!fs.existsSync(app)) throw new Error('Falta js/app.min.js; ejecuta primero node tools/build.js');
fs.mkdirSync(path.join(PUBLIC, 'js'), { recursive: true });
fs.copyFileSync(app, path.join(PUBLIC, 'js', 'app.min.js'));
copied++;

for (const directory of DIRECTORIES) {
  const source = path.join(ROOT, directory);
  if (!fs.existsSync(source)) throw new Error(`Falta un directorio necesario para Hosting: ${directory}`);
  copied += copyTree(source, path.join(PUBLIC, directory));
}

console.log(`Hosting preparado: ${copied} archivos copiados a public/`);
