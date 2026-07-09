# Rove — Products Reference

Companion to CLAUDE.md. Documents the products in the store and how Claude Code should treat them. Follow CLAUDE.md conventions (rove- prefix, design tokens, mobile-first, honesty guardrails) for anything built around these products.

**Store model:** Hero-product store. The cooler is the star. The other three products are SUPPORTING / UPSELL items — surfaced through cart upsells and a bundle, NOT given equal billing on the homepage. Do not turn the store into a sprawling catalogue or let the upsell products compete with the cooler for attention.

---

## Hero product (the store leads with this)

**The Rove Cooler Pack** — insulated 30-can backpack cooler
- Handle: `the-rove-cooler-pack-insulated-30-can-backpack-cooler-leakproof-hands-free`
- Role: hero. Homepage focus, main product page, primary ads.
- Price: £37.99
- This is the product every other product supports. It gets the spotlight everywhere.

---

## Upsell products (supporting — used ONLY as upsells / bundle components)

These three exist to raise average order value. They appear in the cart upsell ("Complete your day out") and in the Day Out Kit bundle. They are secondary: they must never overshadow the cooler, crowd the checkout flow, or appear on the homepage as co-heroes.

### 1. Reusable Ice Packs (Set of 4)
- Handle: `4pcs-ice-packs-reusable-gel-freezer-ice-blocks-for-air-conditioner-fan-cooler-pack-water-injection-picnic-travel-food-storage`
- Role: **primary cart upsell.** Cheapest, highest-attach add-on.
- Price: £8.99
- Variant: single variant — set of 4, large flat blocks (18 x 11.5 x 3cm). No size dropdown.
- One-line (for upsell card): "Reusable gel ice packs, set of 4. Keep drinks cold for hours, no melty mess."

### 2. Insulated Bottle (stainless steel, straw lid)
- Handle: `600-750ml-thermos-bottle-with-straw-stainless-steel-car-thermal-cup-sports-water-bottles-keeps-cold-and-heat-thermal-mug`
- Role: cart upsell + optional bundle add-on.
- Price: £16.99–19.99 (600ml) / £19.99–22.99 (750ml)
- Variants: 2 sizes (600ml, 750ml) × 2–3 on-brand colours (black, grey, green). Supplier "TYESO" branding removed.
- One-line: "Insulated stainless steel bottle. Keeps drinks cold up to 12 hours."

### 3. Waterproof Picnic / Camping Blanket (200x210cm)
- Handle: `200-210-waterproof-pocket-beach-blanket-folding-camping-mat-mattress-portable-lightweight-mat-outdoor-picnic-mat-sand-beach-mat`
- Role: cart upsell + bundle component.
- Price: £16.99–21.99
- Variants: 1 size (200x210cm) × 1–2 earthy colours (army green ± one neutral). Supplier "LISM" branding removed.
- One-line: "Large waterproof blanket. Dry ground for beach, park, festivals and camping."

---

## Bundle

**The Rove Day Out Kit** = Cooler + Ice Packs (set of 4) + Blanket
- Bundle price: ~£57.99 (a genuine saving vs. ~£65.97 bought separately).
- Only show a "was" / "separately" price if it's the real sum of the individual prices — never a fabricated inflated RRP.

---

## How Claude Code should treat these

- **Stay on theme.** All upsell UI uses Rove's design tokens (cream #F1EDE3 base, earthy/natural palette, display + body fonts) and the rove- prefix. The upsell section must look like part of Rove, not a generic app widget.
- **Upsell placement.** Build the upsell as a cart-drawer / cart-page section titled "Complete your day out" showing the three supporting products as compact cards (image, name, price, Add button). Adding uses Dawn's cart AJAX API and refreshes cart + header count without leaving the page.
- **Don't overshadow the hero.** The cooler stays the star. Upsell products do not appear as homepage co-heroes and must not interrupt or crowd the checkout CTA — the single primary "Checkout" button stays dominant.
- **Hide already-in-cart items.** Don't show a product in the upsell if it's already in the cart.
- **Pull data dynamically** by handle from Shopify (image, name, price) — do not hardcode prices/images, so the store stays correct if they change.
- **Handles must be real.** If a handle doesn't resolve, flag it rather than guessing.
- **Honesty guardrails (per CLAUDE.md).** Use only genuine Shopify product data. No fabricated claims, no fake reviews, no invented specs. All supplier branding (FORICH, TYESO, LISM) must be absent from customer-facing content.

---

## Open items
- All four Shopify handles are now filled in. ✓
- Confirm final bottle colours + exact on-brand hex values (palette still being finalised in CLAUDE.md).
- Confirm real landed costs before locking prices.

## Store
- Store URL: `autods-user-store-11860.myshopify.com`
- Note: current supplier-style handles are long and keyword-stuffed (inherited from AutoDS import). They work fine for the upsell, but you may later want to shorten them in Shopify for cleaner URLs (e.g. `rove-ice-packs`). If you do, update the handles in this file to match.
