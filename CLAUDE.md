# CLAUDE.md — Rove Storefront

Project context and working instructions for Claude Code. Read this fully before starting work.

---

## What we're building

A storefront for **Rove**, a new outdoor/adventure gear brand. The launch product is an **insulated backpack cooler** (30-can / 30L). This is a direct-to-consumer e-commerce site whose job is to make the product feel premium and trustworthy, and to convert cold traffic (mostly from TikTok/Instagram, mostly on mobile) into sales.

Full requirements live in `Rove_Store_PRD.md`. Supporting audience detail lives in `Rove_ICP.md`. Read both before building. This file is the quick-start; the PRD is the source of truth for detailed requirements.

---

## Brand

- **Name:** Rove
- **One-liner:** Gear for people who'd rather be outside.
- **Voice:** Confident, effortless, a little wanderlust. Like a well-travelled friend — "throw it in the car and go." Not shouty, not "extreme sports," not corporate.
- **Primary customer:** "The Weekend Adventurer" — 27–40, values experiences, mid price-sensitivity, mobile/social-led, wants gear that looks good and won't let her down.
- **Price positioning:** Premium-mid. Anchor around £39–42. The whole site exists to justify that price vs. near-identical unbranded listings at £15–20.

---

## Design direction

The target quality bar comes from two reference sites:

**Season Three — the model for LOOK & FEEL:**
- Editorial minimalism: big imagery, generous white space, uncluttered.
- Named products with evocative variant names (e.g. "The Rove Cooler Pack — Slate Green"), never "Insulated Cooler Bag Green."
- A benefit-led one-liner directly under the price.
- One bold, honest tip on the product page.
- Collapsed accordions for detail (Description / Specs / Shipping / Returns).
- A single, clear primary CTA — no competing buttons above the fold.

**Huru — the model for TRUST & DETAIL:**
- Guarantee/returns spelled out clearly (covered / not covered / how to claim).
- Transparent, honest shipping info (times, dispatch).
- Specs framed as benefits ("why it matters"), not a raw spec dump.
- Prominent, structured, genuine reviews.
- Clear feature icons.

**The Rove page = Season Three's clean editorial front-end + Huru's trust engine underneath.**

### Visual tokens (starting point — refine as needed)
- Aesthetic: earthy, natural, outdoorsy, premium, modern.
- Palette: natural/earthy base (sand, stone, olive, deep forest green) with one clean accent. Confirm final palette before locking.
- Typography: clean modern sans-serif; can pair with a subtle serif for product names (Season Three style). No script fonts.
- Lots of white space. Large imagery. Minimal borders/shadows.

---

## Pages to build (priority order)

Build in this order. Each is spec'd in detail in `Rove_Store_PRD.md` — follow that for specifics.

1. **Product page** (primary conversion surface, most important):
   hero (large lifestyle image + gallery, product name, price, benefit one-liner, variant/qty selectors, single CTA, one bold honest tip) → "Why Rove" benefit-icon blocks (All-Day Cold · Leakproof · Hands-Free · Built to Last) → detail accordions → lifestyle section → reviews block → footer.
2. **Cart page:** line items, trust reinforcement (secure checkout, returns reminder), single clear "Checkout" CTA, optional free-shipping progress + cross-sell row.
3. **FAQ page:** grouped accordions — Shipping & Delivery, Returns, The Product, Ordering & Payment. Honest, specific answers.
4. **Contact page:** heading "Got a question? We're on it.", warm intro, form (name/email/order#/message), reply-time + returns + order-number reassurances.
5. **Header & footer:** minimal nav (logo, Shop, About, Cart), trust strip, footer links.

---

## Critical rules (do not violate)

These protect the business from angry customers and chargebacks. The reference brands are *real* companies with bespoke products; Rove is dropshipping, so borrow their **presentation and structure, never claims that aren't true.**

- **Leakproof IS confirmed** — state it confidently as a headline benefit.
- **Do NOT invent a "lifetime guarantee," serial numbers, or "our own design" claims.** Those imply bespoke manufacturing Rove doesn't have.
- **Returns policy is NOT yet decided.** Do not hardcode specific return terms. Use a clear placeholder like `[RETURNS_POLICY_TBD]` wherever return terms are needed (FAQ, Contact, Cart, footer) so they're easy to find and fill in later. Flag these spots.
- **Do NOT fabricate reviews or ratings.** Build the reviews component to accept real data; use clearly-labelled placeholder/sample content during development, never fake reviews presented as real.
- **Be honest about shipping times.** Don't write "ships next day" unless true. Use realistic ranges / placeholders.
- **Currency is GBP (£).** UK market. All prices in pounds.
- Any product claim beyond leakproof (hours-cold, capacity) should use figures from the PRD/product data, not invented numbers.

---

## Deployment

- **Platform:** Shopify, built on a **Dawn theme fork** (Dawn provides cart, Liquid, checkout out of the box).
- **Store:** `autods-user-store-11860.myshopify.com`
- **Workflow:** Push to `main` → GitHub auto-sync → deploys to an **unpublished** theme. Going live requires **publishing via Shopify admin**. Page-template dropdowns in admin only read from the *published* theme, so a template won't be assignable until its theme is published.
- **Requirements:** Node.js 18+, Shopify CLI. There is **no local Liquid rendering** — the dev server proxies live store data and needs internet.

## Commands

```bash
shopify theme dev --store autods-user-store-11860.myshopify.com   # Local dev (hot reload, proxies store data)
shopify theme push --unpublished                   # Push to a new unpublished theme
shopify theme push --theme <id>                    # Push to a specific theme
shopify theme list                                 # List themes
```

## Architecture

**Dawn fork** — Dawn owns cart, Liquid, and checkout. We own the **visual layer** via our own prefixed files. Use a consistent prefix (e.g. `rove-`) on all custom sections, snippets, and CSS so our code is clearly separated from Dawn's. Leave Dawn's `settings_schema.json` unmodified unless there's a strong reason.

### Pages (V1 scope)

Build only these at launch. Match the PRD for each page's content/structure.

| Page | Template | Notes |
| --- | --- | --- |
| Product | `product.json` | The primary conversion page: hero → why-Rove blocks → accordions → lifestyle → reviews → bottom CTA |
| FAQ | `page.faq.json` | Needs a Shopify page with handle `faq` assigned to the `page.faq` template |
| Contact | `page.contact.json` | Dawn contact form, restyled + on-brand copy |
| Cart | Dawn cart (`cart.json` / cart drawer) | Restyle Dawn's cart; add trust reinforcement + optional cross-sell |

**Decide up front:** is the product page also the homepage, or is there a simple separate homepage? (Wessel-style single-SKU stores often redirect home → product.) For Rove, confirm before building. Out of scope for V1: blog, collections, lookbook, About (unless PRD says otherwise).

### Key custom sections (prefix `rove-`)

- `rove-product-hero` — Season-Three-style hero. Desktop: gallery left (sticky), info right (scrolls). Right panel order: product name → benefit one-liner → gallery thumbnails → price → variant/qty → CTA → trust bar → bold honest tip.
- `rove-why` — "Why Rove" benefit-icon blocks (All-Day Cold · Leakproof · Hands-Free · Built to Last).
- `rove-product-accordions` — Description / Specs / Shipping / Returns via `<details>/<summary>` with CSS-grid animation.
- `rove-lifestyle` — real-use imagery band with short captions.
- `rove-reviews` — structured, genuine reviews (Huru-style). Accepts real data; never fabricated.
- `rove-header` — text logo "ROVE", nav: Shop / FAQ / Contact / Cart(count).
- `rove-footer` — links + trust strip.

### Key snippets

- `rove-buy-form` — wraps Dawn's `<product-form>`. Must include a `<form>`, `<input name="id">` (variant), a `<button>`, and `{% render 'loading-spinner' %}`.
- `rove-specs-table` — product specs. Start hardcoded for the single SKU; refactor to **metafields** if/when multi-SKU.
- `rove-gallery-desktop` / `rove-gallery-mobile` — thumbnail swap (desktop) / scroll-snap swipe (mobile).
- Use `[RETURNS_POLICY_TBD]` as the literal placeholder token anywhere returns terms appear, so they're greppable.

### JS behaviour

- **Accordions:** desktop (≥ breakpoint) exclusive (one open at a time, first open by default); mobile all-open / multi-select. Animate close with a `--closing` class + safety timeout.
- **Gallery:** desktop thumbnail click swaps main image via `data-media-index`; mobile arrows/swipe via `scrollBy()` / scroll-snap.
- **Cart:** rely on Dawn's `product-form.js` → `PUB_SUB_EVENTS.cartUpdate` → header count updates. Cart type: notification/toast (or drawer — confirm).

## Design system (implementation)

- **Mobile-first.** 70–80% of traffic is mobile social. Price + CTA must be above the fold on mobile.
- **Single breakpoint** (e.g. `1024px`) unless a strong reason for more.
- **CSS:** vanilla, custom properties, `rove-` prefix. Split into `rove-base.css` (tokens + utilities), `rove-product.css`, `rove-header.css`. No CSS framework.
- **Design tokens:** define colour, spacing, font, and nav-height as CSS custom properties in `rove-base.css` so the whole site themes from one place. (Final palette TBC — earthy/natural base + one accent; see PRD.)
- **Performance:** preload fonts (WOFF2), compress images, no heavy JS deps, keep it fast.
- **Accessibility:** semantic HTML, alt text on all images, keyboard-navigable accordions/gallery, sensible contrast.
- **Components stay small and reusable** so pages share building blocks.

---

## Working preferences

- Before big changes, briefly outline the plan.
- Keep components small and reusable; use the `rove-` prefix and match existing patterns in the repo once they exist.
- Where the PRD and this file disagree, the PRD wins on detail — flag the conflict.
- Call out any spot where a business decision is still open (returns, final palette, pricing, product name, homepage-vs-product-page) rather than guessing and burying it.
- Don't add features not in the PRD without flagging them first (no blog, no loyalty program, no heavy animations at launch).
- Use placeholder images with clear filenames where real product photography isn't available yet; keep them easy to swap.

---

## Reference files in this repo
- `Rove_Store_PRD.md` — full requirements for all pages (source of truth).
- `Rove_ICP.md` — ideal customer profile and audience detail.
