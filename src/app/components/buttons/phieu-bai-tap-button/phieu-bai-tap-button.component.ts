import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phieu-bai-tap-button',
  standalone: true,
  imports: [],
  templateUrl: './phieu-bai-tap-button.component.html',
  styleUrl: './phieu-bai-tap-button.component.css',
})
export class PhieuBaiTapButtonComponent implements OnChanges {
  @Input('buttonName') buttonName: string = '';
  @Input('folderPath') folderPath: string = '';
  imgUrl: string = 'images/images/';
  downloadUrl: string = '';
  constructor(
    private readonly fileService: FileService,
    private readonly router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonName'] && this.buttonName?.length > 0) {
      if (this.folderPath.includes('canh-dieu')) {
        this.imgUrl += 'canh-dieu-icon.jpg';
      } else if (this.folderPath.includes('ket-noi-tri-thuc')) {
        this.imgUrl += 'ket-noi-tri-thuc-icon.jpg';
      } else {
        this.imgUrl += 'chan-troi-sang-tao-icon.jpg';
      }

      this.downloadUrl = `files/${this.folderPath.split('//')[1]}/${
        this.buttonName
      }`;
    }
  }
}
