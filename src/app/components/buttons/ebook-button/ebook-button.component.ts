import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../../services/file.service';
import Constant from '../../../shared/constants/Constant';

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
  @Input('folderDownloadUrl') folderDownloadUrl: string = '';
  @Output('viewBook')
  viewBook: EventEmitter<any> = new EventEmitter<any>();

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
    }
  }

  onClickButton() {
    this.viewBook.emit({
      name: `${this.folderPath}/${this.buttonName.split('.')[0]}/${
        this.buttonName.split('.')[0]
      }`.split('//')[1],
      url: this.folderDownloadUrl,
    });
  }
}
