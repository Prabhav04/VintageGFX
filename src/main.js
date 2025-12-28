import './style.css'

const wallpapers = [
  {
    id: 1,
    title: "Chathan - Tovino",
    description: "The dialoge of Chathan from movie Lokah.",
    date: "2025.08.05",
    image: "./Frame 16.png"
  },
  {
    id: 2,
    title: "Mangalassery Neelakandan",
    description: "Mohanlal's Gang from movie Devasuram.",
    date: "2025.08.25",
    image: "./Frame 17.png"
  },
  {
    id: 3,
    title: "Bellary Raja",
    description: "Powerful character by Mammooty",
    date: "2025.08.08",
    image: "./Frame 18.png"
  },
  {
    id: 4,
    title: "Kuthiravattam Pappu",
    description: "Comedian from the movie Manichitrathaazh.",
    date: "2025.08.08",
    image: "./Frame 19.png"
  }
];

document.querySelector('#app').innerHTML = `
  <header id="top">
    <!-- Background Animation Container -->
    <div class="bg-beams" id="bg-beams"></div>
    <h1 class="masthead">Vintage GFX</h1>
    <div class="meta-bar">
      <span>EST. 1995</span>
      <span>// ${new Date().toLocaleDateString('en-GB')} //</span>
      <span>STATUS: ONLINE</span>
    </div>
  </header>

  <main>
    <article class="main-article">
      <h3>>> SYSTEM_MESSAGE: WELCOME</h3>
      <p class="lead-text" id="terminal-text">
      </p>
      <div style="text-align: center; margin-top: 2rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <button id="btn-scroll-down" class="retro-btn">
          SCROLL_DOWN
        </button>
        <button id="btn-request" class="retro-btn" style="border-color: var(--neon-yellow); color: var(--neon-yellow);">
          REQUEST_WALLPAPER
        </button>
      </div>
    </article>

    <section class="gallery-section" id="downloads">
      <h2>// DOWNLOAD_ZONE</h2>
      <div class="wallpaper-grid" id="gallery">
        <!-- Wallpapers injected here -->
      </div>
    </section>
  </main>

  <footer>
    <button id="btn-scroll-up" class="retro-btn" style="margin-bottom: 1rem;">
      ^ RETURN_TO_TOP ^
    </button>
    <p>POWERED BY VITE // COPYRIGHT 2025 // Vintage_GFX_</p>
  </footer>

  <!-- Modal Overlay -->
  <div id="wallpaper-modal" class="modal-overlay" style="display: none;">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modal-title" style="margin: 0; color: var(--neon-cyan);"></h3>
      </div>
      <div class="modal-body">
        <img id="modal-image" src="" alt="Wallpaper Preview" />
      </div>
      <div class="modal-footer">
        <a id="modal-download" href="#" download class="retro-btn" style="text-decoration: none;">
          DOWNLOAD
        </a>
        <button id="modal-close" class="retro-btn" style="border-color: var(--neon-pink); color: var(--neon-pink);">
          CLOSE
        </button>
      </div>
    </div>
  </div>

  <!-- Request Modal -->
  <div id="request-modal" class="modal-overlay" style="display: none;">
    <div class="modal-content" style="max-width: 500px;">
      <div class="modal-header">
        <h3 style="margin: 0; color: var(--neon-yellow);">>> TRANSMIT_REQUEST</h3>
      </div>
      <div class="modal-body" style="flex-direction: column; gap: 1rem;">
        <p style="text-align: center; font-size: 0.9rem; color: #aaa;">
          ENTER PARAMETERS FOR NEW VISUAL DATA.
        </p>
        <div class="form-group">
          <label>CHARACTER / SUBJECT:</label>
          <input type="text" id="req-subject" class="retro-input" placeholder="E.g. Spiderman" />
        </div>
        <div class="form-group">
          <label>SOURCE MATERIAL (MOVIE/GAME):</label>
          <input type="text" id="req-source" class="retro-input" placeholder="E.g. Spider-Man 2099" />
        </div>
        <div class="form-group">
          <label>ADDITIONAL DIRECTIVES:</label>
          <textarea id="req-desc" class="retro-input" rows="3" placeholder="Describe the vibe..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button id="btn-submit-request" class="retro-btn" style="border-color: var(--neon-yellow); color: var(--neon-yellow);">
          TRANSMIT
        </button>
        <button id="btn-close-request" class="retro-btn" style="border-color: var(--neon-pink); color: var(--neon-pink);">
          ABORT
        </button>
      </div>
    </div>
  </div>
`

const gallery = document.querySelector('#gallery');

// Modal Logic
const modal = document.getElementById('wallpaper-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDownload = document.getElementById('modal-download');
const modalClose = document.getElementById('modal-close');

function openModal(wp) {
  modalImg.src = wp.image;
  modalTitle.textContent = wp.title;
  modalDownload.href = wp.image;
  modalDownload.download = wp.title.replace(/\s+/g, '-').toLowerCase() + '.jpg';
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
  modalImg.src = '';
}

// Request Modal Logic
const reqModal = document.getElementById('request-modal');
const btnRequest = document.getElementById('btn-request');
const btnCloseRequest = document.getElementById('btn-close-request');
const btnSubmitRequest = document.getElementById('btn-submit-request');

btnRequest.addEventListener('click', () => {
  reqModal.style.display = 'flex';
});

btnCloseRequest.addEventListener('click', () => {
  reqModal.style.display = 'none';
});

reqModal.addEventListener('click', (e) => {
  if (e.target === reqModal) reqModal.style.display = 'none';
});

btnSubmitRequest.addEventListener('click', () => {
  const subject = document.getElementById('req-subject').value;
  const source = document.getElementById('req-source').value;
  const desc = document.getElementById('req-desc').value;

  const body = `Subject: ${subject}%0D%0ASource: ${source}%0D%0ADescription: ${desc}`;
  window.location.href = `mailto:your-email@example.com?subject=Wallpaper Request: ${subject}&body=${body}`;

  reqModal.style.display = 'none';
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

wallpapers.forEach(wp => {
  const card = document.createElement('div');
  card.className = 'wallpaper-card';
  // Add click listener to card
  card.addEventListener('click', (e) => {
    // Prevent double fire if clicking the internal download button
    if (!e.target.closest('.download-btn')) {
      openModal(wp);
    }
  });

  card.innerHTML = `
    <div class="image-container">
      <img src="${wp.image}" alt="${wp.title}" loading="lazy" />
    </div>
    <div class="caption">
      <span>FILE_ID: ${wp.id.toString().padStart(3, '0')}</span>
      <span>${wp.date}</span>
    </div>
    <h3 class="card-title">${wp.title}</h3>
    <p style="font-family: 'Space Mono', monospace; font-size: 0.85rem; margin-bottom: 1rem; color: #ccc;">${wp.description}</p>
    <a href="${wp.image}" download="${wp.title.replace(/\s+/g, '-').toLowerCase()}.jpg" class="download-btn" target="_blank">
      SAVE TO DISK
    </a>
  `;
  gallery.appendChild(card);
});

// Terminal Typing Effect
const terminalText = [
  "> INITIALIZING GFX INTERFACE...",
  "> LOADING TEXTURES... 100%",
  "",
  "Vintage GFX is live now. Download your favorite wallpapers and enjoy the nostalgia."
];

function typeWriter(textArray, elementId, speed = 40) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Initialize with cursor
  element.innerHTML = '<span class="cursor"></span>';
  const cursor = element.querySelector('.cursor');

  let lineIndex = 0;
  let charIndex = 0;

  function type() {
    if (lineIndex < textArray.length) {
      const currentLine = textArray[lineIndex];

      if (charIndex < currentLine.length) {
        const char = currentLine.charAt(charIndex);
        const textNode = document.createTextNode(char);
        element.insertBefore(textNode, cursor);
        charIndex++;
        setTimeout(type, speed);
      } else {
        // End of line
        element.insertBefore(document.createElement('br'), cursor);
        lineIndex++;
        charIndex = 0;
        // Pause longer at end of line
        setTimeout(type, speed * 8);
      }
    }
  }

  // Start typing after a small delay
  setTimeout(type, 1000);
}

// Start the effect
// Start the effect
typeWriter(terminalText, 'terminal-text');

// Scroll Logic
document.getElementById('btn-scroll-down').addEventListener('click', () => {
  document.getElementById('downloads').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btn-scroll-up').addEventListener('click', () => {
  document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
});

// Background Beams Logic
const beamsContainer = document.getElementById('bg-beams');
function createBeams(count = 15) {
  for (let i = 0; i < count; i++) {
    const beam = document.createElement('div');
    beam.className = 'beam';

    // Random properties
    const height = Math.random() * 30 + 10; // 10% to 40% height
    const left = Math.random() * 100; // 0% to 100% width
    const duration = Math.random() * 3 + 2; // 2s to 5s animation
    const delay = Math.random() * 5; // 0s to 5s delay

    beam.style.height = `${height}%`;
    beam.style.left = `${left}%`;
    beam.style.animationDuration = `${duration}s`;
    beam.style.animationDelay = `${delay}s`;

    // Random color variant (Cyan or Pink)
    if (Math.random() > 0.7) {
      beam.style.background = 'linear-gradient(to bottom, transparent, var(--neon-pink), transparent)';
    }

    beamsContainer.appendChild(beam);
  }
}

createBeams();
