const fs = require('node:fs/promises');
const { chromium } = require('playwright');
const axe = require.resolve('axe-core/axe.min.js');
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function audit() {
  const files = (await fs.readdir('.', { recursive: true }))
    .filter(file => !file.startsWith('.') && !file.startsWith('node_modules/') && file.endsWith('.html'))
    .sort();
  if (!files.length) throw new Error('No portfolio HTML pages found.');
  const origin = 'http://127.0.0.1:4173';
  const browser = await chromium.launch();
  const results = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript({ path: axe });
    for (const file of files) {
      const response = await page.goto(new URL('/' + file, origin).href, { waitUntil: 'domcontentloaded' });
      if (!response?.ok()) throw new Error(`Could not load HTML: ${file}`);
      if (file === 'index.html') await page.waitForURL(url => url.pathname === '/bio.html');
      await page.waitForFunction(() => Boolean(window.axe));
      const skipLink = page.locator('a.skip-link').first();
      if (await skipLink.count()) {
        const destination = await skipLink.getAttribute('href');
        await page.keyboard.press('Tab');
        if (await skipLink.evaluate(link => document.activeElement !== link)) {
          throw new Error(`Skip link is not the first keyboard stop: ${file}`);
        }
        await page.keyboard.press('Enter');
        await page.waitForURL(url => url.hash === destination);
        if (!await page.locator(`main${destination}`).count()) {
          throw new Error(`Skip link does not target the main landmark: ${file}`);
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      }
      const result = await page.evaluate(tags => window.axe.run({
        runOnly: { type: 'tag', values: tags },
      }), tags);
      const violations = result.violations.map(({ id, impact, nodes }) => ({
        id, impact, targets: nodes.map(node => node.target),
      }));
      results.push({ file, violations, needsReview: result.incomplete.map(({ id }) => id) });
      console.log(`${file}: ${violations.length} violation groups`);
      for (const { id, impact, targets } of violations) {
        console.log(`  ${impact} ${id}: ${targets.map(target => target.join(' ')).join(', ')}`);
      }
    }
  } finally {
    await browser.close();
  }
  await fs.writeFile('portfolio-axe.json', JSON.stringify(results, null, 2) + '\n');
  if (results.some(page => page.violations.some(x => ['critical', 'serious'].includes(x.impact)))) {
    process.exitCode = 1;
  }
}

audit().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
