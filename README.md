# Aarambh Fitness

Premium fitness website for **Aarambh Fitness**, Kaurihar, Prayagraj, Uttar Pradesh.

React 18 + JavaScript + Vite. No CSS framework — every style lives in an external
`.css` file next to the component it belongs to.

## Routes

| Path            | Page                                        |
| --------------- | ------------------------------------------- |
| `/`             | Home (18 sections)                          |
| `/about`        | Story, mission, facility, values            |
| `/services`     | 8 detailed services + comparison + FAQ      |
| `/plans`        | Gym plans, PT plans, comparison, plan finder|
| `/careers`      | Open roles, team, trainer application form  |
| `/consultation` | 9-step booking request wizard               |
| `/contact`      | Details, enquiry form, map, opening hours   |
| `*`             | Custom 404                                  |

## Setup

```bash
npm install
cp .env.example .env   # then fill in your own values
npm run dev            # http://localhost:5173
npm run build          # production bundle in dist/
npm run preview        # serve the built bundle
```

### Environment variables

Nothing sensitive is hardcoded. All of these are read from `.env` only:

| Variable                     | Used for                                        |
| ---------------------------- | ----------------------------------------------- |
| `VITE_EMAILJS_SERVICE_ID`    | EmailJS service                                 |
| `VITE_EMAILJS_TEMPLATE_ID`   | EmailJS template                                |
| `VITE_EMAILJS_PUBLIC_KEY`    | EmailJS public key                              |
| `VITE_WHATSAPP_NUMBER`       | WhatsApp number, digits only (`91...`)          |
| `VITE_GOOGLE_MAPS_URL`       | Google Maps embed URL for the Contact page      |
| `VITE_SITE_URL`              | Public origin for canonical + Open Graph URLs   |

While EmailJS is unconfigured the forms still work — they hand the submission over
to WhatsApp instead of failing. Set the three EmailJS variables to switch on email
delivery.

## Where things live

```
src/
  assets/       icons (hand-written SVG), images
  components/   19 shared components, each in its own folder
  data/         all editable business content (9 files)
  hooks/        Lenis, reduced-motion, media queries, GSAP scroll helpers
  pages/        one folder per route, one folder per section inside it
  styles/       design tokens, reset, typography, utilities, animations
  utils/        BMI, calories, assessment, booking, WhatsApp, EmailJS, hours
```

Every section is `Section.jsx` + `Section.css` in its own folder.

## Content integrity

These are deliberately **not** invented anywhere on the site — they are either
configurable in `src/data/` or rendered as an honest placeholder:

- **Pricing** — `plans.js` / `ptPlans.js`. All prices are `null`, so every plan
  shows *"Contact for plan details"* until real numbers are added.
- **Testimonials** — `testimonials.js` is empty; the section renders an honest
  empty state rather than fake quotes.
- **Business statistics** — `brandStats` in `siteConfig.js` are all `null`.
- **Trainer profiles** — `trainers` in `trainers.js` is empty; the Careers page
  falls back to role descriptions.
- **Physiotherapy and diet copy** carries no medical claims, and the BMI tool
  shows a disclaimer.

To make the site live, fill in `contact` (phone, email, address) in
`src/data/siteConfig.js` — those fields are marked `⚠ EDIT ME`.

## Verification

`verify.mjs` drives the real site in headless Chrome: it loads every route,
checks SEO tags and broken images, sweeps 12 viewport widths for horizontal
overflow, and exercises the BMI calculator, the 10-question assessment, the
full 9-step consultation flow, the goal planner, the plan finder, the FAQ
accordion, both application forms, the progress tracker, and navigation.

It needs Puppeteer, which is **not** in `package.json` (it downloads a ~150 MB
Chromium, which you should not have to pull just to run the site):

```bash
npm i -D puppeteer   # one-off, for QA only
npm run dev          # in one terminal
npm run verify       # in another
```

On a minimal Linux box Chromium may also need system libraries:

```bash
sudo apt-get install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
  libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2 libatspi2.0-0
```

## Known gap

Two images are still placeholders (`hero-athlete.jpg` and `male-athlete.jpg` are
standing in for them). Generate or supply `group-training.jpg` and
`strength-dumbbells.jpg` into `src/assets/images/`, then update the imports in:

- `src/pages/Home/sections/FinalCTA/FinalCTA.jsx`
- `src/pages/Home/sections/Statistics/Statistics.jsx`
- `src/pages/Careers/sections/CareersHero/CareersHero.jsx`
