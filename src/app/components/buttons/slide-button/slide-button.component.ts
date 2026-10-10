import { PressableDirective } from '../../../shared/pressable.directive';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import Constant from '../../../shared/constants/Constant';

@Component({
  selector: 'app-slide-button',
  standalone: true,
  imports: [PressableDirective, ],
  templateUrl: './slide-button.component.html',
  styleUrl: './slide-button.component.css',
})
export class SlideButtonComponent implements OnChanges {
  @Input('buttonName') buttonName: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  @Output('viewSlide') viewSlide: EventEmitter<any> = new EventEmitter<any>();

  imgUrl: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonName'] && this.buttonName?.length > 0) {
      this.imgUrl = Constant.findImages(this.buttonName.replace(/\.[^.]+$/, ''));

      this.imgUrl[0] = this.imgUrl[0]?.split('public/')[1];
    }
  }

  onClickSlide() {
    let result = {
      name: this.buttonName,
      url: this.downloadUrl,
    };
    this.viewSlide.emit(result);
  }
}
