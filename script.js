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

// === SISTEMA DE MENSAGENS AOS NOIVOS ===
const messageForm = document.getElementById('message-form');
const guestNameInput = document.getElementById('guest-name');
const guestMessageInput = document.getElementById('guest-message');
const messagesContainer = document.getElementById('messages-container');

// Função para formatar data
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}

// Função para carregar mensagens do localStorage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('weddingMessages')) || [];
  return messages;
}

// Função para salvar mensagens no localStorage
function saveMessage(name, message) {
  const messages = loadMessages();
  messages.push({
    name: name,
    message: message,
    date: new Date().toISOString()
  });
  localStorage.setItem('weddingMessages', JSON.stringify(messages));
}

// Função para renderizar mensagens
function renderMessages() {
  const messages = loadMessages();
  messagesContainer.innerHTML = '';
  
  if (messages.length === 0) {
    messagesContainer.innerHTML = '<div class="no-messages">Nenhuma mensagem ainda. Seja o primeiro a deixar uma!</div>';
    return;
  }
  
  // Mostrar mensagens em ordem reversa (mais recentes primeiro)
  messages.reverse().forEach(msg => {
    const messageCard = document.createElement('div');
    messageCard.className = 'message-card';
    messageCard.innerHTML = `
      <div class="guest-name">${escapeHtml(msg.name)}</div>
      <div class="guest-message">${escapeHtml(msg.message).replace(/\n/g, '<br>')}</div>
      <div class="message-date">${formatDate(msg.date)}</div>
    `;
    messagesContainer.appendChild(messageCard);
  });
}

// Função para escapar HTML e evitar injeção
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Event listener do formulário
if (messageForm) {
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = guestNameInput.value.trim();
    const message = guestMessageInput.value.trim();
    
    if (name && message) {
      saveMessage(name, message);
      guestNameInput.value = '';
      guestMessageInput.value = '';
      renderMessages();
      
      // Feedback visual
      const btn = messageForm.querySelector('.submit-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Mensagem enviada!';
      btn.style.background = '#7cb342';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2000);
    }
  
  });

}

// Carregar mensagens ao inicializar a página
renderMessages();
