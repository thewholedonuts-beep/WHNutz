# TheWholedonuts Universe

Unified monorepo for thewholedonuts ecosystem.

## Workspace layout

- `shared/` common components, hooks, models, constants, and utilities
- `packages/emotional-intelligence` Do-Nutz emotional engine
- `packages/web-ui` reusable UI layer
- `packages/api` service/API layer
- `packages/cli` command line tools
- `apps/web` main web app
- `apps/dashboard` admin dashboard

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

## How it connects

- Web UI uses `@thewholedonuts/shared` + `@thewholedonuts/emotional-intelligence`
- API services use `@thewholedonuts/emotional-intelligence`
- CLI and apps compose package APIs
- Root tests validate integration points across packages

## Quick start

```bash
npm install
npm run build
npm test
```

## Legacy static site

The original static site files (`index.html`, `styles.css`, `app.js`, `CNAME`) are preserved at repository root for current GitHub Pages compatibility.
