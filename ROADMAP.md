# Petali e Fiori: Website Redesign Roadmap

## 1. Project goal

Rebuild https://www.petaliefiori.it/ as a simple, clean and modern website that keeps the warm,
romantic vibe of the physical shop. All content comes from the current site and its photos.

The person running this project is a web developer who redesigns sites for small businesses.
Every phase of this roadmap is called a **session**.

## 2. Brief transferred from PROMPT.md

- Gather every piece of information available on https://www.petaliefiori.it/ .
- Use the information inside the photos to design a site in a style that matches the vibe of the shop.
- Tech stack: **React**, **Express**, **MySQL** (MySQL Workbench), **custom CSS**, with SEO optimized.
- First step: write this roadmap and the agents file (AGENTS.md).
- AGENTS.md must contain these rules: no em-dashes, no emojis, no lines that only contain `>` or `/>`.
- Phases are called sessions.
- Once every piece of information from PROMPT.md lives here and in AGENTS.md, delete PROMPT.md.

## 3. Shop research

### 3.1 Identity

| Item | Value |
| --- | --- |
| Business name | Petali e Fiori (domain petaliefiori.it) |
| Role | Flower designer and floral decoration studio |
| Flower Designer | Valeria Sciandra, diplomata |
| Positioning | A staff of professionals who design and build the wedding or event of your dreams, always starting from your budget |
| VAT number | P.iva 07036590961 |
| Copyright line | Copyright Petaliefiori 2011 |

### 3.2 Contacts and location

| Item | Value |
| --- | --- |
| Shop | Via Arzaga 24, 20146 Milano |
| Metro | MM1 fermata Primaticcio |
| Landline | 02 23167849 |
| Mobile | 331 8603337 |
| Email | info@petaliefiori.it |
| Map | Cross streets: Via Arzaga, Via dei Castagni, Via dei Crisantemi, Via Verdasio, Via Gil Pomi |
| Partner | Autonoleggio Bellani, www.autonoleggiobellani.com |

### 3.3 Sitemap of the current site

Main navigation (left column): Addobbi Floreali Matrimoniali, Chiesa, Comune, Bouquet,
Decorazioni Varie, Retromacchina, Bottoniere, Centrotavola, Preventivi, Progetti Virtuali,
Allestimenti per Meeting.

Footer navigation: Chi Siamo, Contatti, Dove Siamo, Gallery, Partners.

Header shows the logo, the wordmark and a live Italian date line (for example
"Lunedì, 19 Ottobre 2026").

### 3.4 Page by page content

**Home**
- Tagline: "Per il vostro Sogno d'Amore, scegliete chi possa realizzare i Vostri sogni."
- "Noi possiamo realizzare il Bouquet e l'allestimento che avete sempre immaginato: possiamo
  mostrarvi in anticipo come saranno inserite le decorazioni nel luogo dell'Evento."
- "Da noi troverete un Flower Designer che progetterà e realizzerà su misura il Vostro Evento,
  rendendolo veramente unico."
- "I preventivi sono gratuiti, cost come il progetto virtuale da noi sviluppato su di un'immagine
  del luogo ove si svolgerà l'Evento." (the word "cost" is a typo for "così" on the live site)
- Closing line: "Insomma il nostro obiettivo è realizzare i Vostri Sogni!"
- Slideshow with 11 photos: Bouquet Manet dettaglio, Bouquet Renoir, Chiesa di Saronno progetto
  bianco e verde, Bouquet Raffaello, Bouquet Manet, Valorizzazione fiore, Bouquet Tiziano Akito,
  Composizione decorativa, Decorazioni esterne chiesa, Bouquet Magritte, Decorazione lineare a S.

**Chi Siamo**
- Staff of professionals who collaborate to design the wedding or event of your dreams.
- Valeria Sciandra, Flower Designer diplomata, creates the compositions best suited to the event
  and proposes exactly what the couple dreamed of, always starting from the budget.
- Two levels of service: full collaboration on every detail, or full autonomy where the studio
  presents several virtual projects and builds the chosen one.
- Virtual projects are developed on a photo of the venue and presented through computer graphics.
- Partners: Autonoleggio Bellani.
- Close: "Insomma il nostro obiettivo è realizzare i Vostri Sogni!"

**Dove Siamo**
- "Il nostro punto vendita è in: Via Arzaga 24, Milano, MM1 fermata Primaticcio."
- Static map image of the block around Via Arzaga.

**Contatti**
- Form fields: Nome e Cognome (required), e-mail (required), Data del Matrimonio,
  Luogo dell'Evento, telefono, Messaggio, security number captcha.
- Hint under the message field: "potete darci qualche indicazione di cosa preferite; ad esempio la
  tipologia di fiori, il tipo di addobbo, se desiderate la camminata o meno e soprattutto se
  desiderate il nostro Progetto Virtuale Gratuito!"
- Contacts image with info@petaliefiori.it, 02 23167849, 331 8603337.

**Chiesa**
- The ceremony is a sacred moment, every church has an architectural style that must be respected:
  renaissance churches suit romantic decorative style, modern churches suit block or linear style.
- Decorations must be harmonious with the church, with each other and with the bride bouquet.
- Virtual project phase: mockups on photos of the venue, easy to modify, number of compositions,
  flower type and color, cost evaluation, full participation of the couple.
- Photo set of the Chiesa di Saronno project (18 images with descriptive captions).

**Comune**
- Many couples marry only at the town hall, which does not mean giving up a scenic decoration.
- The wedding room can be decorated exactly like a church with flowers, ribbons and tulle.
- A virtual project is produced on a photo of the room, useful for forms, colors and cost.
- Photo set of the Comune di Melegnano project (8 images).

**Bouquet**
- The bouquet is the heart of floral decoration, often chosen before the dress.
- Colors and shapes are matched to the style of the ceremony and to the character of the bride.
- How to hold it: left hand, resting on the arm of the person walking the bride, decorative
  bouquets keep the falling side on the left of the dress.
- Dress pairing advice: romantic vaporous dress with decorative cascading bouquet, modern dress
  with structured bouquet.
- **Bouquet decorativi**: from 90 EUR up to 300 EUR. Models: Renoir, Manet, Degas, Klee.
- **Bouquet formali**: from 90 EUR up to 250 EUR. Models: Caravaggio, Tiziano, Raffaello,
  Magritte (borsetta style).
- Prices depend on flower choice, orchids cost more than common roses.

**Decorazioni Varie**
- Typical use: the house of the bride and groom, the door or stairs the bride leaves from,
  the parents' houses, on top of church or town hall decoration.
- 14 photos of decoration types. Twelve of them have a detailed description: Decorativa, Passiva,
  Triangolo asimmetrico, Triangolo simmetrico, Ventaglio, Ovale, A blocchi, Valorizzazione del
  fiore, Lineare a S, Mezzaluna, Decorazione a L, Naturalistica. Spontanea has photos but no
  description on the current site.
- Notes: Decorativa is about 140 cm tall and 50 cm wide, so it sits on the floor. Ventaglio and
  Triangolo simmetrico are single faced and cheaper, they lean against a wall or column.
  Naturalistica recreates a piece of nature with greens and small artificial elements.

**Retromacchina**
- Placed on the rear window of the couple car, same flowers as the church and the bouquet.
- Can also be reused as a table decoration for the couple at the restaurant, in that case avoid
  strongly scented flowers such as common lilies.
- Extra options: shaped foams fixed to the car body (heart, rings) or tulle ribbons on the front
  of the car to contain costs.

**Bottoniere**
- Worn on the groom lapel, under the pocket square level.
- Usually made with the main flower of the bride bouquet plus greens and a bit of gypsophila.
- Tradition also gives a smaller boutonniere to the witnesses and to both sets of parents.

**Centrotavola**
- What guests look at all through the wedding banquet, so it must be balanced and harmonious.
- Main flower must refer back to the bride bouquet; if the flower is expensive, pick one with the
  same shape and color.
- Candles are ideal for evening banquets; round candles decorated with greens and petals help
  contain costs.
- Price example: a full restaurant setup cost 649 EUR, or 499 EUR without the two large bamboo
  vases, delivery and installation included.

**Preventivi (price examples)**
- Main cost factors: period of the wedding, flower type, quantity.
- Advice: avoid red roses around San Valentino, orchids are always expensive.
- Examples:
  - Elegant but cheap June wedding (bouquet, retromacchina, 2 small indoor decorations,
    3 boutonnieres): 299 EUR.
  - Base setup (bouquet, large retrosposi for the church, 2 medium altar compositions,
    3 boutonnieres): 435 EUR.
  - Spring setup (bouquet, retromacchina, 2 large church decorations about 100x60 cm,
    5 boutonnieres): 499 EUR.
  - Setup with aisle in greens and tulle (bouquet, 2 medium altar compositions, retromacchina,
    10 bench bunches, 10 tulle bows, boutonnieres): 599 EUR.
  - Bouquet and groom boutonniere only: around 159 EUR including delivery, less if the bouquet
    is small or uses cheap flowers.
  - Chiesa di Saronno full setup: 1398 EUR with itemized list, or 499 EUR reduced.
- Prices include transport, installation at the venue and delivery of the bouquet, boutonnieres
  and retromacchina on the morning of the wedding.
- Call to action: contact us today for a free quote and a free virtual project.

**Progetti Virtuali**
- The linked page returns 404 on the live site. The content lives inside Chi Siamo, Chiesa,
  Comune and Preventivi: a free virtual project built on a photo of the venue, presented with
  computer graphics, edited until the couple is happy, useful to see the impact of flower type,
  color and quantity before spending.

**Allestimenti per Meeting**
- Floral decoration for corporate meetings and cultural events, coherent with the style of the
  organization, also for hotels and restaurants.
- Example event in a Milan venue: 649 EUR including table decorations, two bamboo vases,
  delivery and installation on the morning of the event.
- Extra service: review and refresh existing artificial or dried flower decorations, with a free
  quote for the intervention.

**Gallery**
- Empty placeholder on the live site, but hundreds of photos exist across the other pages.

**Partners**
- Shows a "page under construction" image. Known partner: Autonoleggio Bellani.

### 3.5 Prices summary for the database

| Offering | Price |
| --- | --- |
| Bouquet decorativo | from 90 EUR to 300 EUR |
| Bouquet formale | from 90 EUR to 250 EUR |
| Bouquet plus groom boutonniere | around 159 EUR |
| June basic wedding setup | 299 EUR |
| Base church setup | 435 EUR |
| Spring setup | 499 EUR |
| Aisle with greens and tulle | 599 EUR |
| Chiesa di Saronno full setup | 1398 EUR |
| Chiesa di Saronno reduced setup | 499 EUR |
| Restaurant table setup | 649 EUR, 499 EUR without bamboo vases |
| Corporate event setup | 649 EUR |

### 3.6 Brand visuals taken from the photos

- Warm apricot header band (#FABD6B) behind the logo and title.
- Butter yellow page background (#F8FAC8) with pale green divider lines (#F8FAC8 on apricot).
- White logotype in an elegant script with a soft shadow, set on apricot.
- Body copy on the old site uses an italic serif script in black on butter yellow.
- Photography: warm orange and peach roses, ivory satin bridal dress, gypsophila, ivy,
  white roses with pink hypericum, formal bouquets with green baskets.
- Page titles are apricot strips with the section name written in white script.
- Navigation is made of small apricot image buttons with white script labels and an
  orange hover state.

### 3.7 Current SEO baseline

- Title: "Petali e fiori - Allestimenti Floreali per Eventi, Fiori e Bouquet da Sposa"
- Description: "Addobbi Floreali per Eventi: Matrimoni, cerimonie e feste private. Ci occupiamo di
  qualsiasi tipologia di allestimento. Preventivi gratuiti; nei prezzi è incluso montaggio e
  consegna Bouquet a casa della Sposa."
- Very long keyword meta tag covering weddings, funeral flowers, restaurants, meetings, seasons.
- Robots: INDEX, FOLLOW. Google site verification present twice.
- Analytics: histats counter, an old and unreliable tool.

### 3.8 Problems of the current site

- Table based XHTML layout from 2011, fixed 980px width, no mobile support.
- Navigation made of images, no crawlable text links.
- Broken link: progettivirtuali.html returns 404.
- Gallery and Partners pages are empty placeholders.
- Adobe Flash elements that no longer run.
- No structured data, no sitemap, no image alt strategy beyond filenames.
- Mixed http resources and an insecure histats script.
- Content is deep but hard to scan, everything is long paragraphs with no headings.

## 4. Design direction

### 4.1 Vibe

Warm, romantic, artisanal, confident. The shop feels like a sunny Milanese studio full of peach
roses, so the site should feel bright and generous rather than minimal and cold. Clean and modern
means: clear hierarchy, lots of breathing room, real photography, no visual clutter.

### 4.2 Palette

| Token | Hex | Use |
| --- | --- | --- |
| cream | #FFFDF7 | Page background |
| butter | #F8FAC8 | Soft highlight bands, kept as a heritage color |
| apricot | #FABD6B | Header, primary accent, buttons |
| apricot deep | #E08A3C | Hover states, borders |
| rose | #E4703A | Call to action, price highlights |
| leaf | #24513C | Headings on light, footer background |
| blush | #F7E7DC | Cards, section dividers |
| ink | #23201C | Body text |

### 4.3 Typography

- Display and headings: Cormorant Garamond, italic for quotes and taglines, to echo the script
  logotype of the shop.
- Body and UI: Inter or Karla for readability.
- Scale: 1.25 modular scale, one H1 per page, generous line height around 1.7 for long Italian
  paragraphs.
- The script logotype stays as a logotype only, never as body copy.

### 4.4 Layout principles

- Sticky slim header with text navigation, logo on the left.
- Hero with one strong photo, the tagline and two actions: "Richiedi il preventivo" and
  "Guarda la gallery".
- Sections in a max width of 1200px, 12 column grid, single column below 768px.
- Cards for services, bouquets and decoration types with photo, name, short text and price.
- Long content pages get a sticky table of contents.
- Photography is the hero, text supports it.

### 4.5 Imagery

- Reuse the photos already published on the current site, downloaded and re optimized as WebP with
  a JPEG fallback, with descriptive Italian filenames and real alt text.
- Categories for galleries: chiesa, comune, bouquet, decorazioni, centrotavola, meeting, home.
- Hero images: peach roses close up (old logo crop), Bouquet Manet, Chiesa di Saronno project.

## 5. Architecture

### 5.1 Stack

- Frontend: React 18 with Vite, function components and hooks, custom CSS only.
- Backend: Express 4, mysql2/promise connection pool, no ORM.
- Database: MySQL 8 designed and inspected with MySQL Workbench.
- SEO: server side rendering of the React routes through Express using renderToString, per route
  meta tags, JSON-LD, generated sitemap.xml and robots.txt.
- Repo layout:

```
petali-e-fiori/
  ROADMAP.md
  AGENTS.md
  package.json            root scripts (dev, build, seed, images)
  .env.example
  db/
    schema.sql
    seed.sql
    seed_gallery.sql      generated by scripts/export-images.ps1
  scripts/
    dev.mjs               runs server and client together
    seed.mjs              applies the three SQL files in order
    export-images.ps1     downloads the photos and rebuilds seed_gallery.sql
  server/
    package.json
    src/
      index.js
      db.js
      config.js
      routes/
      controllers/
      seo/
      middleware/
  client/
    package.json
    vite.config.js
    index.html
    public/images/        80 photos in 12 category folders
    src/
      main.jsx
      App.jsx
      api/
      components/
      pages/
      styles/
        tokens.css
        base.css
        layout.css
```

### 5.2 Data model

- **settings**: id, setting_key, setting_value. Stores phone numbers, email, address, VAT,
  taglines, opening text.
- **pages**: id, slug, meta_title, meta_description, intro, body (long text), hero_image,
  published. One row per static page (chi-siamo, dove-siamo, preventivi, progetti-virtuali).
- **services**: id, slug, name, summary, body, hero_image, hero_images (JSON list of {src, alt}
  that the page renders as a collage), sort_order. Chiesa, comune, bouquet, decorazioni-varie,
  retromacchina, bottoniere, centrotavola, meeting.
- **bouquets**: id, name, style (decorativo, formale, borsetta, gambo-scoperto), description,
  price_min, price_max, image, sort_order.
- **decorations**: id, name, slug, description, usage, image, sort_order. The 14 types.
- **price_examples**: id, title, season, description, items (JSON text), price, image, sort_order.
- **gallery_images**: id, category, file, alt, caption, sort_order.
- **partners**: id, name, url, logo, description, sort_order.
- **contact_messages**: id, name, email, phone, wedding_date, venue, message, ip_address,
  created_at, read_at.

### 5.3 API

- GET /api/settings
- GET /api/pages/:slug
- GET /api/services
- GET /api/services/:slug
- GET /api/bouquets
- GET /api/decorations
- GET /api/price-examples
- GET /api/gallery?category=
- GET /api/partners
- POST /api/contact (validation, rate limit, honeypot field)
- GET /sitemap.xml
- GET /robots.txt
- GET * serves the rendered React route with its own title, description and JSON LocalBusiness
  Florist schema.

### 5.4 SEO plan

- Server side render every route so crawlers receive full HTML.
- One unique title and meta description per route, canonical URL, Open Graph and Twitter cards.
- JSON LocalBusiness Florist schema with name, address, geo, telephone, email, opening hours,
  image and sameAs.
- Semantic HTML: header, nav, main, section, article, footer, one H1 per page, ordered heading
  levels.
- Text links instead of image links for every navigation item.
- XML sitemap with lastmod, robots.txt allowing all and pointing to the sitemap.
- Images: WebP with width and height set, lazy loading below the fold, descriptive Italian alt.
- Performance budget: LCP under 2.5s on mobile, no render blocking fonts, preconnect to Google
  Fonts, critical CSS inlined.
- Analytics: replace histats with a privacy friendly option (Plausible or GA4) and add
  Google Search Console verification carried over from the old site.
- Italian content kept, keywords rebuilt around: fiorista Milano, addobbi floreali matrimonio,
  bouquet sposa, decorazioni floreali chiesa, centrotavola, progetto virtuale, allestimenti
  meeting Milano.

## 6. Sessions

Every phase of this project is a session. Each session ends with a working state that can be
demonstrated.

### Session 1: Scaffold, database and content

Goal: project structure, MySQL schema, seeded content taken from the research above.

Tasks:
- Create the folder layout, root package.json with dev, build and seed scripts.
- Write db/schema.sql with all tables and sensible indexes, review it in MySQL Workbench.
- Write db/seed.sql with the real core content: services, bouquets, decorations, prices,
  settings, partners.
- Export the photos from the current site into client/public/images organized by category with
  scripts/export-images.ps1, which also generates db/seed_gallery.sql with category, alt text
  and caption for every photo.
- Add .env.example with DB credentials, port, site URL.

Deliverables: schema loads without errors, seed loads without errors, tables contain the research.

Acceptance: a fresh MySQL import of schema.sql followed by seed.sql and seed_gallery.sql returns
the full content: 30 settings, 5 pages, 8 services, 8 bouquets, 13 decorations, 9 price examples,
1 partner and 80 gallery images.

Status: complete. Import verified against the acceptance list on MySQL 8.4 with `npm run seed`.

### Session 2: Express API and SEO infrastructure

Goal: a documented JSON API plus the SEO endpoints.

Tasks:
- Express app with db pool, config, error handling and request logging.
- Route and controller per resource listed in section 5.3.
- POST /api/contact with validation, honeypot, rate limiting by IP, insert into contact_messages.
- sitemap.xml and robots.txt generators reading published routes from the DB.
- Health check endpoint and basic API tests.

Deliverables: API running locally, endpoints documented in README, tests green.

Acceptance: every endpoint returns correct JSON, invalid contact submissions are rejected.

Status: complete. 18 API tests green on MySQL 8.4 (`npm test`), README documents every
endpoint and the canonical site routes.

### Session 3: Design system and React shell

Goal: the visual language of section 4 implemented in custom CSS, plus the app shell.

Tasks:
- Vite React setup, router, API client.
- tokens.css with palette and type scale, base.css with resets and typography,
  layout.css with grid and container utilities.
- Components: Header, Nav, Footer, Button, Card, SectionHeading, PriceTag, Breadcrumbs,
  Lightbox placeholder, ContactForm.
- Responsive behaviour at 1024px, 768px and 480px.
- Accessible focus states, contrast check against WCAG AA.

Deliverables: shell renders with sample data, no framework CSS imported.

Acceptance: navigation works, all pages have a placeholder, mobile layout has no horizontal
scroll.

Status: complete. React 18 shell with the design system in custom CSS, every route renders from
the API, no horizontal scroll from 320px up (checked in headless Edge) and every text pair
passes WCAG AA. The ContactForm is already wired to POST /api/contact and the Lightbox is used
by the home and gallery grids, so Session 5 only has to add the category filter, the home
slideshow, the sticky table of contents and the toast confirmation.

### Session 4: Main pages with real content

Goal: all pages filled with data from the API.

Tasks:
- Home: hero, tagline, service grid, price teaser, gallery teaser, free quote call to action.
- Servizi pages: chiesa, comune, bouquet, decorazioni, retromacchina, bottoniere, centrotavola,
  meeting, each with intro, body, gallery strip and related services.
- Chi siamo, Dove siamo with map embed, Preventivi with the price table, Progetti virtuali page
  rebuilt to replace the broken link.
- Breadcrumbs and cross links between related pages.

Deliverables: complete browsing experience with real Italian copy and photos.

Acceptance: no lorem ipsum, no missing images, every route renders from API data.

Status: complete. Every service page now carries its photo strip from the matching gallery
category plus cross links; bouquet and decorazioni-varie build their own sections from the
bouquets and decorations tables, which were seeded but never rendered until now. Preventivi
lists the nine real price examples in a responsive table, Dove siamo replaces the old static
map with a lazy OpenStreetMap embed geocoded from the shop address, and every inner page,
gallery included, ends with links to related pages. Checked in headless Edge across 15 routes:
no lorem ipsum, no broken images, one H1 and no skipped heading levels, no horizontal scroll at
320, 375, 768 and 1280 px, and every text pair passes WCAG AA.

### Session 5: Gallery, contact form and interactions

Goal: the two features the old site never delivered.

Tasks:
- Gallery page with category filter, responsive grid and keyboard accessible lightbox.
- Contact form wired to POST /api/contact with client side validation, success and error states,
  required field marks matching the original form.
- Home slideshow with pause on hover and reduced motion support.
- Sticky table of contents on long pages.
- Toast or inline confirmation after a message is sent.

Deliverables: gallery with all categorized photos, working form storing messages in MySQL.

Acceptance: filter and lightbox work with keyboard, a submitted message appears in
contact_messages.

Status: complete. The gallery filter narrows the grid from the list already in memory, the
lightbox opens on the filtered set, closes on Escape and returns focus to the photo that opened
it, and a category with no photos shows a friendly note instead of an empty grid. The home hero
rotates through the seeded photos with pause on hover, pause on focus and a pause/play button,
and it never starts on its own under prefers-reduced-motion while the manual arrows keep
working. To give the sticky table of contents something to link to, 43 section headings were
added to the long page copy in the seed, so those pages now build anchored sections behind a TOC
that highlights the section in view. The contact form and its inline confirmation were already
in place from the earlier sessions. Checked in headless Edge: filter, lightbox keyboard and
focus behaviour, slideshow pause and dots, TOC anchor links, single H1 per page, no horizontal
scroll at 375 px and no console errors across 5 routes; the server tests confirm a valid message
is stored in contact_messages while the honeypot, invalid payloads and the rate limit are
refused.

### Session 6: SEO, performance, accessibility and launch

Goal: production readiness.

Tasks:
- Server side rendering for all routes with per route title, description, canonical, Open Graph
  and JSON LocalBusiness Florist schema.
- Generate sitemap.xml, verify robots.txt, carry over Google site verification.
- Image optimization pass to WebP, lazy loading, font preconnect, critical CSS.
- Meta refresh and 301 redirects from the old paths (chiesa.html, bouquet.html and the rest) to
  the new routes.
- Lighthouse pass: performance, accessibility, best practices, SEO, target 90+.
- README with install, seed, dev, build and deploy instructions.
- Deploy checklist and DNS notes for petaliefiori.it.

Deliverables: production build running behind Express, README, Lighthouse report.

Acceptance: all routes server rendered, sitemap valid, Lighthouse SEO 90+, no console errors,
mobile friendly.

### Session 7: Hero photos and navigation polish

Goal: replace the photos that betray the quality of the shop shots and take the crowding out of
the header.

Tasks:
- Bouquet page: swap the 150x200 hero for the Tiziano bouquet detail already in the gallery.
- Retromacchina and Decorazioni Varie: show a collage of four photos instead of one stretched
  hero, stored in the new services.hero_images JSON column and rendered by ContentPage.
- Header: group the seven wedding services behind a Matrimonio dropdown so the top row holds
  five items instead of eleven.

Deliverables: the three pages carry their new hero media from the database, the header has a
dropdown that works with mouse, keyboard and touch.

Acceptance: bouquet, retromacchina and decorazioni-varie show the new photos, the dropdown opens
and closes with the keyboard and returns focus to its button, the mobile menu still lists every
link, no horizontal scroll from 375px up.

Status: complete. hero_images is a JSON column next to hero_image, which the home cards keep
using, and each entry carries its own Italian alt text, so a service with no collage keeps the
old single photo behaviour. The Matrimonio dropdown is a disclosure button with aria-expanded
and aria-controls that closes on Escape, on a click outside and when the focus leaves it; under
1024px the button becomes a heading and the seven services stay visible inside the menu panel.
Checked in headless Edge on the dev build: the three pages render their photos with no broken
image and no console error, the collage is one row of four square tiles from 820px up and a 2x2
grid at 375px, no horizontal scroll at 375, 820 and 1280px, the dropdown follows its links and
closes itself, and the 404 page still lists every header link. The 18 API tests stay green and
`npm run seed` imports the schema, the seed and the gallery without errors.

## 7. Global definition of done

- Site loads fast on mobile and shows the shop vibe: warm apricot, cream, real photography.
- Every fact, price and text in this roadmap is represented in the database and visible on the
  site.
- Contact form stores messages and the shop phone, email and address are visible on every page.
- SEO checks from section 5.4 all pass.
- AGENTS.md rules respected in every file of the repository.

## 8. Risks and open questions

- Photo licensing and quality: assets come from the shop own website, they may need recompression
  or replacement with new shots.
- The map is a static image today, decide between an embedded map provider or a static map with
  a link to directions.
- No CMS planned, content changes go through SQL updates, confirm the shop accepts that.
- Confirm whether funeral flowers and seasonal offers (San Valentino, Pasqua, Natale) deserve
  their own sections, the old keyword list suggests they do.
- Confirm the preferred analytics tool before Session 6.
