const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
sharp.concurrency(1);
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public/previews');
fs.mkdirSync(output, { recursive: true });
const writes = new Map();
async function ensureVariant(target, create) {
  if (writes.has(target)) return writes.get(target);
  if (fs.existsSync(target)) return;
  // Content-identical pages share a URL; avoid simultaneous writes to that file.
  const work = create().finally(() => writes.delete(target));
  writes.set(target, work);
  await work;
}
async function main() {
  let originalBytes = 0, previewBytes = 0, count = 0;
  for (const section of fs.readdirSync(path.join(root, 'public/catalog')).filter(name => /^(common|canh-dieu|chan-troi-sang-tao|ket-noi-tri-thuc|tai-nguyen|bai-doc|slide)\.json$/.test(name))) {
    const manifest = { pages: {}, thumbnails: {} };
    const folders = JSON.parse(fs.readFileSync(path.join(root, 'public/catalog', section), 'utf8'));
    for (const [folder, names] of Object.entries(folders)) {
      if (!folder.startsWith('public/images/')) continue;
      const pageNames = names.filter(name => /-images-\d+\.(jpg|jpeg|png)$/i.test(name)).sort((a, b) => a.localeCompare(b, 'vi', { numeric: true }));
      for (let offset = 0; offset < pageNames.length; offset += 4) {
        await Promise.all(pageNames.slice(offset, offset + 4).map(async name => {
        const source = folder + '/' + name;
        const buffer = fs.readFileSync(path.join(root, source));
        const id = crypto.createHash('sha256').update('preview-v1-1600-82').update(buffer).digest('hex').slice(0, 24);
        const target = path.join(output, id + '.webp');
        await ensureVariant(target, () => sharp(buffer).rotate().resize({ width: 1600, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82, effort: 0 }).toFile(target));
        const size = fs.statSync(target).size;
        // Never substitute a preview that is larger than its original.
        if (size < buffer.length) manifest.pages[source] = 'previews/' + id + '.webp';
        if (name === pageNames[0]) {
          const thumbnail = path.join(output, id + '-thumb.webp');
          await ensureVariant(thumbnail, () => sharp(buffer).rotate().resize({ width: 400, height: 500, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, effort: 0 }).toFile(thumbnail));
          if (fs.statSync(thumbnail).size < buffer.length) manifest.thumbnails[source] = 'previews/' + id + '-thumb.webp';
        }
        originalBytes += buffer.length; previewBytes += Math.min(size, buffer.length); count++;
        if (count % 1000 === 0) console.log('Processed ' + count + ' pages');
        }));
      }
    }
    fs.writeFileSync(path.join(root, 'public/catalog', section.replace('.json', '-previews.json')), JSON.stringify(manifest));
    console.log('Optimized ' + section + ': ' + Object.keys(manifest.pages).length + ' pages, ' + Object.keys(manifest.thumbnails).length + ' thumbnails');
  }
  console.log(JSON.stringify({ pages: count, originalBytes, previewBytes, savedPercent: Math.round((1 - previewBytes / originalBytes) * 100) }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
