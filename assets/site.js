/* Theme, text-size, read-aloud, reading progress, and archive controls. */

const pageLanguage = document.documentElement.lang.toLowerCase().startsWith('es') ? 'es' : 'en';
let lightMode = localStorage.getItem('theme') === 'light';
let speechActive = false;

const UI_TEXT = pageLanguage === 'es'
  ? {
      dark: 'Oscuro',
      light: 'Claro',
      useDark: 'Usar tema oscuro',
      useLight: 'Usar tema claro',
      read: 'Leer',
      stop: 'Detener',
      readLabel: 'Leer el contenido principal en voz alta',
      stopLabel: 'Detener la lectura en voz alta',
      unsupported: 'La lectura en voz alta no está disponible en este navegador'
    }
  : {
      dark: 'Dark',
      light: 'Light',
      useDark: 'Use dark color theme',
      useLight: 'Use light color theme',
      read: 'Read',
      stop: 'Stop',
      readLabel: 'Read main content aloud',
      stopLabel: 'Stop reading aloud',
      unsupported: 'Read aloud is not supported by this browser'
    };

function applyTheme(useLight) {
  lightMode = Boolean(useLight);
  localStorage.setItem('theme', lightMode ? 'light' : 'dark');
  document.body.classList.toggle('light', lightMode);

  const button = document.getElementById('themeBtn');
  if (button) {
    button.textContent = lightMode ? UI_TEXT.dark : UI_TEXT.light;
    button.setAttribute('aria-pressed', String(lightMode));
    button.setAttribute('aria-label', lightMode ? UI_TEXT.useDark : UI_TEXT.useLight);
  }
}

function setFontSize(size) {
  const bounded = Math.min(Math.max(size, 14), 24);
  document.documentElement.style.fontSize = `${bounded}px`;
  localStorage.setItem('fontSize', String(bounded));
}

function updateReadButton(active) {
  speechActive = active;
  const button = document.getElementById('readBtn');
  if (!button) return;
  button.textContent = active ? UI_TEXT.stop : UI_TEXT.read;
  button.setAttribute('aria-pressed', String(active));
  button.setAttribute('aria-label', active ? UI_TEXT.stopLabel : UI_TEXT.readLabel);
}

function readAloud() {
  if (!('speechSynthesis' in window)) {
    const button = document.getElementById('readBtn');
    if (button) {
      button.disabled = true;
      button.setAttribute('aria-label', UI_TEXT.unsupported);
    }
    return;
  }

  if (speechSynthesis.speaking || speechActive) {
    speechSynthesis.cancel();
    updateReadButton(false);
    return;
  }

  const main = document.querySelector('main');
  if (!main) return;

  const utterance = new SpeechSynthesisUtterance(main.innerText);
  utterance.lang = pageLanguage === 'es' ? 'es-US' : 'en-US';
  utterance.onend = () => updateReadButton(false);
  utterance.onerror = () => updateReadButton(false);
  updateReadButton(true);
  speechSynthesis.speak(utterance);
}

function updateReadingProgress() {
  const progress = document.getElementById('progress-bar');
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  const percent = Math.min(Math.max(ratio * 100, 0), 100);
  progress.style.width = `${percent}%`;
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', '100');
  progress.setAttribute('aria-valuenow', String(Math.round(percent)));
}

function addArchiveNotice() {
  const archivedReport = document.querySelector('.main-content .doc-section');
  const reportMain = document.querySelector('.main-content');
  if (!archivedReport || !reportMain || document.querySelector('.archive-notice')) return;

  const notice = document.createElement('aside');
  notice.className = 'archive-notice';
  notice.setAttribute('role', 'note');
  notice.innerHTML = '<strong>Archive notice, August 10, 2026:</strong> This pre-vote brief predates Cameron County approval on June 16 and Saronic\'s July site-selection announcement. Some financial figures conflict with later public reporting and require review against the executed agreements. Read the <a href="../blog/saronic-vote-june16.html">current outcome update</a> before relying on this draft.';
  reportMain.insertBefore(notice, archivedReport);
}

document.addEventListener('DOMContentLoaded', () => {
  const storedFontSize = Number(localStorage.getItem('fontSize'));
  if (Number.isFinite(storedFontSize) && storedFontSize >= 14 && storedFontSize <= 24) {
    setFontSize(storedFontSize);
  }

  applyTheme(lightMode);
  document.getElementById('themeBtn')?.addEventListener('click', () => applyTheme(!lightMode));
  document.getElementById('fontDownBtn')?.addEventListener('click', () => {
    setFontSize(parseFloat(getComputedStyle(document.documentElement).fontSize) - 2);
  });
  document.getElementById('fontUpBtn')?.addEventListener('click', () => {
    setFontSize(parseFloat(getComputedStyle(document.documentElement).fontSize) + 2);
  });
  document.getElementById('readBtn')?.addEventListener('click', readAloud);

  const reportLanguageButton = document.getElementById('lang-toggle');
  if (reportLanguageButton) {
    reportLanguageButton.disabled = true;
    reportLanguageButton.textContent = 'EN';
    reportLanguageButton.setAttribute('aria-label', 'This archived report is currently available in English');
  }
  document.getElementById('contrast-btn')?.addEventListener('click', () => applyTheme(!lightMode));
  document.getElementById('font-down')?.addEventListener('click', () => {
    setFontSize(parseFloat(getComputedStyle(document.documentElement).fontSize) - 2);
  });
  document.getElementById('font-up')?.addEventListener('click', () => {
    setFontSize(parseFloat(getComputedStyle(document.documentElement).fontSize) + 2);
  });
  document.getElementById('read-btn')?.addEventListener('click', readAloud);

  window.addEventListener('scroll', updateReadingProgress, { passive: true });
  updateReadingProgress();
  addArchiveNotice();
});

window.addEventListener('beforeunload', () => {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
});
