import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

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
  @Input('downloadUrl') downloadUrl: string = '';

  @Output('viewSlide') viewSlide: EventEmitter<any> = new EventEmitter<any>();
  imgUrl: string = 'images/images/';
  constructor() {}

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

  onClickSlide() {
    this.viewSlide.emit({
      name: this.buttonName,
      url: this.downloadUrl,
    });
  }
}
