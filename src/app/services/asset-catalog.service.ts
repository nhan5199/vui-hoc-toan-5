import { inject, Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';
import Constant from '../shared/constants/Constant';
import { PreviewService } from './preview.service';
import { Resource } from '../shared/models/resource';

@Injectable({ providedIn: 'root' })
export class AssetCatalogService {
  readonly resources = new Map<string, Resource[]>();
  private previews = inject(PreviewService);
  private resourceRequest?: Promise<void>;
  resourceLoaded = false;
  private loaded = new Map<string, Promise<void>>();

  load(section = 'common'): Promise<void> {
    const existing = this.loaded.get(section);
    if (existing) return existing;
    const request = this.loadSection(section).catch(error => {
      this.loaded.delete(section);
      throw error;
    });
    this.loaded.set(section, request);
    return request;
  }

  private async loadSection(section: string): Promise<void> {
    const response = await fetch('catalog/' + section + '.json');
    if (!response.ok) throw new Error('Unable to load the asset catalog');
    const folders: Record<string, string[]> = await response.json();
    const previewResponse = await fetch('catalog/' + section + '-previews.json');
    if (previewResponse.ok) this.previews.register(await previewResponse.json());
    Constant.clearImageMatches();
    for (const [folder, names] of Object.entries(folders)) {
      const destination = folder === 'public/images' || folder.startsWith('public/images/') ? Constant.IMAGE_PATHS.images : Constant.FILE_PATH.files;
      destination.push(...names.map(name => folder + '/' + name));
    }
  }

  /** Detailed file metadata is needed by libraries, never by the home page. */
  loadResources(): Promise<void> {
    if (this.resourceRequest) return this.resourceRequest;
    this.resourceRequest = fetch('catalog/common-resources.json').then(async response => {
      if (!response.ok) throw new Error('Unable to load resources');
      const resources: Resource[] = await response.json();
      this.resources.clear();
      for (const resource of resources) {
        const entries = this.resources.get(resource.folder) ?? [];
        entries.push(resource); this.resources.set(resource.folder, entries);
      }
      this.resourceLoaded = true;
    }).catch(error => { this.resourceRequest = undefined; throw error; });
    return this.resourceRequest;
  }
}

export const assetCatalogResolver: ResolveFn<void> = (route, state) => {
  const section = route.paramMap.get('bookName') || route.url[0]?.path;
  const supported = ['canh-dieu', 'chan-troi-sang-tao', 'ket-noi-tri-thuc', 'tai-nguyen'];
  const catalog = inject(AssetCatalogService);
  if (state.url.includes('/cong-cu-ho-tro/slide') || section === 'doc-slide') {
    return Promise.all([catalog.load('slide'), ...(section === 'tai-nguyen' ? [catalog.load(section)] : [])]).then(() => undefined);
  }
  if (section && supported.includes(section)) return catalog.load(section);
  if (section === 'danh-sach-bai-doc') return inject(AssetCatalogService).load('bai-doc');
  return undefined;
};
