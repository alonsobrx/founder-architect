/* Shared navigation and footer for English and Spanish static pages. */
(function () {
  const root = document.documentElement.getAttribute('data-root') || '';
  const currentLanguage = document.documentElement.lang.toLowerCase().startsWith('es') ? 'es' : 'en';
  const page = document.body.getAttribute('data-page') || 'home';
  const languageSwitch = document.documentElement.getAttribute('data-language-switch') || '';
  const socials = window.SITE_CONFIG?.socials || [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alonsobrx' }
  ];

  const text = currentLanguage === 'es'
    ? {
        skip: 'Saltar al contenido principal',
        home: 'Inicio',
        bio: 'Biografía',
        background: 'Trayectoria',
        systems: 'Sistemas',
        publications: 'Publicaciones',
        updates: 'Actualizaciones',
        connect: 'Conectar',
        language: 'EN',
        languageLabel: 'View this page in English',
        theme: 'Tema',
        themeLabel: 'Cambiar tema de color',
        smaller: 'A−',
        smallerLabel: 'Disminuir el tamaño del texto',
        larger: 'A+',
        largerLabel: 'Aumentar el tamaño del texto',
        read: 'Leer',
        readLabel: 'Leer el contenido principal en voz alta',
        footer: 'Accesible · Basado en evidencia · Interés público',
        links: 'Enlaces profesionales'
      }
    : {
        skip: 'Skip to main content',
        home: 'Home',
        bio: 'Bio',
        background: 'Background',
        systems: 'Systems',
        publications: 'Publications',
        updates: 'Updates',
        connect: 'Connect',
        language: 'ES',
        languageLabel: 'Ver esta página en español',
        theme: 'Theme',
        themeLabel: 'Change color theme',
        smaller: 'A−',
        smallerLabel: 'Decrease text size',
        larger: 'A+',
        largerLabel: 'Increase text size',
        read: 'Read',
        readLabel: 'Read main content aloud',
        footer: 'Accessible · Evidence driven · Public interest',
        links: 'Professional links'
      };

  const languageBase = currentLanguage === 'es' ? `${root}es/` : root;
  const navItems = [
    { id: 'home', label: text.home, href: `${languageBase}index.html` },
    { id: 'bio', label: text.bio, href: `${languageBase}bio.html` },
    { id: 'resume', label: text.background, href: `${languageBase}resume.html` },
    { id: 'tools', label: text.systems, href: `${languageBase}tools.html` },
    { id: 'publications', label: text.publications, href: `${languageBase}publications.html` },
    { id: 'blog', label: text.updates, href: `${languageBase}blog.html` },
    { id: 'connect', label: text.connect, href: `${languageBase}connect.html` }
  ];

  const navLinks = navItems.map((item) => {
    const active = item.id === page;
    return `<a href="${item.href}" data-page="${item.id}"${active ? ' class="active" aria-current="page"' : ''}>${item.label}</a>`;
  }).join('');

  const languageLink = languageSwitch
    ? `<a class="util-btn primary" href="${languageSwitch}" hreflang="${currentLanguage === 'es' ? 'en' : 'es'}" lang="${currentLanguage === 'es' ? 'en' : 'es'}" aria-label="${text.languageLabel}">${text.language}</a>`
    : '';

  const socialLinks = socials.map((social) => (
    `<a href="${social.url}" target="_blank" rel="noopener">${social.label}</a>`
  )).join('');

  const navHTML = `
    <a href="#main" class="skip-link">${text.skip}</a>
    <div class="util-bar" aria-label="${currentLanguage === 'es' ? 'Controles de lectura y visualización' : 'Reading and display controls'}">
      <a href="${languageBase}index.html" class="util-brand" aria-label="${currentLanguage === 'es' ? 'Página principal de Arnoldo Alonso' : 'Arnoldo Alonso home'}">Arnoldo Alonso</a>
      ${languageLink}
      <button type="button" class="util-btn" id="themeBtn" aria-label="${text.themeLabel}" aria-pressed="false">${text.theme}</button>
      <button type="button" class="util-btn" id="fontDownBtn" aria-label="${text.smallerLabel}">${text.smaller}</button>
      <button type="button" class="util-btn" id="fontUpBtn" aria-label="${text.largerLabel}">${text.larger}</button>
      <button type="button" class="util-btn" id="readBtn" aria-label="${text.readLabel}" aria-pressed="false">${text.read}</button>
    </div>
    <nav class="main-nav" aria-label="${currentLanguage === 'es' ? 'Navegación principal' : 'Main navigation'}">${navLinks}</nav>`;

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-in">
        <span>© 2026 Arnoldo Alonso</span>
        <span>${text.footer}</span>
        <nav class="footer-links" aria-label="${text.links}">${socialLinks}</nav>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
