# Working in this repository

Angular 18 standalone app, Vietnamese Grade 5 mathematics. Start with
[docs/project-map.md](docs/project-map.md), then open only the relevant feature.

- Use targeted `rg` searches in `src/app`; do not dump the whole repository.
- Do not read generated catalogs, binary assets, lockfiles, or build output unless the task requires them.
- Keep Vietnamese filenames and existing public URLs intact. Do not move media without updating consumers.
- Firebase reads belong in services. No startup curriculum downloads, unbounded root reads, or new perpetual listeners for static content.
- Cache public curriculum only; no student responses, credentials, or authentication tokens.
- Run `npm run build` after code changes. For cache changes, run the focused cache tests when Chrome is available.
- Do not change Firebase billing, deploy rules, or publish without explicit user authorization.
- Keep task reports short: changed behavior, checks, unresolved constraints. Do not claim measured quota savings without console/network evidence.

See scoped instructions in `src/app/services/AGENTS.md`, `src/app/components/AGENTS.md`,
`src/app/shared/AGENTS.md`, and `public/AGENTS.md` for those areas.
