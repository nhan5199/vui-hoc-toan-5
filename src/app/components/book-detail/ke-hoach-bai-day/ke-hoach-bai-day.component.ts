import { Component, OnInit } from '@angular/core';
import { FileData, FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { KeHoachBaiDayButtonComponent } from '../../buttons/ke-hoach-bai-day-button/ke-hoach-bai-day-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { XemPdfComponent } from '../../xem-pdf/xem-pdf.component';

@Component({
  selector: 'app-ke-hoach-bai-day',
  standalone: true,
  imports: [
    KeHoachBaiDayButtonComponent,
    FormsModule,
    CommonModule,
    XemPdfComponent,
  ],
  templateUrl: './ke-hoach-bai-day.component.html',
  styleUrl: './ke-hoach-bai-day.component.css',
})
export class KeHoachBaiDayComponent implements OnInit {
  bookName: string = '';
  bookIconUrl: string = '';
  folderPath: string = '';

  pdfName: string = '';
  pdfDownloadUrl: string = '';
  isDisplayViewpdf: boolean = false;

  files: any[] = [];
  selectedSemester = 'hoc-ki-1';
  options = [
    { value: 'hoc-ki-1', label: 'Học kì 1' },
    { value: 'hoc-ki-2', label: 'Học kì 2' },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fileService: FileService
  ) {}

  isLoadingFile: boolean = true;
  ngOnInit(): void {
    this.bookName = this.route.snapshot.paramMap.get('bookName')!;
    this.bookIconUrl = `images/images/${this.bookName}-icon.jpg`;
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');

        this.listFiles();
      });
    });
  }

  onChangeSemester() {
    this.listFiles();
  }

  listFiles(): void {
    this.isLoadingFile = true;
    this.files = [];
    this.fileService
      .getFilesList(this.folderPath + `/${this.selectedSemester}`)
      .pipe(finalize(() => (this.isLoadingFile = false)))
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });

        this.sortFilesByName(this.files);
      });
  }

  getTitle() {
    if (this.bookName == 'canh-dieu') {
      return 'Cánh Diều';
    } else if (this.bookName == 'chan-troi-sang-tao') {
      return 'Chân trời sáng tạo';
    } else {
      return 'Kết nối tri thức với cuộc sống';
    }
  }

  sortFilesByName(files: FileData[]) {
    this.files = files.sort((a, b) => {
      const numA = this.extractNumber(a.name);
      const numB = this.extractNumber(b.name);
      return numA - numB;
    });
  }

  extractNumber(name: string): number {
    const number = name?.toLowerCase().split('toán 5 - tuần ')[1].split('.')[0];
    return +number;
  }

  onViewPdf(event: any) {
    this.isDisplayViewpdf = true;
    this.pdfDownloadUrl = event.url;
    this.pdfName = event.name;
  }

  onCloseViewPdf(event: any) {
    if (event) {
      this.isDisplayViewpdf = false;
      this.pdfDownloadUrl = '';
      this.pdfName = '';
    }
  }
}
