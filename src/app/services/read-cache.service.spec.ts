import { firstValueFrom, of, Subject, throwError } from 'rxjs';
import { ReadCacheService } from './read-cache.service';

describe('ReadCacheService', () => {
  let cache: ReadCacheService;
  const key = 'cache-test';
  beforeEach(() => {
    cache = new ReadCacheService();
    localStorage.removeItem('curriculum:v1:' + key);
  });
  afterEach(() => localStorage.removeItem('curriculum:v1:' + key));

  it('shares concurrent downloads and persists successful data across instances', async () => {
    const source = new Subject<string[]>();
    const loader = jasmine.createSpy('loader').and.returnValue(source);
    const first = firstValueFrom(cache.read(key, loader));
    const second = firstValueFrom(cache.read(key, loader));
    expect(loader).toHaveBeenCalledTimes(1);
    source.next(['lesson']);
    source.complete();
    expect(await first).toEqual(['lesson']);
    expect(await second).toEqual(['lesson']);
    expect(await firstValueFrom(new ReadCacheService().read(key, loader))).toEqual(['lesson']);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('downloads again after expiry or invalidation', async () => {
    localStorage.setItem('curriculum:v1:' + key, JSON.stringify({ data: ['old'], expires: Date.now() - 1 }));
    const loader = jasmine.createSpy('loader').and.returnValue(of(['new']));
    expect(await firstValueFrom(cache.read(key, loader))).toEqual(['new']);
    cache.invalidate(key);
    await firstValueFrom(cache.read(key, loader));
    expect(loader).toHaveBeenCalledTimes(2);
  });

  it('retries failures rather than caching them', async () => {
    await expectAsync(firstValueFrom(cache.read(key, () => throwError(() => new Error('offline'))))).toBeRejected();
    expect(await firstValueFrom(cache.read(key, () => of(['restored'])))).toEqual(['restored']);
  });

  it('works when browser storage is unavailable', async () => {
    spyOn(localStorage, 'getItem').and.throwError('disabled');
    spyOn(localStorage, 'setItem').and.throwError('full');
    expect(await firstValueFrom(cache.read(key, () => of(['lesson'])))).toEqual(['lesson']);
  });

  it('does not let an old in-flight read overwrite data after a write', async () => {
    const oldRead = new Subject<string[]>();
    const oldResult = firstValueFrom(cache.read(key, () => oldRead));
    cache.invalidate(key);
    await firstValueFrom(cache.read(key, () => of(['updated'])));
    oldRead.next(['stale']);
    oldRead.complete();
    await oldResult;
    expect(await firstValueFrom(cache.read(key, () => of(['unexpected'])))).toEqual(['updated']);
  });

  it('invalidates every cached page in a changed folder without clearing other folders', async () => {
    const prefix = 'storage:page:cache-test:';
    await firstValueFrom(cache.read(prefix + '24:first', () => of(['old'])));
    await firstValueFrom(cache.read(prefix + '24:next', () => of(['old'])));
    await firstValueFrom(cache.read('storage:page:other-test:24:first', () => of(['keep'])));
    cache.invalidatePrefix(prefix);
    expect(localStorage.getItem('curriculum:v1:' + prefix + '24:first')).toBeNull();
    expect(localStorage.getItem('curriculum:v1:' + prefix + '24:next')).toBeNull();
    expect(localStorage.getItem('curriculum:v1:storage:page:other-test:24:first')).not.toBeNull();
    cache.invalidate('storage:page:other-test:24:first');
  });
});
