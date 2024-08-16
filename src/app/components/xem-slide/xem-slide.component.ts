import {
  AfterViewInit,
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
export class XemSlideComponent implements OnChanges, AfterViewInit {
  @Input('slideName') slideName: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  @Input('bookName') bookName: string = '';
  @Input('selectedSemester') selectedSemester: string = '';
  @Input('selectedWeek') selectedWeek: string = '';

  @Output('closeSlide') closeSlide: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  slides: string[] = [];
  showScrollToTop: boolean = false;
  slideContainer!: HTMLElement;
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slideName'] && this.slideName?.length > 0) {
      let imgsPath = '';
      if (this.selectedSemester?.length <= 0) {
        imgsPath = `${this.bookName}/${this.slideName?.split('.')[0]}/`;
      } else {
        imgsPath = `${this.bookName}/${this.selectedSemester}/${
          this.selectedWeek
        }/${this.slideName?.split('.')[0]}/`;
      }
      this.slides = Constant.IMAGE_PATHS.images.filter((x: any) =>
        x.includes(imgsPath)
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
    const clickedScrollToTop = this.el.nativeElement
      .querySelector('.slide .scroll-to-top img')
      .contains(event.target as Node);
    const clickedDownload = this.el.nativeElement
      .querySelector('.slide a')
      .contains(event.target as Node);
    if (!clickedInside && !clickedScrollToTop && !clickedDownload) {
      this.closeSlide.emit(true);
    }
  }

  ngAfterViewInit() {
    // Get the .slide-container element after the view has initialized
    this.slideContainer =
      this.el.nativeElement.querySelector('.slide-container');

    // Listen to scroll events on the .slide-container
    this.slideContainer.addEventListener('scroll', () => {
      this.onslideContainerScroll();
    });
  }

  // Handle scroll event for the .slide-container
  onslideContainerScroll() {
    this.showScrollToTop = this.slideContainer.scrollTop > 200;
  }

  scrollToTop() {
    this.slideContainer.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
