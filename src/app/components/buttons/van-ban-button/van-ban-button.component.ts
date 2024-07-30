import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-van-ban-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './van-ban-button.component.html',
  styleUrl: './van-ban-button.component.css',
})
export class VanBanButtonComponent implements OnChanges {
  @Input('buttonName') buttonName: string = '';
  @Input('fileDownloadUrl') fileDownloadUrl: string = '';
  @Input('imgFolderPath') imgFolderPath: string = '';
  @Input('buttonIcon') buttonIcon: string = '';

  constructor(
    private readonly router: Router,
    private readonly fileService: FileService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonName'] && this.buttonName?.length > 0) {
      this.getButtonIconName();
    }
  }

  getButtonIconName(): string {
    if (
      this.buttonName.split('.')[0].toLowerCase() == 'chương trình tổng thể' ||
      this.buttonName.split('.')[0].toLowerCase() == 'chương trình môn toán'
    ) {
      return 'GDPT 2018';
    } else if (
      this.buttonName.split('.')[0].toLowerCase() ==
      'quy định đánh giá hs tiểu học'
    ) {
      return 'TT 27';
    } else {
      return 'GDPT 2018';
    }
  }

  viewFile() {
    this.fileService.setImageFolderPath(
      this.imgFolderPath + '/' + this.buttonName?.split('.')[0]
    );
    this.fileService.setImageDownloadUrl(this.fileDownloadUrl);
    this.fileService.setFileName(this.buttonName);
    setTimeout(() => {
      this.router.navigateByUrl('doc-sach');
    }, 100);
  }
}
