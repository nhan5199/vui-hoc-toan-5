import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giao-an-dien-tu-button',
  standalone: true,
  imports: [],
  templateUrl: './giao-an-dien-tu-button.component.html',
  styleUrl: './giao-an-dien-tu-button.component.css',
})
export class GiaoAnDienTuButtonComponent implements OnChanges {
  @Input('buttonName') buttonName: string = '';
  @Input('folderPath') folderPath: string = '';
  @Input('urlImg') urlImg: string = '';
  imgUrl: string = 'images/images/';
  constructor(
    private readonly fileService: FileService,
    private readonly router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.urlImg);
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
