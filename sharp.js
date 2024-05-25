const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

fs.readdir(target, async (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const promises = files.map(async (image) => {
    try {
      const inputPath = path.join(target, image);
      const imageBuffer = await sharp(inputPath).toBuffer();

      // Resize to 800px width and save with -large.jpg suffix
      const largeOutputPath = path.join(destination, `${path.parse(image).name}-large.jpg`);
      await sharp(imageBuffer)
        .resize(800)
        .toFile(largeOutputPath);

      // Resize to 480px width and save with -small.jpg suffix
      const smallOutputPath = path.join(destination, `${path.parse(image).name}-small.jpg`);
      await sharp(imageBuffer)
        .resize(480)
        .toFile(smallOutputPath);

      console.log(`Processed ${image}`);
    } catch (err) {
      console.error(`Error processing ${image}:`, err);
    }
  });

  await Promise.all(promises);
  console.log('All images have been processed.');
});
