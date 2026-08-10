/* Shared navigation and footer */
(function () {
  const root = document.documentElement.getAttribute('data-root') || '';
  const languageControl = document.body.getAttribute('data-bilingual') === 'true'
    ? '<button type="button" class="util-btn primary" id="langBtn" aria-label="Cambiar a español" aria-pressed="false" data-i18n="lang_btn">ES</button>'
    : '';

  const navHTML = `
    <a href="#main" class="skip-link">Skip to main content</a>
    <div class="util-bar" aria-label="Display and language controls">
      <a href="${root}index.html" class="util-brand" data-i18n="nav_brand" aria-label="Arnoldo Alonso home">Arnoldo Alonso</a>
      ${languageControl}
      <button type="button" class="util-btn" id="darkBtn" aria-label="Use dark color theme" aria-pressed="false">Dark</button>
      <button type="button" class="util-btn" id="fontDownBtn" aria-label="Decrease text size">A−</button>
      <button type="button" class="util-btn" id="fontUpBtn" aria-label="Increase text size">A+</button>
      <button type="button" class="util-btn" id="readBtn" aria-label="Read main content aloud" aria-pressed="false">Read</button>
    </div>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="${root}index.html" data-i18n="nav_home" data-page="bio">Home</a>
      <a href="${root}bio.html" data-i18n="nav_bio">Bio</a>
      <a href="${root}resume.html" data-i18n="nav_resume" data-page="resume">Background</a>
      <a href="${root}tools.html" data-i18n="nav_tools" data-page="tools">Systems</a>
      <a href="${root}publications.html" data-i18n="nav_publications" data-page="publications">Publications</a>
      <a href="${root}blog.html" data-i18n="nav_blog" data-page="blog">Blog</a>
      <a href="${root}contact.html" data-i18n="nav_contact" data-page="contact">Contact</a>
    </nav>`;

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-in">
        <span data-i18n="footer_copy">© 2026 Arnoldo Alonso</span>
        <span data-i18n="footer_standard">Accessible · Evidence driven · Public interest</span>
        <nav class="footer-links" aria-label="Professional links">
          <a href="https://github.com/alonsobrx" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/alonsobrx" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://t.me/alonsobrx" target="_blank" rel="noopener">Telegram</a>
        </nav>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  const page = document.body.getAttribute('data-page');
  if (page) {
    const activeLink = document.querySelector(`.main-nav a[data-page="${page}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }
})();
