# Shared textbook resource list

- The four `book-detail` route components are small compatibility wrappers. Implement list changes here.
- `ResourceKind` drives card/viewer choices; preserve Vietnamese labels and existing download URLs.
- Use `getFilesPage`, never `listAll` or automatic pagination loops. Cancel old filter subscriptions with `switchMap`.
- Render loading/error/empty states from request results and retain already loaded cards when appending.
- Normalize paths in services. `legacyPath` is only the adapter for existing buttons.
- Validate e-book, semester changes, week changes, retries and load-more; use `npm run test:smoke` after a build.
