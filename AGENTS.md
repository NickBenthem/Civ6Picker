# Repository Guidelines

This document guides contributors and AI agents working on this project.

## Project Structure & Module Organization
- Frontend React/TypeScript code lives in `src/` (entry: `src/main.tsx`, root component: `src/App.tsx`).
- Reusable UI and logic are in `src/components/`, `src/hooks/`, `src/utils/`, and `src/lib/`.
- Static leader and civilization data is built from `supabase/data/civ6leaderdata.json` into `src/data/leaders.ts` and sent to clients on initialization.
- Static assets for builds are in `public/` and `dist/`.
- Supabase config, SQL migrations, and legacy edge functions live under `supabase/`. Supabase is used only as a realtime event bus (no game state is stored in its database).

## Build, Test, and Development Commands
- `npm run dev` — Start the Vite dev server.
- `npm run build` — Create a production build in `dist/`.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint on the project.

## Coding Style & Naming Conventions
- Use TypeScript (`.ts`/`.tsx`) for new code; avoid adding new `.js` files.
- Prefer React function components in `PascalCase` (e.g., `BanStageHeader.tsx`) and hooks in `camelCase` starting with `use` (e.g., `useLeaders.ts`).
- Use 2-space indentation; keep imports sorted logically (React, libs, local).
- Run `npm run lint` before sending a PR; fix or justify any warnings.

## State & Realtime Architecture
- Leaders and civ metadata are static and come from `src/data/leaders.ts`; do not re-add database queries for this data.
- Lobby and ban state are stored client-side per browser (see `src/hooks/useLeaders.ts` and `src/utils/lobbyStateStorage.ts`) and synced between clients via Supabase Realtime channels.
- User presence uses Supabase Realtime Presence only; avoid writing to Supabase tables from the frontend.

## Testing Guidelines
- Co-locate tests with source files using `.test.ts` or `.test.tsx` (e.g., `src/utils/lobbyUtils.test.ts`).
- Prefer small, focused tests that cover lobby state, persistence, and Supabase integration behavior.
- When relevant, add tests alongside new utility or hook code and verify all tests pass.

## Commit & Pull Request Guidelines
- Write clear commit messages in imperative mood (e.g., "Add reconnection manager for lobbies").
- Keep changes scoped: UI changes, Supabase migrations, and utility updates should be in distinct commits when possible.
- Pull requests should include a short description, screenshots or GIFs for UI changes, and references to any related issues or tickets.
