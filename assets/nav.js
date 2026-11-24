/* Inject shared nav + footer into every page */
(function() {
  const siteRoot = new URL('../', document.currentScript.src);

  const navHTML = `
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="util-bar" role="banner">
    <a href="index.html" class="util-brand" data-i18n="nav_brand" aria-label="Arnoldo Alonso — Brasidas Strategies home">ARNOLDO ALONSO</a>
    <button class="util-btn primary" onclick="toggleLang()" id="langBtn" aria-label="Toggle language" data-i18n="lang_btn">ES →</button>
    <button class="util-btn" onclick="toggleDark()" id="darkBtn" aria-label="Toggle dark mode">DARK</button>
    <button class="util-btn" onclick="decreaseFontSize()" aria-label="Decrease font size">A−</button>
    <button class="util-btn" onclick="increaseFontSize()" aria-label="Increase font size">A+</button>
    <button class="util-btn" onclick="readAloud()" aria-label="Read page aloud">▶ READ</button>
  </div>
  <nav class="main-nav" role="navigation" aria-label="Main navigation">
    <a href="bio.html" data-i18n="nav_bio" data-page="bio">Bio</a>
    <a href="resume.html" data-i18n="nav_resume" data-page="resume">Resume</a>
    <a href="tools.html" data-i18n="nav_tools" data-page="tools">Tools</a>
    <a href="store.html" data-i18n="nav_store" data-page="store">Store</a>
    <a href="publications.html" data-i18n="nav_publications" data-page="publications">Publications</a>
    <a href="blog.html" data-i18n="nav_blog" data-page="blog">Blog</a>
    <a href="contact.html" data-i18n="nav_contact" data-page="contact">Contact</a>
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
  const navTemplate = document.createElement('template');
  navTemplate.innerHTML = navHTML;
  navTemplate.content.querySelectorAll('a[href]:not([href^="#"])').forEach(link => {
    link.href = new URL(link.getAttribute('href'), siteRoot).href;
  });
  document.body.prepend(navTemplate.content);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Mark active nav link
  const page = document.body.getAttribute('data-page');
  if (page) {
    const activeLink = [...document.querySelectorAll('.main-nav a')]
      .find(link => link.dataset.page === page);
    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }
})();
