import { Component } from '@angular/core';
import { BaiDocService } from '../shared/bai-doc.service';
import { ExcelReaderService } from '../shared/excel-reader.service';

@Component({
  selector: 'app-danh-sach-bai-doc',
  standalone: true,
  imports: [],
  templateUrl: './danh-sach-bai-doc.component.html',
  styleUrl: './danh-sach-bai-doc.component.css',
})
export class DanhSachBaiDocComponent {
  contentData: any[] = [{}];
  interpreterData: any[] = [{}];

  constructor(
    private baiDocService: BaiDocService,
    private excelService: ExcelReaderService
  ) {}

  onFileChange(event: any) {
    //clear old data
    this.contentData = [];
    this.interpreterData = [];

    //read data
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.excelService
        .readFileReading(file)
        .then((data) => {
          this.contentData = data.contentData;
          this.interpreterData = data.interpreterData;
          // use the array of objects here
        })
        .catch((error) => {
          console.error('Failed to read Excel file:', error);
        });
    }
  }

  onSubmit() {
    if (this.contentData) {
      this.baiDocService.pushContentData(this.contentData);
    }
    if (this.interpreterData) {
      this.interpreterData.forEach((item) => {
        this.baiDocService.pushInterpreterData(item, item.readingUrl);
      });
    }
  }
}
