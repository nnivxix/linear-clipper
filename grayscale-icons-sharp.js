// grayscale-icons-sharp.js
// Usage: node grayscale-icons-sharp.js
// Converts all PNG icons in public/icon/ to grayscale and saves them in public/icon/grayscale/


import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICON_DIR = path.join(__dirname, 'public', 'icon');
const GRAYSCALE_DIR = path.join(ICON_DIR, 'grayscale');

if (!fs.existsSync(GRAYSCALE_DIR)) {
  fs.mkdirSync(GRAYSCALE_DIR);
}

fs.readdirSync(ICON_DIR).forEach((file) => {
  if (file.endsWith('.png')) {
    const srcPath = path.join(ICON_DIR, file);
    const destPath = path.join(GRAYSCALE_DIR, file);
    sharp(srcPath)
      .grayscale()
      .toFile(destPath)
      .then(() => {
        console.log(`Converted ${file} to grayscale.`);
      })
      .catch((err) => {
        console.error(`Failed to process ${file}:`, err);
      });
  }
});
