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
  selector: 'app-flip-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-book.component.html',
  styleUrl: './flip-book.component.css',
})
export class FlipBookComponent implements AfterViewInit, OnChanges {
  @Input('folderPath') folderPath: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  @Output('closeFlipBook')
  closeFlipBook: EventEmitter<boolean> = new EventEmitter<boolean>();

  listImgs: string[] = [];
  isLoading: boolean = true;

  currentPageIndex: number = 0; // Track the current page index

  constructor(private readonly el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folderPath'] && this.folderPath?.length > 0) {
      this.listImgs = Constant.IMAGE_PATHS.images.filter((x) =>
        x.includes(this.folderPath)
      );
      this.sortImagePathsByNumber(this.listImgs);
      this.downloadUrl = Constant.FILE_PATH.files
        .filter((x) =>
          x.includes('files/' + this.getFileDownloadPath(this.folderPath))
        )[0]
        .split('public/')[1];
    }
  }

  getFileDownloadPath(filePath: string): string {
    // Split the path into parts
    const parts = filePath.split('/');

    // Get the first part (e.g., "chan-troi-sang-tao")
    const root = parts[0];

    // Get the last part (e.g., "Sách KHBD.pdf")
    const fileName = parts[parts.length - 1];

    // Combine the root and the file name
    return `${root}/${parts[1]}/${fileName}`;
  }

  ngAfterViewInit(): void {
    const pages = document.querySelectorAll<HTMLDivElement>('.book .page');
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (i % 2 === 0) {
        page.style.zIndex = (pages.length - i).toString();
      }
    }

    pages.forEach((page, index) => {
      page.addEventListener('click', () => {
        this.flipPage(index, page);
      });
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
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

  onClick(direction: number) {
    const pages = document.querySelectorAll<HTMLDivElement>('.book .page');

    // Calculate the next page pair index based on the current page pair index and the direction
    let nextPagePairIndex = this.currentPageIndex + direction * 2;

    if (nextPagePairIndex < 0 || nextPagePairIndex >= pages.length) {
      return; // Do nothing if the next page pair index is out of bounds
    }

    // Flip the pages in pairs
    if (direction === -1 && this.currentPageIndex > 0) {
      this.flipPagePair(this.currentPageIndex - 2, pages);
      this.currentPageIndex -= 2;
    } else if (direction === 1 && this.currentPageIndex < pages.length - 2) {
      this.flipPagePair(this.currentPageIndex, pages);
      this.currentPageIndex += 2;
    }
  }

  flipPagePair(index: number, pages: NodeListOf<HTMLDivElement>) {
    if (index < 0 || index >= pages.length) return;

    // Flip the even page and the next odd page together
    const evenPage = pages[index];
    const oddPage = pages[index + 1];

    if (evenPage) {
      evenPage.classList.toggle('flipped');
    }
    if (oddPage) {
      oddPage.classList.toggle('flipped');
    }
  }

  flipPage(index: number, page: HTMLDivElement) {
    if (!page) return;
    if (index % 2 === 0) {
      // Even pages
      page.classList.toggle('flipped');
      const nextPage = page.nextElementSibling as HTMLDivElement;
      if (nextPage) {
        if (page.classList.contains('flipped')) {
          nextPage.classList.add('flipped');
        } else {
          nextPage.classList.remove('flipped');
        }
      }
      this.currentPageIndex += 2;
    } else {
      // Odd pages
      page.classList.toggle('flipped');
      const prevPage = page.previousElementSibling as HTMLDivElement;
      if (prevPage) {
        if (page.classList.contains('flipped')) {
          prevPage.classList.add('flipped');
        } else {
          prevPage.classList.remove('flipped');
        }
      }
      this.currentPageIndex -= 2;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.onClick(-1);
    } else if (event.key === 'ArrowRight') {
      this.onClick(+1);
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const clickedInside = this.el.nativeElement
      .querySelector('.flip-book .book')
      .contains(event.target as Node);
    if (!clickedInside) {
      this.closeFlipBook.emit(true);
    }
  }
}
