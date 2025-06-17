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

  listTestData: any[] = [];
  organizedTestData: any[] = [];
  isLoading: boolean = true;
  constructor(
    private pdfService: PdfDownloadService,

    private baiKiemTraService: BaiKiemTraService
  ) {}

  ngOnInit(): void {
    this.baiKiemTraService.getAllData().subscribe((data) => {
      this.listTestData = data;
      this.isLoading = false;
    });
  }

  createListOrganizedQuestions() {
    this.organizedTestData = [];

    const levelAmountMap = [1, 2, 3, 4];

    for (const level in levelAmountMap) {
      debugger;
      let count = levelAmountMap[level];
      const matchingItems = this.listTestData.filter(
        (item) => item.level === +level + 1
      );

      // Shuffle matchingItems using Fisher-Yates
      for (let i = matchingItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [matchingItems[i], matchingItems[j]] = [
          matchingItems[j],
          matchingItems[i],
        ];
      }

      this.organizedTestData.push(...matchingItems.slice(0, count));
    }

    console.log('data: ', this.organizedTestData);
  }

  download() {
    const element = this.pdfContent.nativeElement;
    this.pdfService.downloadPdf(element, {
      filename: 'questions-and-answers.pdf',
    });
  }
}
