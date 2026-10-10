# Loading and display behavior

- Resource lists show skeleton cards while metadata loads; append requests keep
  existing cards visible. Route transitions retain the full-screen loader.
- Textbooks use a single-page reader on screens up to 800px, with horizontal swipe,
  100–250% zoom, page jump and count. Desktop retains animated spreads. Only visible
  pages and the next two are requested; reading position is saved per book locally.
- Teacher filters survive reopening on the same device, including a downloadable-only
  option. Cards label format, size, download availability and preview availability;
  unavailable previews/downloads do not render misleading action links.
- Shared cartoon tokens and usage are documented in `docs/ui-guidelines.md`.

- Inputs, dropdowns, textareas and file pickers share white pill fields with
  blue borders/text and rounded lettering in `src/styles.css`. Dropdowns and search
  fields use the blue magnifier badge from the input reference.
  Focus uses a darker border and inner highlight without an external outline.
  Keep component styles focused on layout;
  preserve focus, invalid, disabled and mobile states. Radio, checkbox, range and
  color controls retain their native interaction and dimensions.

- Route navigation and catalog loading show the existing full-screen loader.
- A shared `ResourceLibraryComponent` serves four textbook document routes. Lists
  request 24 files per page, cancel obsolete subscriptions when filters change;
  loaders stop on completion/error, with retry controls for failed requests.
- File-folder lookup uses an index; cover lookups reuse cached matches and return
  copies so viewers cannot corrupt shared paths while sorting or transforming them.
- Remote-only folders resolve at most six Storage URLs simultaneously. Requests
  time out instead of leaving file loaders visible indefinitely.
- Scrolling document pages reserve layout space, request nearby images, and keep
  a per-page loader until decoding completes. Failed pages offer retry.
- Flip books prioritize the visible cover/spread, then prefetch the next two pages.
  The cover never waits for a hidden page, and page turns never hide the whole book.
  Outgoing images stay mounted during the 420ms turn; offscreen images are removed.
- Build-generated WebP pages fit within 1600×2000 and covers within 400×500.
  Original documents remain available for downloads. Variants are used only when
  smaller than their sources, with encoded original-image fallbacks.
- Slides render the active image instead of a hidden image element for every slide.
- File cards retain their design with shorter, explicit transitions. Hover does
  not change padding; click feedback uses scale. Focus and reduced-motion states
  are supported, and clickable div cards accept Enter/Space.
- Worksheet download icons use real download links; downloading does not open
  the preview. Existing Vietnamese media URLs are retained.

## Validation

`npm run build`, `npm run test:performance`, `npm run assets:verify`.
On Windows with Chrome/Edge and Node 22+, `npm run test:smoke` serves the build
locally and checks home, textbook preview/page turns, and scrolling slide previews.
It uses an isolated temporary browser profile under ignored `.angular/`.
It also verifies teacher search, bounded cards, a real original-document download,
the shared lazy preview and the student entry point. Screenshots are saved under
`.angular/` for inspection.

## Teacher and student entry points

`/giao-vien` searches the generated public resource catalog, including accent-free
Vietnamese search. Filters cover textbook, document category, semester, week and
file format. Cards show sizes, previews and direct original downloads. Rendering
starts with 24 cards and increases only through “Xem thêm tài liệu”. Remote-only
collections remain reachable through the category links; they require Firebase
access and are not claimed to be fully indexed in the local catalog.

`/hoc-sinh` offers three guided steps: read the selected textbook, practise with
exercises, and explore learning games. Both entry points are linked from home.

## Media build workflow

`npm run assets:optimize` regenerates metadata and content-hashed WebP variants.
Start/build invoke it automatically. First generation processes the existing page
images; later runs reuse unchanged outputs. `public/previews/` is ignored by Git
to avoid duplicating thousands of binary assets in the repository. Generated
catalogs describe stable IDs, content versions, sizes, textbook/category/semester/
week metadata, exact preview folders, covers and original download URLs.

Home loads common UI metadata only. Detailed resource metadata loads when a
library opens; textbook and slide page indexes load only for relevant routes.
Preview images and original documents are separate assets: lazy loading reduces
browser transfer, while the original files still contribute to deployment size.

Measured over 13,907 generated page images: originals total 6,996,149,134 bytes;
chosen previews total 1,836,101,698 bytes, a 74% reduction. The Cánh Diều SGK
Tập 1 cover changes from 545,481 to 137,952 bytes; its thumbnail is 26,686 bytes.
A local Chrome smoke run showed that cover ready in 428ms with 100ms latency
and 6Mbps throughput. These are local measurements, not production timings.

194 existing RARs share one content hash and contain only an empty `tuan-1`
directory, verified using archive listings. `scripts/empty-archive-hashes.json`
marks this known payload as a placeholder. The teacher search excludes it;
file services skip these local copies and retain the remote fallback. Replace
them with real materials before claiming those teaching collections are published.

Some electronic lesson-plan and teaching-plan download folders exist only in
Firebase Storage even though preview images exist locally. Those file lists still
require working Firebase Storage access; a code optimization cannot restore a
bucket disabled by billing/quota restrictions. Public curriculum cache freshness
and Firebase account verification are described in `firebase-usage.md`.

## Suggested next priorities

1. Restore custom-domain HTTPS and verify production Firebase access before sharing
   the site with students. Review rules for teacher/admin imports and uploads.
2. Give teachers a searchable resource library with textbook, term, week/topic,
   file-type filters, file size, preview, and a consistent direct download action.
3. Provide separate student and teacher entry points: guided practice for students,
   lesson resources and printable materials for teachers.
4. Create small thumbnails and optimized web image variants while preserving
   original downloadable documents. This reduces bytes per image beyond lazy loading.
5. Split question-topic summaries from exercises so first-time visitors retrieve
   only the topic they choose; plan a verified backend migration rather than guessing
   the production schema. Add usage measurements to confirm real quota savings.
6. Test tablets, slow connections, readable mathematical notation, large touch
   targets, keyboard navigation and classroom projector layouts with actual users.
