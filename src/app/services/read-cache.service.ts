import { Injectable } from '@angular/core';
import { defer, Observable, of, shareReplay, tap } from 'rxjs';

/** Public curriculum only; never store student or authentication data here. */
@Injectable({ providedIn: 'root' })
export class ReadCacheService {
  private pending = new Map<string, Observable<any>>();
  private revisions = new Map<string, number>();
  private readonly ttl = 60 * 60 * 1000;

  read<T>(key: string, loader: () => Observable<T>): Observable<T> {
    const active = this.pending.get(key);
    if (active) return active;
    const revision = this.revisions.get(key) ?? 0;
    const release = () => {
      if (this.pending.get(key) === request) this.pending.delete(key);
    };
    const request = defer(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('curriculum:v1:' + key) || 'null');
        if (stored && stored.expires > Date.now()) return of(stored.data as T);
      } catch { /* Storage may be disabled. */ }
      return loader().pipe(tap(data => {
        if ((this.revisions.get(key) ?? 0) !== revision) return;
        try {
          localStorage.setItem('curriculum:v1:' + key, JSON.stringify({ data, expires: Date.now() + this.ttl }));
        } catch { /* Continue when storage is full. */ }
      }));
    }).pipe(
      tap({ complete: release, error: release }),
      shareReplay({ bufferSize: 1, refCount: false })
    );
    this.pending.set(key, request);
    return request;
  }

  invalidate(key: string): void {
    this.revisions.set(key, (this.revisions.get(key) ?? 0) + 1);
    this.pending.delete(key);
    try { localStorage.removeItem('curriculum:v1:' + key); } catch { }
  }

  invalidatePrefix(prefix: string): void {
    const keys = new Set([...this.pending.keys(), ...this.revisions.keys()].filter(key => key.startsWith(prefix)));
    try {
      for (let index = 0; index < localStorage.length; index++) {
        const stored = localStorage.key(index);
        if (stored?.startsWith('curriculum:v1:' + prefix)) keys.add(stored.slice('curriculum:v1:'.length));
      }
    } catch { }
    for (const key of keys) this.invalidate(key);
  }
}
