import { Component, EventEmitter, Input, Output } from '@angular/core';
import Constant from '../../../shared/constants/Constant';

@Component({
  selector: 'app-giao-an-dien-tu-cac-mon-khac-button',
  standalone: true,
  imports: [],
  templateUrl: './giao-an-dien-tu-cac-mon-khac-button.component.html',
  styleUrl: './giao-an-dien-tu-cac-mon-khac-button.component.css',
})
export class GiaoAnDIenTuCacMonKhacButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('folderPath') folderPath: string = '';
  @Input('fileName') fileName: string = '';

  downloadFile(): void {
    const fileUrl = Constant.FILE_PATH.files
      .filter((x) => x.includes(`files/${this.folderPath}/${this.fileName}`))[0]
      .split('public/')[1];
    const link = document.createElement('a');
    link.href = fileUrl;

    let filePath = Constant.FILE_PATH.files
      .filter((x) => x.includes(`files/${this.folderPath}/${this.fileName}`))[0]
      .split('public/')[1];

    let filePathParts = filePath.split('/');
    link.download = filePathParts[filePathParts.length - 1];
    link.click();
  }
}
