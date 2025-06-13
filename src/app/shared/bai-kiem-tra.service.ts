import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaiKiemTraService {
  constructor(private db: AngularFireDatabase) {}

  pushData(data: any) {
    const ref = this.db.list('bai-kiem-tra');
    data.forEach((item: any) => {
      ref.push(item);
    });
  }

  getAllData(): Observable<any[]> {
    return this.db
      .object<any>('bai-kiem-tra')
      .valueChanges()
      .pipe(
        map((data) => {
          if (Array.isArray(data)) {
            return data;
          }
          return data ? Object.values(data) : [];
        })
      );
  }
}
