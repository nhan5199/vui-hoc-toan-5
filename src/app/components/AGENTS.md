# Shared UI

Find the relevant component with `rg --files src/app/components -g '*<name>*'`.
Book lists live in `book-detail/`; document viewers are `flip-book/`, `xem-pdf/`,
`xem-slide/`, and `slide-display/`.

- Slides request the active image; flip books request nearby pages.
- Scrolling document images use visibility-based loading. Never add all-page preloading.
- Shared lists live in `resource-library/`; typed catalog previews in `resource-preview/`.
- Set loading states from request outcomes. Handle failure and empty results.
- Asset metadata is ready before routed components initialize; do not embed path arrays.
- For route changes, verify deep links and parameter changes, not only home-page navigation.
