# Vui học Toán 5

Angular 18 application for Grade 5 mathematics and teaching resources.

Install dependencies with `npm ci`. Run `npm start` to serve
at `http://localhost:4200`, or `npm run build` for production output under
`dist/vui-hoc-toan-5`. Start/build generate catalogs, optimized WebP pages and
small covers automatically. The first media build takes longer; unchanged variants
are reused on subsequent builds and excluded from Git.

Run `npm run assets:generate` after changing media. Run `npm run assets:verify`
to check catalog coverage and file existence. Run `npm run test:cache` for Firebase
cache behavior (requires Chrome).
Use `npm run assets:optimize` to regenerate image variants and their metadata.

Run `npm run test:performance` for cache, file-request and document loading checks.
After a production build, `npm run test:smoke` checks the main local document flows
in headless Chrome or Edge on Windows (Node 22+). It does not publish the app.

- [Project map and focused work guidance](docs/project-map.md)
- [Firebase usage changes and verification](docs/firebase-usage.md)
- [Repository agent instructions](AGENTS.md)

Media stays in `public/images`, `public/files`, and `public/icons`. Generated
catalogs in `public/catalog` replace the large embedded TypeScript path lists.
Common metadata loads at startup; page-image metadata loads per feature route.
Static documents are served locally when a matching local folder exists.

Open `/giao-vien` for searchable resources and original downloads, or `/hoc-sinh`
for guided textbook/practice/game entry points. The main textbook resource lists
share one component and request remote files in pages of 24.

Firebase configuration is in `src/app/shared/constants/firebase.ts`.
Public curriculum reads are cached for one hour. Billing, backend migration,
production usage measurement and deployment require access to the Firebase project.
