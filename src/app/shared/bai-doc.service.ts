import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

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
  constructor(private db: AngularFireDatabase) {}

  pushContentData(data: ContentData[]) {
    const ref = this.db.list('bai-doc');
    data.forEach((item: ContentData) => {
      ref.push(item);
    });
  }

  pushInterpreterData(item: InterPreterData, readingUrl: string) {
    const ref = this.db.list(`chu-thich/${readingUrl}`);
    ref.push(item);
  }

  getAllInterpreterData(readingUrl: string): Observable<InterPreterData[]> {
    return this.db
      .object<any>(`chu-thich/${readingUrl}`)
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

  getAllContentData(): Observable<ContentData[]> {
    return this.db
      .object<any>(`bai-doc`)
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
