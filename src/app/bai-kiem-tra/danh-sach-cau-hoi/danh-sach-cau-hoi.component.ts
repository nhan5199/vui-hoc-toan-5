import { Component } from '@angular/core';
import { BaiKiemTraService } from '../../shared/bai-kiem-tra.service';
import { ExcelReaderService } from '../../shared/excel-reader.service';

@Component({
  selector: 'app-danh-sach-cau-hoi',
  standalone: true,
  imports: [],
  templateUrl: './danh-sach-cau-hoi.component.html',
  styleUrl: './danh-sach-cau-hoi.component.css',
})
export class DanhSachCauHoiComponent {
  importTestData: any[] = [];

  constructor(
    private excelService: ExcelReaderService,

    private baiKiemTraService: BaiKiemTraService
  ) {}

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.excelService
        .readFileTest(file)
        .then((data) => {
          this.importTestData = data;
        })
        .catch((error) => {
          console.error('Failed to read Excel file:', error);
        });
    }
  }

  onSubmit() {
    this.baiKiemTraService.pushData(this.importTestData);
  }
}
