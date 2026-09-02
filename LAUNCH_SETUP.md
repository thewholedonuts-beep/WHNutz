# Legacy deployment boundary

`WHNutz` is a preserved public static experience, published at [thewholedonuts-beep.github.io/WHNutz/](https://thewholedonuts-beep.github.io/WHNutz/). The maintained public entry is [wenevergonnaclose.com](https://wenevergonnaclose.com/), deployed by `thewholedonuts-beep/wholedonuts-universe`.

## Do not configure this repository as the canonical site

- Do not add a `CNAME` file or change the custom-domain configuration here. The canonical repository owns the verified custom domain.
- `auth-config.js` intentionally contains no project URL or key. Do not add credentials, service-role keys, payment secrets, or personal data to this public repository.
- The included Supabase migrations are retained for historical provenance only. Do not apply them from this repository. Any future authentication, award, or contribution flow needs an owner-approved privacy, retention, access-control, and human-review design in the canonical repository.
- Do not send visitor identifiers to QR-generation services. The legacy page only generates a browser-local link that a visitor may choose to copy.

## Safe external handoffs

The maintained-site link uses HTTPS and points to the canonical entry. The Goods Window remains browse-only because `storefront-config.js` is empty. Do not configure an external storefront until its HTTPS destination, products, fulfillment, returns, taxes, and privacy terms are independently verified. Cash App is optional support, separate from any merchandise purchase, and opens an external provider under that provider's terms.

This repository does not configure DNS, URL forwards, email records, or indexing. Preserve all such operational settings in the responsible owner-managed environment.
