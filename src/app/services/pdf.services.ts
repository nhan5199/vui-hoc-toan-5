import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private storage: AngularFireStorage) {}

  getPdfUrl(pdfPath: string): Observable<string> {
    const ref = this.storage.ref(pdfPath);
    return ref.getDownloadURL();
  }
}
