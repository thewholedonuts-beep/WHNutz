# +U — unified web entry

This repository is the public deployment root for **wenevergonnaclose.com**.

## Experience map

- **+U entry:** https://wenevergonnaclose.com/
- **+U Movement brochure companion:** public-facing brochure guidance now lives on the landing page so the print flow and site flow stay aligned
- **TNC — The Nurtured Chef**
  - main site: https://thenurturedchef.com/
  - foundation: https://thenurturedchef.foundation/
  - chef store: https://thenutur3dchef.com/
- **AWD — Whole Donuts**
  - main site: https://wholedonuts.app/
  - community & cause: https://wholedonuts.org/
  - .buzz store: https://wholedonuts.buzz/

The persistent side rail keeps TNC and AWD available throughout the entry experience. Each branch also exposes a fixed branch-specific e-store link in the footer when its section is active.

## Public behavior

- The landing page includes Movement brochure structure, print guidance, and public contact information so the brochure can point directly back to the site.
- The `?u=` query parameter restores a previously issued +U pass into the local browser storage for returning visits.
- QR images are rendered through a third-party QR image service only when a visitor explicitly requests one from the page.

## Repository responsibilities

- `WHNutz` is the public source of truth for the `wenevergonnaclose.com` landing experience, root static site, and GitHub Pages deployment.

## GitHub Pages

Publish from the `main` branch repository root after merging this change. The `CNAME` file binds the site to `wenevergonnaclose.com`.

## Porkbun DNS

Use these records for the root deployment:

| Type | Host | Answer | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | thewholedonuts-beep.github.io | 600 |

No `tnc` or `awd` DNS records are required: the branches use `#tnc` and `#awd` routes on the primary domain, which avoids extra certificates and fragmented deployments.

Only publish the four GitHub Pages apex A records and the `www` CNAME listed above for the public entry domain.
