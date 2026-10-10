# Firebase usage and operation

## Implemented

- After a billing/access change, resource retry clears the folder's cached pages,
  listing and download URLs, then requests fresh links. Normal navigation retains
  bounded cached reads. `node scripts/browser-smoke.cjs --live-storage` checks two
  real teaching collections and small range downloads; ordinary smoke tests mock
  blocked Storage to verify local-preview fallback.
- A billing-related URL error receives one fresh request after 800ms to handle
  brief post-upgrade propagation. Persistent errors retain the preview fallback;
  there are no unlimited retry loops.

- No question-bank fetch on app startup. Review screens request it and handle errors.
- Questions, reading content, annotations and test banks use one-shot SDK reads.
- Public data persists in a one-hour browser cache. Concurrent reads of a key share one request.
- Failed reads are not persisted; blocked/full browser storage falls back to network reads.
- Successful reading/test imports invalidate the affected browser cache.
- Local document folders use generated file paths and same-origin downloads.
- Remote-only folders retain cached Storage listing/URL fallback; metadata requests per file were removed.
- The four shared textbook resource screens use Storage `list` with 24 results
  and continuation tokens, resolving URLs only for that page. Changing filters
  unsubscribes obsolete UI work. Uploads invalidate affected paginated caches.
- The teacher catalog searches local metadata and downloads from the same origin;
  it does not enumerate the remote bucket.
- Slide views request the active image, flip books a nearby window, scrolling documents lazy images.

## Remaining boundaries

A failed remote URL no longer discards its whole file page. Local preview cards
appear immediately while originals resolve, and remain usable if listing/URL
requests fail. Missing originals have no download link. Partial/failed pages are
not persisted, so retry can restore downloads after Storage access is repaired.
This restores local previews, not missing original DOCX/PPTX files.

The cache is browser-local. Other browsers may show old content for up to one hour after
an import. It is for public curriculum only. A first visit to review/test still downloads
the respective full bank; reducing that first download requires a verified data schema
and separate topic summaries/topic exercise nodes, plus a migration and indexes.

Local folders are authoritative when present. Remote-only additions to an existing local
folder will not appear until copied into `public/files` and the catalog rebuilt. Uploads
still target Storage. Do not mix local and remote publishing without documenting that choice.

The app uses an `appspot.com` Storage bucket. Firebase states that Blaze is required to
maintain Storage access starting February 3, 2026:
https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024
Caching does not restore a bucket disabled by billing/quota limits. No billing changes,
production data migrations, or rule deployments are performed by these repository changes.

## Verify against the actual project

1. In Firebase console, identify the exact service/error: Realtime Database downloaded
   bytes, Storage download quota, or Storage billing-plan restriction.
2. Record Database Usage downloaded bytes and connections before/after rollout.
   https://firebase.google.com/docs/database/usage/monitor-performance
3. In browser Network, home should make no `questionAnswer` request. Open review:
   one initial read, no duplicate concurrent download, no fresh download on reload within one hour.
4. Open a local textbook folder: no Storage list/metadata request. Download a local file.
5. Turn book pages/slides and check only current/nearby images download; scroll PDF pages
   to confirm later images request as they approach the viewport.
6. Test a remote-only folder, empty folder, network error, browser storage disabled,
   and successful import followed by rereading affected content.

If first-read bandwidth still dominates, export the schema through an authorized admin
workflow, separate summaries from exercises, paginate large lists, and add query indexes.
Do not guess production structure or broadly download the database for inspection.
https://firebase.google.com/docs/database/usage/optimize
