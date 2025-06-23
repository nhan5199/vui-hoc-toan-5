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

  downloadPdfAnswer(element: HTMLElement, options?: Html2PdfOptions) {
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

  downloadPdfTest(element: HTMLElement, options?: Html2PdfOptions) {
    const clone = element.cloneNode(true) as HTMLElement;

    // Reset inputs
    clone.querySelectorAll('input[type="radio"]').forEach((input: any) => {
      input.checked = false;
    });

    // Force all text to black
    clone.querySelectorAll('*').forEach((el: any) => {
      el.classList.remove(
        'selected-correct',
        'selected-wrong',
        'correct-answer'
      );
      el.style.setProperty('color', 'black', 'important');
    });

    // Remove all buttons
    clone.querySelectorAll('button').forEach((btn) => btn.remove());

    // Create a wrapper div for the clone
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.width = '1px'; // smallest size possible
    wrapper.style.height = '1px';
    wrapper.style.overflow = 'hidden';
    wrapper.style.opacity = '0'; // transparent
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = '9999'; // make sure it's on top to render

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Now render to PDF
    setTimeout(() => {
      const defaultOptions: Html2PdfOptions = {
        margin: 1,
        filename: 'bai-kiem-tra-empty.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };

      const mergedOptions = { ...defaultOptions, ...options };

      html2pdf()
        .from(clone)
        .set(mergedOptions)
        .save()
        .then(() => clone.remove());
    }, 100);
  }
}
