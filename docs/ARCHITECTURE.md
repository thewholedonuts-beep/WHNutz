# Architecture

TheWholedonuts Universe is a workspace monorepo.

- `shared` exposes reusable primitives used by packages/apps.
- `emotional-intelligence` processes user mood/input into actionable output.
- `web-ui` transforms engine output into user-facing content.
- `api` wraps engine behavior for service endpoints.
- `cli` allows command-line interaction with the same processing pipeline.
- `apps/web` and `apps/dashboard` compose package APIs for runtime apps.
