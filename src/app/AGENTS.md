# Feature work

Use `docs/project-map.md` to choose a feature folder before searching.

- `home/` and `components/menu/`: navigation and landing screen.
- Textbook roots: category menus; `components/book-detail/`: document lists.
- `tai-nguyen/`: teaching tools and games; review questions are in `game-tuong-tac/cau-hoi-on-tap/`.
- `danh-sach-bai-doc/`: readings and annotations; `bai-kiem-tra/`: test generation and imports.
- Feature `*.module.ts` files contain child routes. Root standalone routes use `loadComponent`.
- Some legacy document buttons expect paths prefixed with `//`. Keep that contract until all consumers are migrated together; services normalize storage paths.
- Avoid touching unrelated feature files. Read templates/styles only for the component being changed.
