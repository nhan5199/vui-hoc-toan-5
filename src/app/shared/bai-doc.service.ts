import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, take } from 'rxjs';
import { ReadCacheService } from '../services/read-cache.service';

export interface InterPreterData {
  is360Img: number;
  imgUrl: string;
  title: string;
  readingUrl: string;
  text: string;
  description: string;
}

export interface ContentData {
  title: string;
  content: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BaiDocService {
  constructor(private db: AngularFireDatabase, private cache: ReadCacheService) {}

  pushContentData(data: ContentData[]) {
    const ref = this.db.list('bai-doc');
    data.forEach((item: ContentData) => {
      void ref.push(item).then(() => this.cache.invalidate('bai-doc'));
    });
  }

  pushInterpreterData(item: InterPreterData, readingUrl: string) {
    const ref = this.db.list(`chu-thich/${readingUrl}`);
    void ref.push(item).then(() => this.cache.invalidate(`chu-thich/${readingUrl}`));
  }

  getAllInterpreterData(readingUrl: string): Observable<InterPreterData[]> {
    return this.cache.read(`chu-thich/${readingUrl}`, () => this.db.object<any>(`chu-thich/${readingUrl}`).valueChanges().pipe(
        take(1),
        map((data) => {
          if (Array.isArray(data)) {
            return data;
          }
          return data ? Object.values(data) : [];
        })
      ));
  }

  getAllContentData(): Observable<ContentData[]> {
    return this.cache.read(`bai-doc`, () => this.db.object<any>(`bai-doc`).valueChanges().pipe(
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
