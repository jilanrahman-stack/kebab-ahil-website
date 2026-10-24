# Kebab Ahil – website

Static website for Kebab Ahil, ul. Kościuszki 26, Czarnków.

- **Generator:** Eleventy 3 (`npm run build` → `_site/`)
- **Hosting:** Cloudflare Pages (free, `*.pages.dev`)
- **CMS:** Pages CMS (app.pagescms.org), configured in `.pages.yml`

## Where the content lives

| What | File | CMS section |
|---|---|---|
| Name, phone, address, hours, delivery, SEO, GA4 ID, Search Console code | `src/_data/site.json` | ⚙️ Dane firmy… |
| Home page texts, photos, highlights, FAQ, gallery, promo bar | `src/_data/home.json` | 🏠 Strona główna |
| Full menu and prices | `src/_data/menu.json` | 🥙 Menu i ceny |
| Reviews | `src/_data/reviews.json` | ⭐ Opinie |
| Images | `src/media/` | Media |

## Cloudflare Pages build settings

- Build command: `npm run build`
- Output directory: `_site`
- Node version: 22 (set by `.nvmrc`, or env var `NODE_VERSION=22`)

## Local preview

```
npm install
npm start      # http://localhost:8080
```

## Built in

- Restaurant schema.org data generated from `site.json` (hours follow the selected season)
- `sitemap.xml`, `robots.txt`, canonical and Open Graph tags
- GA4 with Consent Mode v2 + cookie banner (only active when a GA4 ID is set)
- GA4 events: `click_to_call`, `directions_click`, `review_click`
- Google Map loads only after a click (privacy + speed)
- Privacy policy page (`/polityka-prywatnosci/`)
