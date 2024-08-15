import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import Constant from '../../shared/constants/Constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xem-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xem-pdf.component.html',
  styleUrl: './xem-pdf.component.css',
})
export class XemPdfComponent implements OnChanges, AfterViewInit {
  @Input('pdfName') pdfName: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  @Input('bookName') bookName: string = '';
  @Input('selectedSemester') selectedSemester: string = '';
  @Output('closepdf')
  closepdf: EventEmitter<boolean> = new EventEmitter<boolean>();

  pdfs: string[] = [];
  showScrollToTop: boolean = false;
  pdfContainer!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdfName'] && this.pdfName?.length > 0) {
      let imgsPath = '';
      if (this.bookName.includes('tai-nguyen')) {
        imgsPath = `${this.bookName}/${this.pdfName?.split('.')[0]}/`;
      } else {
        imgsPath = `${this.bookName}/${this.selectedSemester}/${
          this.pdfName?.split('.')[0]
        }/`;
      }
      this.pdfs = Constant.IMAGE_PATHS.images.filter((x: any) =>
        x.includes(imgsPath)
      );
      this.sortImagePathsByNumber(this.pdfs);
    }
  }

  ngAfterViewInit() {
    // Get the .pdf-container element after the view has initialized
    this.pdfContainer = this.el.nativeElement.querySelector('.pdf-container');

    // Listen to scroll events on the .pdf-container
    this.pdfContainer.addEventListener('scroll', () => {
      this.onPdfContainerScroll();
    });
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
      .querySelector('.pdf .pdf-container .content img')
      ?.contains(event.target as Node);
    const clickedScrollToTop = this.el.nativeElement
      .querySelector('.pdf .scroll-to-top img')
      ?.contains(event.target as Node);
    const clickedDownload = this.el.nativeElement
      .querySelector('.slide a')
      ?.contains(event.target as Node);
    if (!clickedInside && !clickedScrollToTop && !clickedDownload) {
      this.closepdf.emit(true);
    }
  }

  // Handle scroll event for the .pdf-container
  onPdfContainerScroll() {
    this.showScrollToTop = this.pdfContainer.scrollTop > 200;
  }

  scrollToTop() {
    this.pdfContainer.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
