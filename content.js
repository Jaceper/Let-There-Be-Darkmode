// Helper: calculate brightness of rgb color string
function getBrightness(rgb) {
  const match = rgb.match(/\d+/g);
  if (!match) return 0;
  const r = parseInt(match[0], 10);
  const g = parseInt(match[1], 10);
  const b = parseInt(match[2], 10);
  // luminance formula
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Adjust text color based on background brightness
function adjustTextColors() {
  const elems = document.querySelectorAll('body, body *');

  elems.forEach(el => {
    if (!el.offsetParent) return; // skip hidden elements

    const style = getComputedStyle(el);
    const bg = style.backgroundColor;

    if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return;

    const brightness = getBrightness(bg);

    if (brightness < 128) {
      // dark background → light text
      el.style.color = '#eee';
    } else {
      // light background → dark text
      el.style.color = '#111';
    }
  });
}

chrome.storage.sync.get(['darkModeEnabled'], (data) => {
  if (data.darkModeEnabled !== false) {
    // Inject base dark mode styles
    const style = document.createElement('style');
    style.textContent = `
      html, body, div, section, article, header, footer, main {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
      }
      a, a:visited {
        color: #82aaff !important;
      }
      /* Other base dark mode rules here as needed */
    `;
    document.head.appendChild(style);

    // Wait for DOM ready, then adjust text colors
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        window.requestAnimationFrame(adjustTextColors);
      });
    } else {
      window.requestAnimationFrame(adjustTextColors);
    }

    console.log(' Dark mode + dynamic text color injected');
  } else {
    console.log('Dark mode disabled by user');
  }
});
