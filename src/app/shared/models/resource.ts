/** Generated public metadata. Original documents remain the download source. */
export interface Resource {
  id: string;
  name: string;
  title: string;
  folder: string;
  textbook: string | null;
  kind: string;
  semester: string | null;
  week: number | null;
  extension: string;
  sizeBytes: number;
  version: string;
  downloadUrl: string;
  previewFolder: string | null;
  thumbnailUrl: string | null;
  status: 'published' | 'placeholder';
}
