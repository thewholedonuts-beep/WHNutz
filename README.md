# +U — unified web entry

This repository is the public deployment root for **justplususa.org**.

## Experience map

- **+U entry:** https://justplususa.org/
- **TNC — The Nurtured Chef**
  - main site: https://thenurturedchef.com/
  - foundation: https://thenurturedchef.foundation/
  - chef store: https://thenutur3dchef.com/
- **AWD — Whole Donuts**
  - app entry: https://wholedonuts.app/
  - community/cause: https://wholedonuts.org/
  - store: https://wholedonuts.buzz/

The persistent side rail keeps TNC and AWD available throughout the entry experience. Each branch also exposes a fixed branch-specific e-store link.

## Repository responsibilities

- `WHNutz` (this public repository): root static site and GitHub Pages deployment.
- `wholedonuts-universe` (private): preserved Porkbun integration, funnel definitions, orchestration code, and operational documentation. It is not a public web server.

## GitHub Pages

Publish from the `main` branch repository root after merging this change. The `CNAME` file binds the site to `justplususa.org`.

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

Do not deploy the `192.168.1.x` addresses in the private funnel configuration to public DNS; those are private placeholder addresses.
