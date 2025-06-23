import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { PdfDownloadService } from '../shared/pdf-download/pdf-download.service';
import { ExcelReaderService } from '../shared/excel-reader.service';
import { BaiKiemTraService } from '../shared/bai-kiem-tra.service';
import { QuestionType } from '../shared/constants/Constant';
import { CauHoiTracNghiemComponent } from './danh-sach-cau-hoi/cau-hoi-trac-nghiem/cau-hoi-trac-nghiem.component';
import { CauHoiDungSaiComponent } from './danh-sach-cau-hoi/cau-hoi-dung-sai/cau-hoi-dung-sai.component';

@Component({
  selector: 'app-bai-kiem-tra',
  standalone: true,
  imports: [CommonModule, CauHoiTracNghiemComponent, CauHoiDungSaiComponent],
  templateUrl: './bai-kiem-tra.component.html',
  styleUrl: './bai-kiem-tra.component.css',
})
export class BaiKiemTraComponent implements OnInit {
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  @ViewChildren(CauHoiTracNghiemComponent)
  cauHoiTracNghiem!: QueryList<CauHoiTracNghiemComponent>;
  @ViewChildren(CauHoiTracNghiemComponent)
  cauHoiDungSai!: QueryList<CauHoiDungSaiComponent>;

  listTestData: any[] = [];
  organizedTestData: any[] = [];
  isLoading: boolean = true;

  questionType = QuestionType;
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
  }

  downloadAnwser() {
    const element = this.pdfContent.nativeElement;
    this.pdfService.downloadPdfAnswer(element, {
      filename: 'FIle đáp án.pdf',
    });
  }

  downloadTest() {
    const element = this.pdfContent.nativeElement;
    this.pdfService.downloadPdfTest(element, {
      filename: 'FIle bài kiểm tra.pdf',
    });
  }

  onSubmitTest() {
    let sum = 0;
    sum += this.cauHoiTracNghiem.reduce(
      (sum, comp) => sum + comp.checkAnswer(),
      0
    );
    sum += this.cauHoiDungSai.reduce(
      (sum, comp) => sum + comp.checkAnswer(),
      0
    );
  }
}
