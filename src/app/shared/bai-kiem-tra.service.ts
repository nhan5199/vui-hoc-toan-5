import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, take } from 'rxjs';
import { ReadCacheService } from '../services/read-cache.service';

export interface BaiKiemTraData {}
@Injectable({
  providedIn: 'root',
})
export class BaiKiemTraService {
  constructor(private db: AngularFireDatabase, private cache: ReadCacheService) {}

  pushData(data: any) {
    const ref = this.db.list('bai-kiem-tra');
    data.forEach((item: any) => {
      void ref.push(item).then(() => this.cache.invalidate('bai-kiem-tra'));
    });
  }

  getAllData(): Observable<BaiKiemTraData[]> {
    return this.cache.read('bai-kiem-tra', () => this.db.object<any>('bai-kiem-tra').valueChanges().pipe(
        take(1),
        map((data) => {
          if (Array.isArray(data)) {
            return data;
          }
          return data ? Object.values(data) : [];
        })
      ));
  }
}
