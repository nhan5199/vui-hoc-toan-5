import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileService } from '../../../services/file.service';

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
  imgUrl: string = 'images/images/';
  constructor(private readonly fileService: FileService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonName'] && this.buttonName?.length > 0) {
      if (this.folderPath.includes('canh-dieu')) {
        this.imgUrl += 'canh-dieu-icon.jpg';
      } else if (this.folderPath.includes('ket-noi-tri-thuc')) {
        this.imgUrl += 'ket-noi-tri-thuc-icon.jpg';
      } else {
        this.imgUrl += 'chan-troi-sang-tao-icon.jpg';
      }
    }
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.href = `/files/${this.folderPath}`; // Replace with your file path
    link.download = `${this.buttonName}`; // Replace with the desired file name
    link.click();
  }
}
