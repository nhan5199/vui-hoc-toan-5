import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import Constant from '../../shared/constants/Constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xem-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xem-slide.component.html',
  styleUrl: './xem-slide.component.css',
})
export class XemSlideComponent implements OnChanges {
  @Input('slideName') slideName: string = '';
  @Input('downloadUrl') downloadUrl: string = '';

  @Output('closeSlide') closeSlide: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  slides: string[] = [];
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slideName'] && this.slideName?.length > 0) {
      this.slides = Constant.IMAGE_PATHS.images.filter((x: any) =>
        x.includes(this.slideName?.split('.')[0])
      );
      this.sortImagePathsByNumber(this.slides);
    }
  }

  sortImagePathsByNumber(paths: string[]) {
    paths.sort((a, b) => {
      const numA = this.extractNumber(a);
      const numB = this.extractNumber(b);
      return numA - numB;
    });
  }

  extractNumber(path: string): number {
    const regex = /-images-(\d+)\.jpg$/;
    const match = path.match(regex);
    return match ? parseInt(match[1], 10) : 0;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const clickedInside = this.el.nativeElement
      .querySelector('.slide .slide-container .content img')
      .contains(event.target as Node);
    if (!clickedInside) {
      this.closeSlide.emit(true);
    }
  }
}
