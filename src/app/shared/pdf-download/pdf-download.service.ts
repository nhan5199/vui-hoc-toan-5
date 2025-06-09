// pdf-download.service.ts
import { Injectable } from '@angular/core';

// Import html2pdf.js
import html2pdf from 'html2pdf.js';
import { Html2PdfOptions } from './pdf-download-interface';

@Injectable({
  providedIn: 'root',
})
export class PdfDownloadService {
  constructor() {}

  downloadPdf(element: HTMLElement, options?: Html2PdfOptions) {
    {
      const defaultOptions: Html2PdfOptions = {
        margin: 10,
        filename: 'download.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      const mergedOptions = { ...defaultOptions, ...options };

      html2pdf().from(element).set(mergedOptions).save();
    }
  }
}
