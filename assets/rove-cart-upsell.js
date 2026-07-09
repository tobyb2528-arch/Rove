/*
 * Companion to the rove-cart-upsell section. The actual add-to-cart request is
 * handled entirely by Dawn's <product-form> (product-form.js) — it already
 * hits /cart/add.js, refreshes the cart drawer/notification + cart-icon-bubble,
 * and publishes PUB_SUB_EVENTS.cartUpdate. This element only reacts to that
 * event to refresh two things product-form.js doesn't know about: itself (so
 * an added product's card disappears) and the cart page's totals/checkout
 * footer (so the subtotal reflects the new line without a page reload).
 *
 * Only active when rendered with a section_id (the cart page). Inside the
 * cart drawer, Dawn's own full-drawer re-render already covers both cases, so
 * no data-section-id is set there and this class no-ops.
 */
class RoveCartUpsell extends HTMLElement {
  connectedCallback() {
    this.sectionId = this.dataset.sectionId;
    if (!this.sectionId) return;

    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, () => {
      this.refreshSelf();
      this.refreshCartFooter();
    });
  }

  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) this.cartUpdateUnsubscriber();
  }

  refreshSelf() {
    fetch(`${routes.cart_url}?section_id=${this.sectionId}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const updated = html.querySelector('rove-cart-upsell');
        if (updated) {
          this.replaceWith(updated);
        } else {
          // Nothing left to offer (every product is now in the cart).
          this.remove();
        }
      })
      .catch((e) => console.error(e));
  }

  refreshCartFooter() {
    const footer = document.getElementById('main-cart-footer');
    if (!footer || !footer.dataset.id) return;

    fetch(`${routes.cart_url}?section_id=${footer.dataset.id}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const updated = html.getElementById('main-cart-footer');
        if (updated) footer.innerHTML = updated.innerHTML;
      })
      .catch((e) => console.error(e));
  }
}

customElements.define('rove-cart-upsell', RoveCartUpsell);
