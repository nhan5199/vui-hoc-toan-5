import { Injectable } from '@angular/core';

/** Shared preview lookup for flip books, scrolling PDFs and slides. */
@Injectable({ providedIn: 'root' })
export class PreviewService {
  private paths = new Map<string, string>();
  private thumbnails = new Map<string, string>();
  register(manifest: { pages?: Record<string, string>; thumbnails?: Record<string, string> }): void {
    for (const [source, preview] of Object.entries(manifest.pages ?? {})) this.paths.set(source, preview);
    for (const [source, preview] of Object.entries(manifest.thumbnails ?? {})) this.thumbnails.set(source, preview);
  }
  thumbnail(source: string): string { return this.thumbnails.get(this.key(source)) ?? this.url(source); }
  url(source: string): string {
    const key = this.key(source);
    return this.paths.get(key) ?? key.slice(7).split('/').map(encodeURIComponent).join('/');
  }
  private key(source: string): string {
    let decoded = source;
    try { decoded = decodeURIComponent(source); } catch { }
    return decoded.startsWith('public/') ? decoded : 'public/' + decoded.replace(/^\/+/, '');
  }
}
