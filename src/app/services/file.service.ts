import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private storage: AngularFireStorage) {}

  // Upload file
  uploadFile(filePath: string, file: File): Observable<number | undefined> {
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.percentageChanges();
  }

  // Get list of files
  getFilesList(path: string): Observable<string[]> {
    const ref = this.storage.ref(path);
    return ref
      .listAll()
      .pipe(map((result) => result.items.map((item) => item.name)));
  }

  // Download file
  getFileUrl(filePath: string): Observable<string> {
    const ref = this.storage.ref(filePath);
    return ref.getDownloadURL();
  }
}
