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
