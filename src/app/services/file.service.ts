import { Injectable, Optional } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { defer, from, Observable, of, throwError, timer } from 'rxjs';
import { catchError, map, mergeMap, retry, switchMap, tap, toArray, timeout } from 'rxjs/operators';
import Constant from '../shared/constants/Constant';
import { ReadCacheService } from './read-cache.service';
import { AssetCatalogService } from './asset-catalog.service';
import { Resource } from '../shared/models/resource';

export interface FileData {
  name: string;
  url: string;
  resource?: Resource;
  previewFolder?: string;
}
export interface FilePage { files: FileData[]; nextPageToken?: string; unavailable?: boolean; }

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private folders = new Map<string, FileData[]>();
  private localFiles = new Set<string>();
  private indexedCount = -1;
  private indexedResources = false;
  imageFolderPath: string = '';
  imageDownloadUrl: string = '';
  fileName: string = '';

  constructor(private storage: AngularFireStorage, private cache: ReadCacheService,
    @Optional() private catalog: AssetCatalogService | null = null) {}

  refreshFolder(path: string): void {
    path = path.replace(/^\/+|\/+$/g, '');
    if (!path) return;
    this.cache.invalidate('storage:list:' + path);
    this.cache.invalidatePrefix('storage:page:' + path + ':');
    this.cache.invalidatePrefix('storage:url:' + path + '/');
  }

  /** New resource screens request one bounded page, including only its download URLs. */
  getFilesPage(path: string, pageToken?: string, pageSize = 24): Observable<FilePage> {
    path = path.replace(/^\/+|\/+$/g, '');
    if (!path) return of({ files: [] });
    if (this.catalog && !this.catalog.resourceLoaded) return from(this.catalog.loadResources()).pipe(switchMap(() => this.getFilesPage(path, pageToken, pageSize)));
    pageSize = Math.max(1, Math.min(100, pageSize));
    this.indexFiles();
    const resources = this.catalog?.resources.get(path)?.filter(resource => resource.status === 'published');
    const local = resources?.length ? resources.map(resource => ({ name: resource.name, url: resource.downloadUrl, resource }))
      : this.folders.get(path);
    if (local) {
      const sorted = [...local].sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true }));
      const offset = Math.max(0, Number(pageToken) || 0);
      return of({ files: sorted.slice(offset, offset + pageSize), nextPageToken: offset + pageSize < sorted.length ? String(offset + pageSize) : undefined });
    }
    const key = `storage:page:${path}:${pageSize}:${pageToken ?? ''}`;
    return this.cache.read<FilePage>(key, () => this.storage.ref(path).list({ maxResults: pageSize, ...(pageToken ? { pageToken } : {}) }).pipe(
      switchMap(result => from(result.items).pipe(
        mergeMap(item => this.getFileUrl(item.fullPath).pipe(
          map(url => ({ name: item.name, url } as FileData)),
          catchError(() => of({ name: item.name, url: '', previewFolder: this.previewFolder(path, item.name) }))
        ), 6),
        toArray(),
        map(files => ({ files: files.sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true })), nextPageToken: result.nextPageToken ?? undefined }))
      )), timeout(30000),
      tap(page => { if (page.files.some(file => !file.url)) this.cache.invalidate(key); })
    )).pipe(catchError(() => of(this.getLocalPreviewsPage(path, pageToken, pageSize))));
  }

  private previewFolder(path: string, name: string): string | undefined {
    const folder = 'public/images/images/' + path + '/' + name.replace(/\.[^.]+$/, '');
    return Constant.IMAGE_PATHS.images.some(image => image.startsWith(folder + '/')) ? folder : undefined;
  }

  getLocalPreviewsPage(path: string, token?: string, size = 24): FilePage {
    path = path.replace(/^\/+|\/+$/g, '');
    const prefix = 'public/images/images/' + path + '/';
    const folders = new Set(Constant.IMAGE_PATHS.images.filter(image => image.startsWith(prefix))
      .map(image => image.slice(prefix.length).split('/')).filter(parts => parts.length === 2).map(parts => parts[0]));
    const files = [...folders].sort((a, b) => a.localeCompare(b, 'vi', { numeric: true }))
      .map(name => ({ name, url: '', previewFolder: prefix + name }));
    const offset = Math.max(0, Number(token) || 0);
    return { files: files.slice(offset, offset + size), nextPageToken: offset + size < files.length ? String(offset + size) : undefined, unavailable: true };
  }

  setImageFolderPath(path: string) {
    this.imageFolderPath = path;
  }

  getImageFolderPath(): string {
    return this.imageFolderPath;
  }

  setImageDownloadUrl(url: string) {
    this.imageDownloadUrl = url;
  }

  getImageDownloadUrl(): string {
    return this.imageDownloadUrl;
  }

  setFileName(fileName: string) {
    this.fileName = fileName;
  }

  getFileName(): string {
    return this.fileName;
  }

  // Upload file
  uploadFile(filePath: string, file: File): Observable<number | undefined> {
    const task = this.storage.upload(filePath, file);
    return task.percentageChanges().pipe(tap(percent => {
      if (percent === 100) {
        const normalized = filePath.replace(/^\/+|\/+$/g, '');
        const folder = normalized.split('/').slice(0, -1).join('/');
        this.cache.invalidate('storage:list:' + folder);
        this.cache.invalidatePrefix('storage:page:' + folder + ':');
        this.cache.invalidate('storage:url:' + normalized);
      }
    }));
  }

  // Get list of files
  getFilesList(path: string): Observable<FileData[]> {
    if (!path) return of([]);
    path = path.replace(/^\/+|\/+$/g, '');
    if (!path) return of([]);
    if (this.catalog && !this.catalog.resourceLoaded) return from(this.catalog.loadResources()).pipe(switchMap(() => this.getFilesList(path)));
    this.indexFiles();
    const local = this.folders.get(path);
    if (local) return of([...local]);
    const folderRef = this.storage.ref(path);
    return this.cache.read('storage:list:' + path, () => folderRef.listAll().pipe(
      switchMap((result) => {
        if (!result.items.length) return of([]);
        return from(result.items).pipe(
          mergeMap(item => this.getFileUrl(item.fullPath).pipe(map(url => ({ name: item.name, url }))), 6),
          toArray(),
          map(files => files.sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true })))
        );
      }),
      timeout(30000)
    ));
  }

  // Download file
  getFileUrl(filePath: string): Observable<string> {
    filePath = filePath.replace(/^\/+|\/+$/g, '');
    const local = 'public/files/' + filePath;
    this.indexFiles();
    if (this.localFiles.has(local)) return of(this.localUrl(local));
    return this.cache.read('storage:url:' + filePath, () => defer(() => this.storage.ref(filePath).getDownloadURL()).pipe(
      timeout(15000),
      // A just-upgraded bucket may briefly return old billing errors. Retry once only.
      retry({ count: 1, delay: (error: { status?: number; code?: string; serverResponse?: string }) =>
        error.status === 402 || error.code === 'storage/quota-exceeded' || error.serverResponse?.includes('billing account')
          ? timer(800) : throwError(() => error) })
    ));
  }

  private indexFiles(): void {
    const resourcesReady = this.catalog?.resourceLoaded ?? false;
    if (this.indexedCount === Constant.FILE_PATH.files.length && this.indexedResources === resourcesReady) return;
    this.folders.clear();
    const placeholders = new Set(Array.from(this.catalog?.resources.values() ?? []).flat()
      .filter(resource => resource.status === 'placeholder').map(resource => 'public/files/' + resource.folder + '/' + resource.name));
    this.localFiles = new Set(Constant.FILE_PATH.files.filter(path => !placeholders.has(path)));
    for (const file of this.localFiles) {
      const parts = file.slice('public/files/'.length).split('/');
      const name = parts.pop()!;
      const folder = parts.join('/');
      const items = this.folders.get(folder) ?? [];
      items.push({ name, url: this.localUrl(file) });
      this.folders.set(folder, items);
    }
    this.indexedCount = Constant.FILE_PATH.files.length;
    this.indexedResources = resourcesReady;
  }

  private localUrl(path: string): string {
    return path.slice('public/'.length).split('/').map(encodeURIComponent).join('/');
  }
}
