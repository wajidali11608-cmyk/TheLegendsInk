const sharp = require('sharp');

async function run() {
  // Ultra-crisp 480x480 retina seal badge
  const svgCircle = Buffer.from(`
    <svg width="480" height="480" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1A1C23" />
          <stop offset="85%" stop-color="#0A0B0E" />
          <stop offset="100%" stop-color="#050608" />
        </radialGradient>
        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#DFBD69" />
          <stop offset="50%" stop-color="#9A7428" />
          <stop offset="100%" stop-color="#F2D888" />
        </linearGradient>
      </defs>
      
      <!-- Outer Golden Rim with micro-relief -->
      <circle cx="240" cy="240" r="236" fill="url(#grad)" stroke="url(#goldRim)" stroke-width="4.5" />
      <circle cx="240" cy="240" r="226" fill="none" stroke="#C59E3F" stroke-width="1.2" stroke-dasharray="6,4" opacity="0.85" />
      <circle cx="240" cy="240" r="220" fill="none" stroke="#C59E3F" stroke-width="0.8" opacity="0.4" />
    </svg>
  `);

  const resizedEmblem = await sharp('public/tli-emblem-transparent.png')
    .resize(340, 340, { fit: 'inside' })
    .toBuffer();

  await sharp(svgCircle)
    .composite([{
      input: resizedEmblem,
      gravity: 'center'
    }])
    .png()
    .toFile('public/tli-seal-badge.png');

  console.log('Successfully created retina public/tli-seal-badge.png');
}

run().catch(console.error);
