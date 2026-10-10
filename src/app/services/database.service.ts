import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs';
import { ReadCacheService } from './read-cache.service';
export type { FileData } from './file.service';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(private db: AngularFireDatabase, private cache: ReadCacheService) {}
  getQuestionAnswers() {
    return this.cache.read<any[]>('questionAnswer', () =>
      this.db.object<any>('questionAnswer').valueChanges().pipe(take(1), map(data => {
        const answers = data?.questionAnswer ?? data;
        return Array.isArray(answers) ? answers : answers ? Object.values(answers) : [];
      }))
    );
  }
}
