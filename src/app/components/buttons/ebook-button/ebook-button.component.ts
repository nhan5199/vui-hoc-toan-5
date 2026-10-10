import { PressableDirective } from '../../../shared/pressable.directive';
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
import { PreviewService } from '../../../services/preview.service';

@Component({
  selector: 'app-ebook-button',
  standalone: true,
  imports: [PressableDirective, ],
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
  get coverImage(): string { return this.imageUrl[0] ? this.previews.thumbnail(this.imageUrl[0]) : 'images/images/file-loading.gif'; }

  constructor(
    private previews: PreviewService,
    private readonly fileService: FileService,
    private readonly router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonName'] && this.buttonName?.length > 0) {
      this.imageUrl = Constant.findImages(`${this.folderPath}/${this.buttonName.replace(/\.[^.]+$/, '')}/${
            this.buttonName.replace(/\.[^.]+$/, '')
          }-images-0`.split('//')[1]);
    }
  }

  onClickButton() {
    this.viewBook.emit({
      name: `${this.folderPath}/${this.buttonName.replace(/\.[^.]+$/, '')}/${
        this.buttonName.replace(/\.[^.]+$/, '')
      }`.split('//')[1],
      url: this.folderDownloadUrl,
    });
  }
}
