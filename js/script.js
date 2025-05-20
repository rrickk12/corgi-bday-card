// ─── CONFETTI LIB (loaded before this script) ─────────────────
if (typeof confetti !== 'function') {
  console.warn('confetti() not found – make sure you loaded confetti.browser.min.js first');
}

// ─── SETUP THE CANVAS ─────────────────────────────────────────
const canvas = document.getElementById('corgi-rain');
const ctx    = canvas.getContext('2d');
resize();
window.addEventListener('resize', resize);

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

// ─── LOAD THE CORGI HEAD IMAGE ───────────────────────────────
const headImg = new Image();
headImg.src   = 'https://media.giphy.com/media/3oEduQAsYcJKQH2XsI/giphy.gif';
headImg.onload = initRain;

// ─── RAIN SETTINGS ────────────────────────────────────────────
const SPRITE_SIZE = 32;             // pixels per head
let columns;                        // number of columns
let drops;                          // y‐positions array

function initRain() {
  columns = Math.floor(canvas.width / SPRITE_SIZE);
  drops   = Array(columns).fill(0);
  // initial confetti
  confetti({ particleCount: 300, spread: 120 });
  // start loop
  requestAnimationFrame(rainLoop);
}

// ─── RAIN ANIMATION ───────────────────────────────────────────
function rainLoop() {
  // semi‐transparent black background for trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw one head per column
  for (let i = 0; i < columns; i++) {
    const x = i * SPRITE_SIZE;
    const y = drops[i] * SPRITE_SIZE;
    ctx.drawImage(headImg, x, y, SPRITE_SIZE, SPRITE_SIZE);

    // move drop down, reset randomly
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(rainLoop);
}

// ─── FLOATING CORGI HEADS IN DOM ──────────────────────────────
const floatContainer = document.getElementById('floating-corgis');
setInterval(() => {
  const img = document.createElement('img');
  img.src = 'https://media.giphy.com/media/3oEduQAsYcJKQH2XsI/giphy.gif';
  Object.assign(img.style, {
    position: 'absolute',
    width:    '50px',
    left:     `${Math.random()*100}%`,
    top:      `${Math.random()*100}%`,
    opacity:  0.8,
  });
  floatContainer.appendChild(img);
  setTimeout(() => floatContainer.removeChild(img), 5000);
}, 700);

// ─── CONFETTI ON CLICK ────────────────────────────────────────
document.body.addEventListener('click', () => {
  confetti({ particleCount: 100, origin: { x: Math.random(), y: Math.random() } });
});
