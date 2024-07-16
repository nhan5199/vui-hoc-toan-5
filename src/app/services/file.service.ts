import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { forkJoin, Observable } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

export interface FileData {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  listFolder: string[] = ['uploads/0', 'uploads/1', 'uploads/2'];

  constructor(private storage: AngularFireStorage) {}

  // Upload file
  uploadFile(filePath: string, file: File): Observable<number | undefined> {
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.percentageChanges();
  }

  // Get list of files
  getFilesList(path: string): Observable<FileData[]> {
    const folderRef = this.storage.ref(path);
    return folderRef.listAll().pipe(
      switchMap((result) => {
        const fileData$ = result.items.map((item) =>
          item.getMetadata().then((metadata) => {
            return item.getDownloadURL().then((url) => ({
              name: metadata.name,
              url: url,
            }));
          })
        );
        return forkJoin(fileData$);
      })
    );
  }

  // Download file
  getFileUrl(filePath: string): Observable<string> {
    const ref = this.storage.ref(filePath);
    return ref.getDownloadURL();
  }
}
