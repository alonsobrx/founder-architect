/* Global language, theme, text-size, and read-aloud controls */

const LANG = {
  en: {
    nav_brand: 'Arnoldo Alonso',
    nav_home: 'Home',
    nav_bio: 'Bio',
    nav_resume: 'Background',
    nav_tools: 'Systems',
    nav_publications: 'Publications',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    footer_copy: '© 2026 Arnoldo Alonso',
    footer_standard: 'Accessible · Evidence driven · Public interest',
    lang_btn: 'ES'
  },
  es: {
    nav_brand: 'Arnoldo Alonso',
    nav_home: 'Inicio',
    nav_bio: 'Biografía',
    nav_resume: 'Trayectoria',
    nav_tools: 'Sistemas',
    nav_publications: 'Publicaciones',
    nav_blog: 'Blog',
    nav_contact: 'Contacto',
    footer_copy: '© 2026 Arnoldo Alonso',
    footer_standard: 'Accesible · Basado en evidencia · Interés público',
    lang_btn: 'EN'
  }
};

let currentLang = localStorage.getItem('lang') === 'es' ? 'es' : 'en';
let darkMode = localStorage.getItem('dark') === 'true';
let speechActive = false;

function applyLang(lang) {
  const selected = LANG[lang] ? lang : 'en';
  currentLang = selected;
  localStorage.setItem('lang', selected);
  document.documentElement.setAttribute('lang', selected);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (LANG[selected][key] !== undefined) element.textContent = LANG[selected][key];
  });

  const languageButton = document.getElementById('langBtn');
  if (languageButton) {
    languageButton.setAttribute('aria-pressed', String(selected === 'es'));
    languageButton.setAttribute('aria-label', selected === 'en' ? 'Cambiar a español' : 'Switch to English');
  }

  document.dispatchEvent(new CustomEvent('site:language-change', { detail: { lang: selected } }));
}

function toggleLang() {
  applyLang(currentLang === 'en' ? 'es' : 'en');
}

function applyDark(on) {
  darkMode = Boolean(on);
  localStorage.setItem('dark', String(darkMode));
  document.body.classList.toggle('dark', darkMode);

  const button = document.getElementById('darkBtn');
  if (button) {
    button.textContent = darkMode ? 'Light' : 'Dark';
    button.setAttribute('aria-pressed', String(darkMode));
    button.setAttribute('aria-label', darkMode ? 'Use light color theme' : 'Use dark color theme');
  }
}

function toggleDark() {
  applyDark(!darkMode);
}

function setFontSize(size) {
  const bounded = Math.min(Math.max(size, 14), 24);
  document.documentElement.style.fontSize = `${bounded}px`;
  localStorage.setItem('fontSize', String(bounded));
}

function increaseFontSize() {
  const current = parseFloat(getComputedStyle(document.documentElement).fontSize);
  setFontSize(current + 2);
}

function decreaseFontSize() {
  const current = parseFloat(getComputedStyle(document.documentElement).fontSize);
  setFontSize(current - 2);
}

function updateReadButton(active) {
  speechActive = active;
  const button = document.getElementById('readBtn');
  if (!button) return;
  button.textContent = active ? 'Stop' : 'Read';
  button.setAttribute('aria-pressed', String(active));
  button.setAttribute('aria-label', active ? 'Stop reading aloud' : 'Read main content aloud');
}

function readAloud() {
  if (!('speechSynthesis' in window)) {
    const button = document.getElementById('readBtn');
    if (button) {
      button.disabled = true;
      button.setAttribute('aria-label', 'Read aloud is not supported by this browser');
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
  utterance.lang = currentLang === 'es' ? 'es-US' : 'en-US';
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

document.addEventListener('DOMContentLoaded', () => {
  const storedFontSize = Number(localStorage.getItem('fontSize'));
  if (Number.isFinite(storedFontSize) && storedFontSize >= 14 && storedFontSize <= 24) {
    setFontSize(storedFontSize);
  }

  applyLang(currentLang);
  applyDark(darkMode);

  document.getElementById('langBtn')?.addEventListener('click', toggleLang);
  document.getElementById('darkBtn')?.addEventListener('click', toggleDark);
  document.getElementById('fontDownBtn')?.addEventListener('click', decreaseFontSize);
  document.getElementById('fontUpBtn')?.addEventListener('click', increaseFontSize);
  document.getElementById('readBtn')?.addEventListener('click', readAloud);

  const reportLanguageButton = document.getElementById('lang-toggle');
  if (reportLanguageButton) {
    reportLanguageButton.disabled = true;
    reportLanguageButton.textContent = 'EN';
    reportLanguageButton.setAttribute('aria-label', 'This report is currently available in English');
  }

  const archivedReport = document.querySelector('.main-content .doc-section');
  const reportMain = document.querySelector('.main-content');
  if (archivedReport && reportMain && !document.querySelector('.archive-notice')) {
    const notice = document.createElement('aside');
    notice.className = 'archive-notice';
    notice.setAttribute('role', 'note');
    notice.innerHTML = '<strong>Archive notice, August 10, 2026:</strong> This pre-vote brief predates Cameron County approval on June 16 and Saronic\'s July site-selection announcement. Some financial figures conflict with later public reporting and require review against the executed agreements. Read the <a href="../blog/saronic-vote-june16.html">current outcome update</a> before relying on this draft.';
    reportMain.insertBefore(notice, archivedReport);
  }

  document.getElementById('contrast-btn')?.addEventListener('click', toggleDark);
  document.getElementById('font-down')?.addEventListener('click', decreaseFontSize);
  document.getElementById('font-up')?.addEventListener('click', increaseFontSize);
  document.getElementById('read-btn')?.addEventListener('click', readAloud);

  window.addEventListener('scroll', updateReadingProgress, { passive: true });
  updateReadingProgress();
});

window.addEventListener('beforeunload', () => {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
});
