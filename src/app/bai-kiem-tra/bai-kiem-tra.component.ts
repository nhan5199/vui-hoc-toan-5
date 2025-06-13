import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { PdfDownloadService } from '../shared/pdf-download/pdf-download.service';
import { ExcelReaderService } from '../shared/excel-reader.service';
import { BaiKiemTraService } from '../shared/bai-kiem-tra.service';

@Component({
  selector: 'app-bai-kiem-tra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bai-kiem-tra.component.html',
  styleUrl: './bai-kiem-tra.component.css',
})
export class BaiKiemTraComponent implements OnInit {
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  questions = [
    {
      question: 'What is Angular?',
      answer: 'A front-end framework by Google.',
    },
    { question: 'What is TypeScript?', answer: 'A superset of JavaScript.' },
    // Add more Q&A as needed
  ];

  constructor(
    private pdfService: PdfDownloadService,
    private excelService: ExcelReaderService,
    private baiKiemTraService: BaiKiemTraService
  ) {}

  ngOnInit(): void {
    this.baiKiemTraService.getAllData().subscribe((data) => {
      // this.baiKiemTraData = data;
      console.log('Fetched data:', data);
    });
  }

  download() {
    const element = this.pdfContent.nativeElement;
    this.pdfService.downloadPdf(element, {
      filename: 'questions-and-answers.pdf',
    });
  }

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.excelService
        .readFile(file)
        .then((data) => {
          this.baiKiemTraService.pushData(data);
          // use the array of objects here
        })
        .catch((error) => {
          console.error('Failed to read Excel file:', error);
        });
    }
  }
}
