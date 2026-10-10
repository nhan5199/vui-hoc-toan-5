const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const emptyArchiveHashes = new Set(require('./empty-archive-hashes.json'));
const root = path.resolve(__dirname, '..');
const groups = {};
function walk(dir, kind) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, kind);
    else if ((kind === 'images' && /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(entry.name)) ||
      (kind === 'files' && !/\.(json|md|tmp|log)$/i.test(entry.name))) {
      const folder = path.relative(root, dir).replace(/\\/g, '/');
      (groups[folder] ??= []).push(entry.name);
    }
  }
}
walk(path.join(root, 'public/images'), 'images');
walk(path.join(root, 'public/files'), 'files');
fs.mkdirSync(path.join(root, 'public/catalog'), { recursive: true });
const sections = ['canh-dieu', 'chan-troi-sang-tao', 'ket-noi-tri-thuc', 'tai-nguyen', 'bai-doc', 'slide'];
const shards = { common: {} };
const thumbnails = {};
for (const section of ['common', ...sections]) {
  const manifest = path.join(root, 'public/catalog/' + section + '-previews.json');
  if (fs.existsSync(manifest)) Object.assign(thumbnails, JSON.parse(fs.readFileSync(manifest, 'utf8')).thumbnails ?? {});
}
for (const [folder, names] of Object.entries(groups)) {
  const section = sections.find(name => folder.startsWith('public/images/images/' + name + '/')) || 'common';
  (shards[section] ??= {})[folder] = names;
}
for (const [section, folders] of Object.entries(shards)) {
  fs.writeFileSync(path.join(root, 'public/catalog/' + section + '.json'), JSON.stringify(folders));
  const resources = [];
  for (const [folder, names] of Object.entries(folders)) {
    if (!folder.startsWith('public/files/')) continue;
    for (const name of names) {
      const source = folder + '/' + name;
      const resourceFolder = folder.slice('public/files/'.length);
      const parts = resourceFolder.split('/');
      const title = name.replace(/\.[^.]+$/, '');
      const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, source))).digest('hex');
      const expectedPreview = 'public/images/images/' + resourceFolder + '/' + title;
      const candidates = Object.keys(groups).filter(key => key.startsWith('public/images/') && key.endsWith('/' + title));
      const previewFolder = groups[expectedPreview] ? expectedPreview : candidates.length === 1 ? candidates[0] : null;
      const cover = previewFolder ? [...groups[previewFolder]].sort((a, b) => a.localeCompare(b, 'vi', { numeric: true }))[0] : null;
      resources.push({
        id: crypto.createHash('sha256').update(source).digest('hex').slice(0, 20),
        name, title, folder: resourceFolder, textbook: sections.slice(0, 3).includes(parts[0]) ? parts[0] : null,
        kind: parts.find(part => ['e-book', 'ke-hoach-bai-day', 'giao-an-dien-tu', 'phieu-bai-tap'].includes(part)) ?? parts.at(-1),
        semester: parts.find(part => /^hoc-ki-[12]$/.test(part)) ?? null,
        week: Number(parts.find(part => /^tuan-\d+$/.test(part))?.slice(5)) || null,
        extension: path.extname(name).slice(1).toLowerCase(), sizeBytes: fs.statSync(path.join(root, source)).size,
        version: hash.slice(0, 16),
        downloadUrl: source.slice(7).split('/').map(encodeURIComponent).join('/'), previewFolder,
        thumbnailUrl: cover ? thumbnails[previewFolder + '/' + cover] ?? null : null,
        status: emptyArchiveHashes.has(hash) ? 'placeholder' : 'published'
      });
    }
  }
  fs.writeFileSync(path.join(root, 'public/catalog/' + section + '-resources.json'), JSON.stringify(resources));
  const previewFile = path.join(root, 'public/catalog/' + section + '-previews.json');
  if (!fs.existsSync(previewFile)) fs.writeFileSync(previewFile, '{}');
}
console.log(`Generated ${Object.values(groups).reduce((n, files) => n + files.length, 0)} asset paths in ${Object.keys(groups).length} folders.`);
