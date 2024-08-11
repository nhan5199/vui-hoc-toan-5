import { Component, OnInit } from '@angular/core';
import { FileData, FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { PhieuBaiTapButtonComponent } from '../../buttons/phieu-bai-tap-button/phieu-bai-tap-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-phieu-bai-tap',
  standalone: true,
  imports: [PhieuBaiTapButtonComponent, CommonModule, FormsModule],
  templateUrl: './phieu-bai-tap.component.html',
  styleUrl: './phieu-bai-tap.component.css',
})
export class PhieuBaiTapComponent implements OnInit {
  bookName: string = '';
  bookIconUrl: string = '';
  folderPath: string = '';
  // files: FileData[] = [];

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

  isLoadingFiles: boolean = true;

  listFiles(): void {
    this.files = [];
    this.isLoadingFiles = true;
    this.fileService
      .getFilesList(this.folderPath + `/${this.selectedSemester}`)
      .pipe(finalize(() => (this.isLoadingFiles = false)))
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
}
