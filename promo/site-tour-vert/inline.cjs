// Copies spot.json's scenes and narration lines into compose.html (a file:// page
// cannot fetch spot.json). Run after editing spot.json: node promo/site-tour-vert/inline.cjs
const fs = require('fs');
const dir = __dirname;
const s = JSON.parse(fs.readFileSync(`${dir}/spot.json`, 'utf8'));
const inline = {
  scenes: s.scenes,
  narration: { lines: s.narration.lines.map(({ at, dur, text, cap }) => ({ at, dur, text, cap })) },
};
let c = fs.readFileSync(`${dir}/compose.html`, 'utf8');
c = c.replace(/const SPOT = .*;\n/, `const SPOT = ${JSON.stringify(inline)};\n`);
fs.writeFileSync(`${dir}/compose.html`, c);
console.log('inlined', s.scenes.length, 'scenes');
