import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import Constant from '../../../shared/constants/Constant';

@Component({
  selector: 'app-cac-mon-khac-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cac-mon-khac-button.component.html',
  styleUrl: './cac-mon-khac-button.component.css',
})
export class CacMonKhacButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('buttonLink') buttonLink: string = '';
  @Input('buttonIcon') buttonIcon: string = '';

  downloadFile(): void {
    // if (this.downloadUrl?.length > 0) {
    //   const link = document.createElement('a');
    //   link.href = this.downloadUrl;
    //   let filePathParts = this.downloadUrl.split('/');
    //   link.download = filePathParts[filePathParts.length - 1];
    //   link.click();
    // }
  }
}
