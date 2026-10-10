# ContentPilot

An open-source AI content strategy platform for real estate agents, creators, and small businesses.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/contentpilot run typecheck` — typecheck the web app
- Required for live generation: `ANTHROPIC_API_KEY` as a server-side secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/contentpilot/` — ContentPilot landing page and strategy generator
- `artifacts/api-server/src/routes/generate.ts` — server-side Claude request and response validation
- `lib/api-spec/openapi.yaml` — source of truth for API contracts
- `lib/api-client-react/src/generated/` and `lib/api-zod/src/generated/` — generated API hooks and schemas

## Architecture decisions

- Strategy generation is stateless; this MVP intentionally has no accounts, payments, or database.
- The Anthropic API key is used only by the API server and must never be exposed to the browser.
- If the key is missing, `/api/generate` returns a setup-required error; no placeholder strategy is returned.

## Product

Visitors can learn about the product on `/` and generate a platform-specific social content strategy on `/app` after `ANTHROPIC_API_KEY` is configured.

## User preferences

- Keep setup steps clear for someone new to coding.
- Keep the product positioned as an early-stage open-source AI content strategy platform, not a generic AI writing chatbot.

## Gotchas

- After changing `lib/api-spec/openapi.yaml`, run API codegen before using the generated types.
- To enable live Claude calls, add `ANTHROPIC_API_KEY` in Replit's Tools → Secrets pane and restart the API Server workflow.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
