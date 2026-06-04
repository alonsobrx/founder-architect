/* Inject shared nav + footer into every page */
(function() {
  const root = document.documentElement.getAttribute('data-root') || '';

  const navHTML = `
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="util-bar" role="banner">
    <a href="${root}index.html" class="util-brand" data-i18n="nav_brand" aria-label="Arnoldo Alonso — Brasidas Strategies home">ARNOLDO ALONSO</a>
    <button class="util-btn primary" onclick="toggleLang()" id="langBtn" aria-label="Toggle language" data-i18n="lang_btn">ES →</button>
    <button class="util-btn" onclick="toggleDark()" id="darkBtn" aria-label="Toggle dark mode">DARK</button>
    <button class="util-btn" onclick="decreaseFontSize()" aria-label="Decrease font size">A−</button>
    <button class="util-btn" onclick="increaseFontSize()" aria-label="Increase font size">A+</button>
    <button class="util-btn" onclick="readAloud()" aria-label="Read page aloud">▶ READ</button>
  </div>
  <nav class="main-nav" role="navigation" aria-label="Main navigation">
    <a href="${root}bio.html" data-i18n="nav_bio" data-page="bio">Bio</a>
    <a href="${root}resume.html" data-i18n="nav_resume" data-page="resume">Resume</a>
    <a href="${root}tools.html" data-i18n="nav_tools" data-page="tools">Tools</a>
    <a href="${root}store.html" data-i18n="nav_store" data-page="store">Store</a>
    <a href="${root}publications.html" data-i18n="nav_publications" data-page="publications">Publications</a>
    <a href="${root}blog.html" data-i18n="nav_blog" data-page="blog">Blog</a>
    <a href="${root}contact.html" data-i18n="nav_contact" data-page="contact">Contact</a>
  </nav>`;

  const footerHTML = `
  <footer class="site-footer" role="contentinfo">
    <div class="footer-in">
      <span data-i18n="footer_copy">© 2026 Arnoldo Alonso · Brasidas Strategies</span>
      <span data-i18n="footer_license">Open Source · Public Interest</span>
      <a href="https://t.me/alonsobrx" target="_blank" rel="noopener" data-i18n="footer_contact">Telegram @alonsobrx</a>
    </div>
  </footer>`;

  // Insert nav before body content
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Mark active nav link
  const page = document.body.getAttribute('data-page');
  if (page) {
    const link = document.querySelector(`.main-nav a[data-page="${page}"]`);
    if (link) link.classList.add('active');
  }
})();
