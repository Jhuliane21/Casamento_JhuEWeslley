// ...carrossel e contagem regressiva (movido do index.html)...
const carouselImages = document.querySelectorAll('.carousel-image');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const overlay = document.querySelector('.overlay-slide');
const overlayText = overlay ? overlay.querySelector('span') : null;
let currentIndex = 0;
let autoplayInterval = null;

function createIndicators() {
  if (!indicatorsContainer) return;
  indicatorsContainer.innerHTML = '';
  carouselImages.forEach((_, i) => {
    const span = document.createElement('span');
    span.className = 'indicator' + (i === 0 ? ' active' : '');
    span.dataset.index = i;
    span.addEventListener('click', () => { goTo(i); });
    indicatorsContainer.appendChild(span);
  });
}

function updateIndicators() {
  if (!indicatorsContainer) return;
  const inds = indicatorsContainer.querySelectorAll('.indicator');
  inds.forEach((ind, i) => ind.classList.toggle('active', i === currentIndex));
}

function extractCaptionFromSrc(src, idx) {
  if (idx === 0) return '7 anos de história';
  const m = src && src.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : '';
}

function showImage(idx) {
  const imgToShow = carouselImages[idx];
  const src = imgToShow ? imgToShow.getAttribute('src') : '';

  if (src && overlay) {
    overlay.style.backgroundImage = `url('${src}')`;
    if (overlayText) overlayText.textContent = extractCaptionFromSrc(src, idx);
    overlay.style.display = 'flex';
  } else if (overlay) {
    overlay.style.display = 'none';
  }

  updateIndicators();
}

function goTo(idx) {
  currentIndex = (idx + carouselImages.length) % carouselImages.length;
  showImage(currentIndex);
  restartAutoplay();
}

function prev() { goTo(currentIndex - 1); }
function next() { goTo(currentIndex + 1); }

function startAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval);
  autoplayInterval = setInterval(() => { next(); }, 5000);
}
function restartAutoplay() { startAutoplay(); }

if (prevBtn) prevBtn.addEventListener('click', prev);
if (nextBtn) nextBtn.addEventListener('click', next);

// inicialização do carrossel
createIndicators();
showImage(currentIndex);
startAutoplay();

// === contagem regressiva ===
const targetDate = new Date(2026, 8, 12, 16, 0, 0).getTime(); // mês 8 = setembro
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function pad(num) { return String(num).padStart(2, '0'); }

function updateCountdown() {
  const now = Date.now();
  const diff = targetDate - now;

  if (diff <= 0) {
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minutesEl) minutesEl.textContent = '00';
    if (secondsEl) secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (daysEl) daysEl.textContent = pad(days);
  if (hoursEl) hoursEl.textContent = pad(hours);
  if (minutesEl) minutesEl.textContent = pad(minutes);
  if (secondsEl) secondsEl.textContent = pad(seconds);
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
