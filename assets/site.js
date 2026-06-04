/* ══════════════════════════════════════════
   ARNOLDO ALONSO — Global JS
   Language toggle + dark mode + accessibility
══════════════════════════════════════════ */

const LANG = {
  en: {
    nav_bio: 'Bio',
    nav_resume: 'Resume',
    nav_tools: 'Tools',
    nav_store: 'Store',
    nav_publications: 'Publications',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    footer_copy: '© 2026 Arnoldo Alonso · Brasidas Strategies',
    footer_license: 'Open Source · Public Interest',
    footer_contact: 'Telegram @alonsobrx',
    lang_btn: 'ES →',
  },
  es: {
    nav_bio: 'Bio',
    nav_resume: 'Currículum',
    nav_tools: 'Herramientas',
    nav_store: 'Tienda',
    nav_publications: 'Publicaciones',
    nav_blog: 'Blog',
    nav_contact: 'Contacto',
    footer_copy: '© 2026 Arnoldo Alonso · Brasidas Strategies',
    footer_license: 'Código Abierto · Interés Público',
    footer_contact: 'Telegram @alonsobrx',
    lang_btn: 'EN →',
  }
};

let currentLang = localStorage.getItem('lang') || 'en';
let darkMode = localStorage.getItem('dark') === 'true';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (LANG[lang][key] !== undefined) el.innerHTML = LANG[lang][key];
  });
}

function toggleLang() {
  applyLang(currentLang === 'en' ? 'es' : 'en');
}

function applyDark(on) {
  darkMode = on;
  localStorage.setItem('dark', on);
  document.body.classList.toggle('dark', on);
  const btn = document.getElementById('darkBtn');
  if (btn) btn.textContent = on ? 'LIGHT' : 'DARK';
}

function toggleDark() { applyDark(!darkMode); }

function increaseFontSize() {
  const cur = parseFloat(getComputedStyle(document.documentElement).fontSize);
  document.documentElement.style.fontSize = Math.min(cur + 2, 24) + 'px';
}
function decreaseFontSize() {
  const cur = parseFloat(getComputedStyle(document.documentElement).fontSize);
  document.documentElement.style.fontSize = Math.max(cur - 2, 12) + 'px';
}

function readAloud() {
  if (!window.speechSynthesis) return;
  if (speechSynthesis.speaking) { speechSynthesis.cancel(); return; }
  const main = document.querySelector('main') || document.body;
  const utt = new SpeechSynthesisUtterance(main.innerText);
  utt.lang = currentLang === 'es' ? 'es-US' : 'en-US';
  speechSynthesis.speak(utt);
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
  applyDark(darkMode);
  // Mark active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace('../','').replace('.html',''))) {
      a.classList.add('active');
    }
  });
});
