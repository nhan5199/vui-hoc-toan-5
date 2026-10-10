# Static assets

- `images/`: illustrations, UI media, document page images.
- `files/`: PDFs, presentations, videos and source documents.
- `icons/`: UI icons.
- `catalog/`: generated grouped catalogs, split by textbook/resource section.
- `previews/`: generated content-hashed WebP pages and covers; ignored by Git.
- Start/build run `npm run assets:optimize`; unchanged files reuse their variants. Keep original downloads.
- Run `npm run assets:generate` after adding/removing media. Start/build do this automatically.
- Inspect directory names/counts before opening files. Never include full catalogs or binary content in agent context.
- Preserve media paths: components and imported curriculum may refer to them directly.
- Legacy `images/image-paths.json` and `files/file-paths.json` are not runtime sources.
  Old root generator commands delegate to the new generator.
