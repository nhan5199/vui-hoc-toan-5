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
import { DocumentPageComponent } from '../document-page/document-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xem-slide',
  standalone: true,
  imports: [CommonModule, DocumentPageComponent],
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
  isLoading = true;
  trackPage = (_: number, path: string) => path;
  showScrollToTop: boolean = false;
  slideContainer!: HTMLElement;
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slideName'] && this.slideName?.length > 0) {
      let imgsPath = '';
      if (this.selectedSemester?.length <= 0) {
        imgsPath = `${this.bookName}/${this.slideName.replace(/\.[^.]+$/, '')}/`;
      } else {
        imgsPath = `${this.bookName}/${this.selectedSemester}/${
          this.selectedWeek
        }/${this.slideName.replace(/\.[^.]+$/, '')}/`;
      }
      this.slides = Constant.findImages(imgsPath);
      this.sortImagePathsByNumber(this.slides);
      this.isLoading = this.slides.length > 0;
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
    if ((event.target as HTMLElement)?.classList.contains('slide') && this.el.nativeElement.contains(event.target)) {
      this.closeSlide.emit(true);
    }
  }

  ngAfterViewInit() {
    // Get the .slide-container element after the view has initialized
    this.slideContainer =
      this.el.nativeElement.querySelector('.slide-container');

  }

  // Handle scroll event for the .slide-container
  onslideContainerScroll() {
    this.showScrollToTop = this.slideContainer.scrollTop > 200;
  }

  scrollToTop() {
    this.slideContainer.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
