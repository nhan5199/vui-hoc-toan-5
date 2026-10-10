# Project map

| Work | Start here |
| --- | --- |
| Routes and lazy code loading | `src/app/app.routes.ts`, feature `*.module.ts` |
| Firebase quota / data fetching | `src/app/services/`, `src/app/shared/bai-*.service.ts` |
| Textbook screens | `src/app/canh-dieu/`, `ket-noi-tri-thuc/`, `chan-troi-sang-tao/` |
| Textbook documents | `src/app/components/book-detail/` |
| Shared resource lists | `src/app/components/resource-library/` |
| Teacher search / downloads | `src/app/teacher-library/` |
| Student guided entry | `src/app/student-home/` |
| Optimized page/cover images | `scripts/optimize-previews.cjs`, `services/preview.service.ts` |
| Reading content | `src/app/danh-sach-bai-doc/` |
| Tests / question types | `src/app/bai-kiem-tra/`, `components/question-types/` |
| Games and teaching tools | `src/app/tai-nguyen/` |
| Document rendering | `components/flip-book/`, `xem-pdf/`, `xem-slide/`, `slide-display/` |
| Asset indexing | `scripts/generate-asset-catalog.cjs`, `services/asset-catalog.service.ts` |

Application code stays grouped by feature. Static media stays under `public` so existing
Vietnamese paths and download links remain stable. Metadata lives in generated catalogs,
not TypeScript. Scripts and operational documentation have separate directories.

The generator stores each directory once, then its filenames, and splits page-image
metadata by section. Only common metadata and file paths load at startup; textbook/resource
page paths load before their routes open. This does not fetch the images themselves.

For small Codex tasks: read root guidance, locate the feature in this table, inspect its
scoped instructions, search that directory, and run relevant validation. Avoid global
catalog dumps and unrelated feature reads. These practices reduce context consumption;
they cannot guarantee a particular Codex quota cost.
