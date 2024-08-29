import { ScreenSizeService } from './../../../services/screen-size.service';
import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
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
  @Output('viewFile') viewFile: EventEmitter<any> = new EventEmitter<any>();

  isMobileScreen: boolean = false;
  constructor(private readonly screenSizeService: ScreenSizeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonName'] && this.buttonName?.length > 0) {
      this.screenSizeService.isMobileScreen$.subscribe((isMobile) => {
        this.isMobileScreen = isMobile;
      });
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

  onClickFile() {
    this.viewFile.emit({
      name: this.imgFolderPath + '/' + this.buttonName?.split('.pdf')[0],
      url: this.fileDownloadUrl,
    });
  }

  getButtonDisplayName() {
    return this.buttonName.split('.pdf')[0]?.length >=
      (this.isMobileScreen ? 28 : 37)
      ? this.buttonName
          .split('.pdf')[0]
          .slice(0, this.isMobileScreen ? 27 : 36) + '...'
      : this.buttonName.split('.pdf')[0];
  }
}
