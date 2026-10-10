# Data and asset services

- Read `docs/firebase-usage.md` for cache behavior and remaining quota constraints.
- `read-cache.service.ts`: one-hour public browser cache and concurrent request sharing.
- `database.service.ts`: review questions, fetched only on demand.
- `file.service.ts`: local catalog first, cached Storage fallback. A matching local folder is authoritative; remote-only additions in that folder require rebuilding the catalog.
- `asset-catalog.service.ts`: common catalog at bootstrap, section catalogs through route resolvers.
- Detailed resource metadata loads on demand. `preview.service.ts` selects optimized pages and small covers.
- Known empty archives are marked placeholders and excluded from local downloads; retain remote fallback.
- Cache failed requests must be retryable. Successful writes must invalidate the affected cache.
- Preserve the interfaces used by feature components. Avoid broad service rewrites unrelated to the task.
