/**
 * Runtime verification — loads every route in a real headless browser,
 * captures console errors / failed requests / page errors, and drives the
 * interactive tools to confirm they actually work.
 */
import puppeteer from 'puppeteer';

const BASE = 'http://localhost:5173';
const ROUTES = ['/', '/about', '/services', '/plans', '/careers', '/consultation', '/contact', '/this-route-does-not-exist'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function attach(page, label, sink) {
  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      sink.push({ route: label, kind: `console.${type}`, text: msg.text().slice(0, 240) });
    }
  });
  page.on('pageerror', (err) => sink.push({ route: label, kind: 'pageerror', text: String(err).slice(0, 240) }));
  page.on('requestfailed', (req) => {
    const url = req.url();
    if (url.startsWith(BASE)) sink.push({ route: label, kind: 'requestfailed', text: `${url} — ${req.failure()?.errorText}` });
  });
}

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const issues = [];
const results = [];

/* ---------------------------------------------------------------
   1. Every route loads cleanly
   ------------------------------------------------------------- */
for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, route, issues);
  await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 45000 });
  await sleep(700);

  const info = await page.evaluate(() => {
    const body = document.body;
    return {
      title: document.title,
      h1: document.querySelector('h1')?.innerText?.trim().slice(0, 60) || '(none)',
      metaDesc: Boolean(document.querySelector('meta[name="description"]')),
      canonical: document.querySelector('link[rel="canonical"]')?.href || '(none)',
      og: Boolean(document.querySelector('meta[property="og:title"]')),
      twitter: Boolean(document.querySelector('meta[name="twitter:card"]')),
      robots: document.querySelector('meta[name="robots"]')?.content || '(none)',
      bodyText: body.innerText.length,
      sections: document.querySelectorAll('section').length,
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
      images: document.querySelectorAll('img').length,
      brokenImgs: [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length,
      deadButtons: [...document.querySelectorAll('button, a')].filter(
        (el) => el.tagName === 'A' && el.getAttribute('href') === '#'
      ).length,
    };
  });

  results.push({ route, ...info });
  await page.close();
}

console.log('\n================ ROUTE AUDIT ================');
for (const r of results) {
  const overflow = r.docWidth > r.winWidth + 1 ? ' ⚠ H-OVERFLOW' : '';
  console.log(
    `${r.route.padEnd(26)} h1="${r.h1}" sections=${r.sections} imgs=${r.images} broken=${r.brokenImgs} deadHrefs=${r.deadButtons} text=${r.bodyText}${overflow}`
  );
  console.log(`   title: ${r.title}`);
  console.log(`   seo: desc=${r.metaDesc} og=${r.og} twitter=${r.twitter} robots=${r.robots} canonical=${r.canonical}`);
}

/* ---------------------------------------------------------------
   2. Mobile overflow check at the target widths
   ------------------------------------------------------------- */
const WIDTHS = [360, 375, 390, 430, 600, 768, 900, 1024, 1280, 1440, 1920];
console.log('\n============ RESPONSIVE OVERFLOW ============');
for (const w of WIDTHS) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: w === 430 ? 932 : 900 });
  const overflowRoutes = [];
  for (const route of ['/', '/services', '/consultation', '/plans']) {
    await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 45000 });
    await sleep(350);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (over > 1) overflowRoutes.push(`${route}(+${over}px)`);
  }
  console.log(`${String(w).padStart(4)}px: ${overflowRoutes.length ? '⚠ ' + overflowRoutes.join(', ') : 'OK — no horizontal overflow'}`);
  await page.close();
}

/* ---------------------------------------------------------------
   3. BMI calculator actually computes
   ------------------------------------------------------------- */
console.log('\n============== BMI CALCULATOR ==============');
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/#bmi', issues);
  await page.goto(BASE + '/#bmi-calculator', { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.evaluate(() => document.querySelector('#bmi-calculator')?.scrollIntoView());
  await sleep(400);

  await page.type('#bmi-cm', '175');
  await page.type('#bmi-weight', '78');
  await page.type('#bmi-age', '28');
  await page.select('#bmi-gender', 'male');
  await sleep(500); // live computation

  const out = await page.evaluate(() => ({
    value: document.querySelector('.bmi__score-value')?.innerText,
    category: document.querySelector('.bmi__category')?.innerText,
    summary: document.querySelector('.bmi__summary')?.innerText.slice(0, 80),
    waLink: document.querySelector('.bmi__cta a[href*="wa.me"]')?.href.slice(0, 120),
    activeRow: document.querySelector('.bmi__table-row.is-active .bmi__table-label')?.innerText,
  }));
  console.log('175cm / 78kg / 28 / male  =>', out.value, '|', out.category);
  console.log('summary:', out.summary);
  console.log('whatsapp CTA:', out.waLink ? 'present' : 'MISSING');
  if (out.value !== '25.5') console.log('⚠ BMI value mismatch — expected 25.5');
  await page.close();
}

/* ---------------------------------------------------------------
   4. Consultation flow, end to end
   ------------------------------------------------------------- */
console.log('\n=========== CONSULTATION FLOW =============');
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/consultation', issues);
  await page.goto(BASE + '/consultation', { waitUntil: 'networkidle0' });
  await sleep(600);

  const clickText = async (selector, index = 0) => {
    const els = await page.$$(selector);
    if (!els[index]) throw new Error(`no element at index ${index} for ${selector}`);
    await els[index].click();
    await sleep(350);
  };

  // Step 1 — service
  await clickText('.cons-step__options--services .cons-option', 1);
  await page.click('.cons-nav .btn--primary');
  await sleep(400);
  // Step 2 — goal
  await clickText('.cons-step__options--goals .cons-option', 2);
  await page.click('.cons-nav .btn--primary');
  await sleep(400);
  // Step 3 — coach
  await clickText('.cons-step__options--coaches .cons-option', 1);
  await page.click('.cons-nav .btn--primary');
  await sleep(400);

  // Step 4 — pick the first enabled date
  const datePicked = await page.evaluate(() => {
    const btn = document.querySelector('.calendar__day:not(:disabled)');
    if (!btn) return null;
    btn.click();
    return btn.getAttribute('aria-label');
  });
  await sleep(400);
  await page.click('.cons-nav .btn--primary');
  await sleep(500);

  // Step 5 — time
  const slotCount = await page.$$eval('.slot', (els) => els.length);
  await clickText('.slot', 0);
  await page.click('.cons-nav .btn--primary');
  await sleep(400);

  // Step 6 — details
  await page.type('#cons-name', 'Test User');
  await page.type('#cons-phone', '9876543210');
  await page.type('#cons-email', 'test@example.com');
  await page.type('#cons-age', '29');
  await page.select('#cons-gender', 'Male');
  await page.type('#cons-location', 'Kaurihar, Prayagraj');
  await page.click('.cons-nav .btn--primary');
  await sleep(400);

  // Step 7 — requirements
  await page.type('#cons-requirements', 'I want to build strength, available evenings.');
  await page.click('.cons-nav .btn--primary');
  await sleep(500);

  // Step 8 — review
  const review = await page.evaluate(() =>
    [...document.querySelectorAll('.review__row')].map((r) => ({
      k: r.querySelector('dt')?.childNodes[0]?.textContent?.trim(),
      v: r.querySelector('dd')?.innerText.trim(),
    }))
  );
  console.log('review rows:');
  review.forEach((r) => console.log(`   ${(r.k || '').padEnd(20)} = ${r.v}`));

  // Step 9 — submit (EmailJS unconfigured -> fallback path)
  const waBefore = await page.evaluate(() => document.querySelector('.cons-nav a[href*="wa.me"]')?.href.slice(0, 130));
  console.log('review whatsapp link:', waBefore ? 'present' : 'MISSING');
  await page.evaluate(() => document.querySelector('.review__submit')?.click());
  await sleep(1600);

  // dismiss SweetAlert if shown
  const alertText = await page.evaluate(() => document.querySelector('.swal2-title')?.innerText || '(no dialog)');
  await page.evaluate(() => document.querySelector('.swal2-confirm')?.click());
  await sleep(900);

  const success = await page.evaluate(() => ({
    shown: Boolean(document.querySelector('.cons-success')),
    title: document.querySelector('.cons-success__title')?.innerText,
    note: document.querySelector('.cons-success__lede')?.innerText.slice(0, 90),
  }));
  console.log('submit dialog:', alertText);
  console.log('success screen:', success.shown ? 'YES' : 'NO', '|', success.title);
  console.log('success copy:', success.note);
  console.log('date picked was:', datePicked, '| slots offered:', slotCount);
  await page.close();
}

/* ---------------------------------------------------------------
   5. Fitness assessment flow
   ------------------------------------------------------------- */
console.log('\n========== FITNESS ASSESSMENT =============');
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/#assessment', issues);
  await page.goto(BASE + '/#fitness-assessment', { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.evaluate(() => document.querySelector('#fitness-assessment')?.scrollIntoView());
  await sleep(400);

  // Q1 age
  await page.type('#assessment-age', '30');
  await page.evaluate(() => [...document.querySelectorAll('.assessment__nav .btn')].pop().click());
  await sleep(400);
  // Q2 gender (choice -> auto-advance)
  await page.evaluate(() => document.querySelectorAll('.assessment__option')[0].click());
  await sleep(500);
  // Q3 height
  await page.type('#assessment-height-cm', '178');
  await page.evaluate(() => [...document.querySelectorAll('.assessment__nav .btn')].pop().click());
  await sleep(400);
  // Q4 weight
  await page.type('#assessment-weight', '82');
  await page.evaluate(() => [...document.querySelectorAll('.assessment__nav .btn')].pop().click());
  await sleep(400);
  // Q5..Q10 choices
  for (let i = 0; i < 6; i += 1) {
    await page.evaluate(() => document.querySelectorAll('.assessment__option')[1]?.click());
    await sleep(480);
  }
  await sleep(600);

  const result = await page.evaluate(() => ({
    goal: document.querySelector('.assessment__lead')?.innerText,
    kcal: document.querySelector('.assessment__macros dd')?.innerText,
    facts: [...document.querySelectorAll('.assessment__fact strong')].map((n) => n.innerText),
    next: document.querySelector('.assessment__next p')?.innerText.slice(0, 90),
    wa: document.querySelector('.assessment__result-cta a[href*="wa.me"]')?.href.length || 0,
  }));
  console.log('recommended goal :', result.goal);
  console.log('energy estimate  :', result.kcal);
  console.log('facts            :', JSON.stringify(result.facts, null, 0));
  console.log('next step        :', result.next);
  console.log('whatsapp payload :', result.wa ? `${result.wa} chars` : 'MISSING');
  await page.close();
}

/* ---------------------------------------------------------------
   6. Goal planner + plan finder + FAQ accordion + trainer form
   ------------------------------------------------------------- */
console.log('\n============ OTHER INTERACTIONS ============');
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/#goalplanner', issues);
  await page.goto(BASE + '/#goal-planner', { waitUntil: 'networkidle0' });
  await sleep(400);
  await page.evaluate(() => document.querySelectorAll('.goal-chip')[2].click());
  await sleep(500);
  const goalOut = await page.evaluate(() => ({
    title: document.querySelector('.goal-planner__detail-title')?.innerText,
    specs: [...document.querySelectorAll('.goal-planner__specs dd')].map((n) => n.innerText),
  }));
  console.log('goal planner ->', goalOut.title, '|', JSON.stringify(goalOut.specs));
  await page.close();
}
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/plans', issues);
  await page.goto(BASE + '/plans#find-your-plan', { waitUntil: 'networkidle0' });
  await sleep(500);
  for (let i = 0; i < 3; i += 1) {
    await page.evaluate(() => document.querySelectorAll('.finder__option')[2]?.click());
    await sleep(450);
  }
  const finder = await page.evaluate(() => ({
    name: document.querySelector('.finder__result-name')?.innerText,
    reason: document.querySelector('.finder__result-reason')?.innerText.slice(0, 90),
  }));
  console.log('plan finder ->', finder.name, '|', finder.reason);
  await page.close();
}
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/services', issues);
  await page.goto(BASE + '/services#faq', { waitUntil: 'networkidle0' });
  await sleep(500);
  const cats = await page.$$eval('.faq__cat', (els) => els.length);
  await page.evaluate(() => document.querySelectorAll('.faq__cat')[3].click());
  await sleep(400);
  await page.evaluate(() => document.querySelector('.accordion__trigger').click());
  await sleep(600);
  const faq = await page.evaluate(() => ({
    openCat: document.querySelector('.faq__cat.is-active')?.innerText.trim(),
    items: document.querySelectorAll('.accordion__item').length,
    openPanelHeight: document.querySelector('.accordion__panel')?.style.maxHeight,
  }));
  console.log(`FAQ: ${cats} categories, active="${faq.openCat}", ${faq.items} items, opened panel maxHeight=${faq.openPanelHeight}`);

  // service nav jump
  const navLinks = await page.$$eval('.svc-nav__link', (els) => els.length);
  console.log('service jump nav links:', navLinks);
  await page.close();
}
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/careers', issues);
  await page.goto(BASE + '/careers#trainer-registration', { waitUntil: 'networkidle0' });
  await sleep(500);
  // validation first
  await page.evaluate(() => document.querySelector('.tr-form__form button[type="submit"]').click());
  await sleep(400);
  const errs = await page.$$eval('.tr-form .field__error', (els) => els.map((e) => e.innerText));
  console.log('trainer form empty-submit errors:', JSON.stringify(errs));
  await page.type('#tr-fullName', 'Asha Verma');
  await page.type('#tr-phone', '9876543210');
  await page.type('#tr-email', 'asha@example.com');
  await page.select('#tr-gender', 'Female');
  await page.type('#tr-city', 'Prayagraj');
  await page.select('#tr-role', 'Female Fitness Coach');
  await page.evaluate(() => document.querySelector('.tr-form__form button[type="submit"]').click());
  await sleep(1800);
  const after = await page.evaluate(() => ({
    dialog: document.querySelector('.swal2-title')?.innerText || '(none)',
    success: Boolean(document.querySelector('.tr-form__success')),
  }));
  await page.evaluate(() => document.querySelector('.swal2-confirm')?.click());
  console.log('trainer form submit -> dialog:', after.dialog, '| success panel:', after.success);
  await page.close();
}
{
  // Contact form validation
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/contact', issues);
  await page.goto(BASE + '/contact#contact-form', { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.evaluate(() => document.querySelector('.cform__form button[type="submit"]').click());
  await sleep(400);
  const errs = await page.$$eval('.cform .field__error', (els) => els.map((e) => e.innerText));
  console.log('contact form empty-submit errors:', JSON.stringify(errs));
  const hours = await page.evaluate(() => ({
    badge: document.querySelector('.hours__badge')?.innerText.trim(),
    rows: document.querySelectorAll('.hours__row').length,
  }));
  console.log('opening hours ->', hours.badge, '| rows:', hours.rows);
  await page.close();
}

/* ---------------------------------------------------------------
   7. Progress tracker (localStorage)
   ------------------------------------------------------------- */
console.log('\n=========== PROGRESS TRACKER ==============');
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, '/#tracker', issues);
  await page.goto(BASE + '/#progress-tracker', { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.evaluate(() => document.querySelector('#progress-tracker')?.scrollIntoView());
  await sleep(400);
  await page.type('#tracker-weight', '84');
  await page.evaluate(() => document.querySelector('.tracker__form button[type="submit"]').click());
  await sleep(700);
  const first = await page.evaluate(() => document.querySelectorAll('.tracker__record').length);
  await page.type('#tracker-weight', '82.5');
  await page.evaluate(() => document.querySelector('.tracker__form button[type="submit"]').click());
  await sleep(700);
  const after = await page.evaluate(() => ({
    records: document.querySelectorAll('.tracker__record').length,
    stats: [...document.querySelectorAll('.tracker__stats strong')].map((n) => n.innerText),
    chart: Boolean(document.querySelector('.tracker__chart polyline')),
    stored: Boolean(localStorage.getItem('aarambh.progress.v1')),
  }));
  console.log(`entries after 2 adds: ${after.records} (first=${first}) | stats=${JSON.stringify(after.stats)} | chart=${after.chart} | persisted=${after.stored}`);
  await page.close();
}

/* ---------------------------------------------------------------
   8. Navigation + Lenis
   ------------------------------------------------------------- */
console.log('\n============== NAVIGATION =================');
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  attach(page, 'nav', issues);
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await sleep(600);
  const nav = await page.evaluate(() => ({
    lenis: typeof window.lenis !== 'undefined',
    smoothHelper: typeof window.scrollToSmooth === 'function',
    links: [...document.querySelectorAll('.navbar__list a')].map((a) => a.textContent.trim()),
    cta: document.querySelector('.navbar__cta')?.textContent.trim(),
  }));
  console.log('Lenis mounted:', nav.lenis, '| smooth helper:', nav.smoothHelper);
  console.log('nav links:', JSON.stringify(nav.links), '| CTA:', nav.cta);

  // client-side navigation
  await page.evaluate(() => [...document.querySelectorAll('.navbar__list a')].find((a) => a.textContent.trim() === 'Services').click());
  await sleep(1400);
  const landed = await page.evaluate(() => ({ url: location.pathname, h1: document.querySelector('h1')?.innerText.slice(0, 50) }));
  console.log('after clicking Services ->', landed.url, '|', landed.h1);

  // mobile menu
  await page.setViewport({ width: 390, height: 900 });
  await sleep(500);
  await page.evaluate(() => document.querySelector('.navbar__toggle').click());
  await sleep(900);
  const menu = await page.evaluate(() => ({
    open: document.querySelector('.mobile-menu')?.classList.contains('is-open'),
    items: document.querySelectorAll('.mobile-link').length,
  }));
  console.log('mobile menu opens:', menu.open, '| items:', menu.items);

  // sticky bar
  const bar = await page.evaluate(() => {
    const el = document.querySelector('.mobile-bar');
    return el ? getComputedStyle(el).display : 'MISSING';
  });
  console.log('mobile sticky bar display at 390px:', bar);
  await page.close();
}

/* ---------------------------------------------------------------
   Summary
   ------------------------------------------------------------- */
console.log('\n================ ISSUES ===================');
if (!issues.length) {
  console.log('None — no console errors, page errors or failed requests.');
} else {
  const seen = new Set();
  for (const i of issues) {
    const key = i.kind + i.text;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`[${i.route}] ${i.kind}: ${i.text}`);
  }
  console.log(`(${issues.length} total, ${seen.size} unique)`);
}

await browser.close();
