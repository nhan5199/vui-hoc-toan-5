import { Injectable } from '@angular/core';
import { FileService } from './file.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private files: FileService) {}

  getPdfUrl(pdfPath: string): Observable<string> {
    return this.files.getFileUrl(pdfPath);
  }
}
