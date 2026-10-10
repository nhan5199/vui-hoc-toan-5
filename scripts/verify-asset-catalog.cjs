const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const sections = ['common', 'canh-dieu', 'chan-troi-sang-tao', 'ket-noi-tri-thuc', 'tai-nguyen', 'bai-doc', 'slide'];
const seen = new Set();
for (const section of sections) {
  const groups = JSON.parse(fs.readFileSync(path.join(root, 'public/catalog', section + '.json'), 'utf8'));
  for (const [folder, files] of Object.entries(groups)) for (const file of files) {
    const asset = folder + '/' + file;
    assert(!seen.has(asset), 'Duplicate path: ' + asset);
    assert(fs.statSync(path.join(root, asset)).isFile(), 'Missing asset: ' + asset);
    assert(!/\.(tmp|json|md|log)$/i.test(file), 'Non-media asset: ' + asset);
    seen.add(asset);
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/catalog', section + '-previews.json'), 'utf8'));
  for (const [source, variant] of Object.entries({ ...manifest.pages, ...manifest.thumbnails })) {
    assert(seen.has(source), 'Preview source is outside its section: ' + source);
    const resolved = path.resolve(root, 'public', variant);
    assert(resolved.startsWith(path.join(root, 'public/previews') + path.sep), 'Invalid preview location');
    assert(fs.statSync(resolved).size < fs.statSync(path.join(root, source)).size, 'Variant is not smaller: ' + variant);
  }
}
const resources = JSON.parse(fs.readFileSync(path.join(root, 'public/catalog/common-resources.json'), 'utf8'));
const ids = new Set();
for (const resource of resources) {
  assert(!ids.has(resource.id), 'Duplicate resource ID'); ids.add(resource.id);
  assert.equal(resource.sizeBytes, fs.statSync(path.join(root, 'public/files', resource.folder, resource.name)).size);
  if (resource.thumbnailUrl) assert(fs.existsSync(path.join(root, 'public', resource.thumbnailUrl)));
}
function count(dir, images) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) total += count(path.join(dir, entry.name), images);
    else if (images ? /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(entry.name) : !/\.(json|md|tmp|log)$/i.test(entry.name)) total++;
  }
  return total;
}
assert.equal(seen.size, count(path.join(root, 'public/images'), true) + count(path.join(root, 'public/files'), false));
console.log(`Verified ${seen.size} unique existing assets across ${sections.length} catalogs.`);
