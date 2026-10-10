import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom, of, Subject, throwError } from 'rxjs';
import Constant from '../shared/constants/Constant';
import { FileService } from './file.service';
import { ReadCacheService } from './read-cache.service';
import { AssetCatalogService } from './asset-catalog.service';

describe('FileService request behavior', () => {
  let original: string[];
  let service: FileService;
  let ref: jasmine.Spy;
  beforeEach(() => {
    original = Constant.FILE_PATH.files;
    Constant.FILE_PATH.files = ['public/files/demo/folder/Bài 1.pdf', 'public/files/demo/folder/sub/Other.pdf'];
    ref = jasmine.createSpy('ref');
    service = new FileService({ ref } as unknown as AngularFireStorage, new ReadCacheService());
  });
  afterEach(() => { Constant.FILE_PATH.files = original; localStorage.removeItem('curriculum:v1:storage:list:remote-test'); });

  it('keeps successful files when one remote download URL fails, and does not cache partial results', async () => {
    ref.and.returnValue({ list: () => of({ items: [{ name: 'Good.pdf', fullPath: 'good' }, { name: 'Blocked.docx', fullPath: 'blocked' }], nextPageToken: null }) });
    spyOn(service, 'getFileUrl').and.callFake(path => path === 'good' ? of('/good.pdf') : throwError(() => ({ status: 402 })));
    const page = await firstValueFrom(service.getFilesPage('partial-test'));
    expect(page.files.find(file => file.name === 'Good.pdf')?.url).toBe('/good.pdf');
    expect(page.files.find(file => file.name === 'Blocked.docx')?.url).toBe('');
    expect(localStorage.getItem('curriculum:v1:storage:page:partial-test:24:')).toBeNull();
  });

  it('refreshes cached folder results and restores URLs after access is repaired', async () => {
    const list = jasmine.createSpy('list').and.returnValue(of({ items: [], nextPageToken: null }));
    ref.and.returnValue({ list });
    await firstValueFrom(service.getFilesPage('restored-test'));
    list.and.returnValue(of({ items: [{ name: 'Lesson.docx', fullPath: 'restored-test/Lesson.docx' }], nextPageToken: null }));
    spyOn(service, 'getFileUrl').and.returnValue(of('https://example.com/lesson.docx'));
    service.refreshFolder('//restored-test/');
    const page = await firstValueFrom(service.getFilesPage('restored-test'));
    expect(page.files[0].url).toBe('https://example.com/lesson.docx');
    expect(list).toHaveBeenCalledTimes(2);
    service.refreshFolder('restored-test');
  });

  it('makes one fresh URL request when a transient billing error clears', async () => {
    const url = jasmine.createSpy('getDownloadURL').and.returnValues(throwError(() => ({ status: 402 })), of('https://example.com/restored.docx'));
    ref.and.returnValue({ getDownloadURL: url });
    expect(await firstValueFrom(service.getFileUrl('billing-recovery-test/Lesson.docx'))).toBe('https://example.com/restored.docx');
    expect(url).toHaveBeenCalledTimes(2);
    service.refreshFolder('billing-recovery-test');
  });

  it('shows local page previews if Storage cannot list a folder, with retryable failures', async () => {
    const images = Constant.IMAGE_PATHS.images;
    Constant.IMAGE_PATHS.images = ['public/images/images/blocked-preview/Lesson/Lesson-images-0.jpg'];
    ref.and.returnValue({ list: () => throwError(() => ({ status: 402 })) });
    try {
      const page = await firstValueFrom(service.getFilesPage('blocked-preview'));
      expect(page.unavailable).toBeTrue();
      expect(page.files).toEqual([{ name: 'Lesson', url: '', previewFolder: 'public/images/images/blocked-preview/Lesson' }]);
      expect(localStorage.getItem('curriculum:v1:storage:page:blocked-preview:24:')).toBeNull();
    } finally { Constant.IMAGE_PATHS.images = images; }
  });

  it('lists only direct local children and encodes download filenames without contacting Storage', async () => {
    const files = await firstValueFrom(service.getFilesList('//demo/folder/'));
    expect(files).toEqual([{ name: 'Bài 1.pdf', url: 'files/demo/folder/B%C3%A0i%201.pdf' }]);
    expect(await firstValueFrom(service.getFileUrl('/demo/folder/Bài 1.pdf'))).toBe(files[0].url);
    expect(ref).not.toHaveBeenCalled();
  });

  it('does not list the bucket root when a path is empty', async () => {
    expect(await firstValueFrom(service.getFilesList('//'))).toEqual([]);
    expect(ref).not.toHaveBeenCalled();
  });

  it('paginates local files without Storage requests', async () => {
    const page = await firstValueFrom(service.getFilesPage('demo/folder', undefined, 1));
    expect(page.files.length).toBe(1);
    expect(page.nextPageToken).toBeUndefined();
    expect(ref).not.toHaveBeenCalled();
  });

  it('requests only one remote page and preserves the continuation token', async () => {
    const list = jasmine.createSpy('list').and.returnValue(of({ items: [{ name: 'One.pdf', fullPath: 'page-one' }], nextPageToken: 'next' }));
    ref.and.returnValue({ list });
    spyOn(service, 'getFileUrl').and.returnValue(of('/one.pdf'));
    const page = await firstValueFrom(service.getFilesPage('remote-page-test', 'cursor', 24));
    expect(list).toHaveBeenCalledOnceWith({ maxResults: 24, pageToken: 'cursor' });
    expect(page.nextPageToken).toBe('next');
    expect(page.files.length).toBe(1);
    localStorage.removeItem('curriculum:v1:storage:page:remote-page-test:24:cursor');
  });

  it('uses remote fallback instead of serving a known empty local archive', async () => {
    Constant.FILE_PATH.files = ['public/files/placeholder-test/empty.rar'];
    const catalog = { resourceLoaded: true, resources: new Map([['placeholder-test', [{ name: 'empty.rar', folder: 'placeholder-test', status: 'placeholder' }]]]) } as unknown as AssetCatalogService;
    const list = jasmine.createSpy('list').and.returnValue(of({ items: [], nextPageToken: null }));
    ref.and.returnValue({ list, getDownloadURL: () => of('https://example.com/real.rar') });
    service = new FileService({ ref } as unknown as AngularFireStorage, new ReadCacheService(), catalog);
    const page = await firstValueFrom(service.getFilesPage('placeholder-test'));
    expect(page.files).toEqual([]);
    expect(list).toHaveBeenCalled();
    expect(await firstValueFrom(service.getFileUrl('placeholder-test/empty.rar'))).toBe('https://example.com/real.rar');
    localStorage.removeItem('curriculum:v1:storage:page:placeholder-test:24:');
    localStorage.removeItem('curriculum:v1:storage:url:placeholder-test/empty.rar');
  });

  it('limits remote URL requests to six in flight and returns a stable list', async () => {
    const sources = Array.from({ length: 12 }, () => new Subject<string>());
    ref.and.returnValue({ listAll: () => of({ items: sources.map((_, index) => ({ name: `File ${index}.pdf`, fullPath: String(index) })) }) });
    const urls = spyOn(service, 'getFileUrl').and.callFake(name => sources[Number(name)]);
    const result = firstValueFrom(service.getFilesList('remote-test'));
    expect(urls).toHaveBeenCalledTimes(6);
    sources.forEach((source, index) => { source.next('/file/' + index); source.complete(); });
    const files = await result;
    expect(files.length).toBe(12);
    expect(files[2].name).toBe('File 2.pdf');
  });
});
