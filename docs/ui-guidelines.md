# Shared cartoon UI

Use the `--ui-*` tokens in `src/styles.css`: cream surfaces, blue accents, dark blue
text, yellow highlights, rounded lettering, and 22px cards. Reuse `ui-card`,
`ui-button` (or `ui-button secondary`), `ui-badge`, and `ui-alert` for new shared UI.
Keep illustrations in menus and empty states; leave document pages undecorated.

- Inputs use white 28px pill shapes with bright blue borders/text. Dropdowns and
  search fields share the reference's blue magnifier badge. The badge is decorative;
  dropdowns retain native selection and keyboard behavior. There is no external
  click outline; focus changes the border and inner highlight.
- Buttons and links keep visible keyboard focus and touch targets of at least 48px.
- Avoid layout changes on hover; use a small transform and short transitions.
- Honor reduced motion. Skeletons reserve card space; never make them focusable.
- Keep route loading separate from list skeletons and per-page/preview loading.
- Persist only public UI preferences (teacher filters and reading position), never
  student answers or account data. Handle unavailable or malformed browser storage.
- Verify reader controls, filter wrapping, and download labels at 375px width.
