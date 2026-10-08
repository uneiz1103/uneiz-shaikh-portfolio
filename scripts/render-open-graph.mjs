import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f4ef"/>
  <rect x="80" y="88" width="72" height="72" fill="none" stroke="#1c1b19" stroke-width="2"/>
  <text x="116" y="134" text-anchor="middle" font-family="ui-monospace, monospace" font-size="28" font-weight="600" fill="#1c1b19">US</text>
  <text x="80" y="280" font-family="Georgia, serif" font-size="72" fill="#1c1b19">Uneiz Shaikh</text>
  <text x="80" y="352" font-family="Georgia, serif" font-size="36" fill="#0e5c56">Software Engineer → AI Engineer</text>
  <text x="80" y="520" font-family="ui-monospace, monospace" font-size="22" fill="#534f49" letter-spacing="2">uneizshaikh.dev</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL("../public/og.png", import.meta.url), png);
