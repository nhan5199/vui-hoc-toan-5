import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Constant from '../../../shared/constants/Constant';
import { FileService } from '../../../services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ebook-button',
  standalone: true,
  imports: [],
  templateUrl: './ebook-button.component.html',
  styleUrl: './ebook-button.component.css',
})
export class EBookButtonComponent implements OnChanges {
  @Input('buttonName') buttonName: string = '';
  @Input('folderPath') folderPath: string = '';
  imageUrl: string[] = [];

  constructor(
    private readonly fileService: FileService,
    private readonly router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonName'] && this.buttonName?.length > 0) {
      this.imageUrl = Constant.IMAGE_PATHS.images.filter((x) =>
        x.includes(
          `${this.folderPath}/${this.buttonName.split('.')[0]}/${
            this.buttonName.split('.')[0]
          }-images-0`.split('//')[1]
        )
      );
      console.log(
        `${this.folderPath}/${this.buttonName.split('.')[0]}/${
          this.buttonName.split('.')[0]
        }-images-0`
      );
      console.log(this.imageUrl[0]);
    }
  }

  viewFile() {
    this.fileService.setImageFolderPath(
      this.folderPath + '/' + this.buttonName?.split('.')[0]
    );
    this.fileService.setImageDownloadUrl(
      `${this.folderPath}/${this.buttonName.split('.')[0]}/${
        this.buttonName.split('.')[0]
      }`
    );
    this.fileService.setFileName(this.buttonName);
    setTimeout(() => {
      this.router.navigateByUrl('doc-sach');
    }, 100);
  }
}
