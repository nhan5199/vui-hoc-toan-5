import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ke-hoach-bai-day-button',
  standalone: true,
  imports: [],
  templateUrl: './ke-hoach-bai-day-button.component.html',
  styleUrl: './ke-hoach-bai-day-button.component.css',
})
export class KeHoachBaiDayButtonComponent implements OnChanges {
  @Input('buttonName') buttonName: string = '';
  @Input('folderPath') folderPath: string = '';
  @Input('selectedSemester') selectedSemester: string = '';
  @Input('fileDownloadUrl') fileDownloadUrl: string = '';

  imgUrl: string = 'images/images/';
  downloadUrl: string = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonName'] && this.buttonName?.length > 0) {
      if (this.folderPath.includes('canh-dieu')) {
        this.imgUrl += 'canh-dieu-icon.jpg';
      } else if (this.folderPath.includes('ket-noi-tri-thuc')) {
        this.imgUrl += 'ket-noi-tri-thuc-icon.jpg';
      } else {
        this.imgUrl += 'chan-troi-sang-tao-icon.jpg';
      }

      if (
        this.buttonName?.includes('pdf') ||
        this.buttonName.includes('png') ||
        this.buttonName.includes('jpeg')
      ) {
        this.downloadUrl = `files/${this.folderPath.split('//')[1]}/${
          this.selectedSemester
        }/${this.buttonName}`;
      } else {
        this.downloadUrl = this.fileDownloadUrl;
      }
    }
  }
}
