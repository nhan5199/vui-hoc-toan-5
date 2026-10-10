import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-xem-pdf',
  standalone: true,
  imports: [CommonModule, DocumentPageComponent],
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
  isLoading = true;
  trackPage = (_: number, path: string) => path;
  showScrollToTop: boolean = false;
  pdfContainer!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdfName'] && this.pdfName?.length > 0) {
      let imgsPath = '';
      if (this.bookName.includes('tai-nguyen')) {
        imgsPath = `${this.bookName}/${this.pdfName?.replace(/\.[^.]+$/, '')}/`;
      } else {
        if (this.selectedSemester?.length > 0) {
          imgsPath = `${this.bookName}/${this.selectedSemester}/${
            this.pdfName?.replace(/\.[^.]+$/, '')
          }/`;
        } else {
          imgsPath = `${this.bookName}${this.pdfName}`;
        }
      }

      this.pdfs = Constant.findImages(imgsPath);
      this.sortImagePathsByNumber(this.pdfs);
      this.isLoading = this.pdfs.length > 0;
    }
  }

  ngAfterViewInit() {
    // Get the .pdf-container element after the view has initialized
    this.pdfContainer = this.el.nativeElement.querySelector('.pdf-container');

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
    if ((event.target as HTMLElement)?.classList.contains('pdf') && this.el.nativeElement.contains(event.target)) {
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
