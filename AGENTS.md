<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## API conventions

Read `.agents/api-structure.md` before changing API, auth, storage, normalize, or query code. The short version:

- All HTTP access lives in `src/api/<domain>/api/`; no `src/lib/api`.
- `src/lib` is for pure helpers: `storage`, `auth`, `driver` normalize/format, `mock`.
- Endpoint files export `<verb><Noun>API`, use `authApi`/`noAuthApi`, and never unwrap the envelope.
- Reusable query/mutation hooks go in `src/api/<domain>/tanstack/`; page-specific orchestration stays in `app/**/_hooks`.
- Run `npx tsc --noEmit`, `npm run lint`, and `npm run build` after API changes.
