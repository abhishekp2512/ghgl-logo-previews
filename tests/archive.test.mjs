import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function readText(relativePath) {
  return readFile(path.join(repositoryRoot, relativePath), 'utf8');
}

function htmlImages(markup) {
  return [...markup.matchAll(/<img\s+[^>]*>/g)].map(([tag]) => ({
    tag,
    src: tag.match(/\bsrc="([^"]+)"/)?.[1],
    width: Number(tag.match(/\bwidth="(\d+)"/)?.[1]),
    height: Number(tag.match(/\bheight="(\d+)"/)?.[1]),
  }));
}

async function pngDimensions(filePath) {
  const bytes = await readFile(filePath);
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], `${filePath} is not a PNG`);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

test('the archive does not force a width larger than a 320px viewport client area', async () => {
  const css = await readText('archive.css');
  const bodyRule = css.match(/body\s*\{([^}]*)\}/)?.[1] ?? '';
  assert.doesNotMatch(bodyRule, /\bmin-width\s*:/, 'body min-width causes horizontal scrolling at the 320px breakpoint');
});

for (const htmlPath of ['mocks/index.html', 'mocks/home.html']) {
  test(`${htmlPath} declares accurate intrinsic dimensions for every image`, async () => {
    const markup = await readText(htmlPath);
    const images = htmlImages(markup);
    assert.ok(images.length > 0, `${htmlPath} should contain images`);

    for (const image of images) {
      assert.ok(image.src, `Image is missing src: ${image.tag}`);
      assert.ok(image.width > 0, `${image.src} is missing a positive width`);
      assert.ok(image.height > 0, `${image.src} is missing a positive height`);

      const imagePath = path.resolve(path.dirname(path.join(repositoryRoot, htmlPath)), image.src);
      assert.deepEqual(
        { width: image.width, height: image.height },
        await pngDimensions(imagePath),
        `${image.src} dimensions must match its PNG header`,
      );
    }
  });
}
