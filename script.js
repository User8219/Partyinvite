let questionsData = [];
let partyInfoData = {};
let currentIndex = 0;
let isAnimating = false;

// DOM Elements
const questionBanner = document.getElementById('question-banner');
const envelope = document.getElementById('envelope');
const paperText = document.getElementById('paper-text');
const confettiContainer = document.getElementById('confetti-container');

// Easter Egg Hotspot Elements
const imgBtnRight = document.getElementById('img-btn-right');
const imgBtnLeft = document.getElementById('img-btn-left');
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');

// Load JSON Data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    questionsData = data.questions;
    partyInfoData = data.partyInfo;
    questionBanner.textContent = 'Tap the envelope to open!';
  })
  .catch(error => console.error('Error loading JSON:', error));

// Confetti Particle Function
function triggerConfetti() {
  const CONFETTI_COUNT = 150;
  const COLORS = ['#d4af37', '#ffffff', '#ff4757', '#1e3c72', '#2ecc71', '#f1c40f'];

  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti';
    
    particle.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.width = Math.random() * 8 + 6 + 'px';
    particle.style.height = particle.style.width;
    
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;

    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';

    confettiContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }
}

// Envelope Tap Interaction
function handleEnvelopeTap() {
  if (isAnimating) return;
  isAnimating = true;

  if (questionBanner) {
    questionBanner.style.opacity = '0';
    setTimeout(() => {
      questionBanner.style.display = 'none';
    }, 400);
  }

  if (currentIndex < questionsData.length) {
    const currentQ = questionsData[currentIndex];
    const waitTime = (currentQ.readDelaySeconds || 2) * 1000;

    paperText.innerHTML = `<p class="paper-text"><strong>${currentQ.question}</strong></p>`;

    setTimeout(() => {
      paperText.innerHTML = `<p class="paper-text">${currentQ.answer}</p>`;
      envelope.classList.add('open');

      setTimeout(() => {
        envelope.classList.remove('open');
        
        setTimeout(() => {
          currentIndex++;
          isAnimating = false;
        }, 800);

      }, 3500);

    }, waitTime);

  } else if (currentIndex === questionsData.length) {
    paperText.innerHTML = `
      <div class="party-info">
        <h2>${partyInfoData.title}</h2>
        <p class="bday-name">${partyInfoData.name}</p>
        <p><strong>Date:</strong> ${partyInfoData.date}</p>
        <p><strong>Time:</strong> ${partyInfoData.time}</p>
        <p><strong>Location:</strong> ${partyInfoData.location}</p>
        <p><em>${partyInfoData.rsvp}</em></p>
      </div>
    `;

    envelope.classList.add('open');
    triggerConfetti();
  }
}

envelope.addEventListener('click', handleEnvelopeTap);

// Top Right Easter Egg Hotspot (test.img)
imgBtnRight.addEventListener('click', () => {
  modalImg.src = 'test.jpg';
  modalImg.alt = 'test.jpg';
  imageModal.classList.add('active');
});

// Top Left Easter Egg Hotspot (test2.img)
imgBtnLeft.addEventListener('click', () => {
  modalImg.src = 'test2.jpg';
  modalImg.alt = 'test2.jpg';
  imageModal.classList.add('active');
});

// Modal Close Handlers
closeModal.addEventListener('click', () => {
  imageModal.classList.remove('active');
});

imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) {
    imageModal.classList.remove('active');
  }
});
