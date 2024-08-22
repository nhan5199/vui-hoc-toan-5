import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData, FileService } from '../../../services/file.service';
import { EBookButtonComponent } from '../../buttons/ebook-button/ebook-button.component';
import { CommonModule } from '@angular/common';
import { FlipBookComponent } from '../../flip-book/flip-book.component';
import { finalize } from 'rxjs';
import { ImageLoaderService } from '../../../services/image-loader.service';
import { XemPdfComponent } from '../../xem-pdf/xem-pdf.component';

@Component({
  selector: 'app-ebook',
  standalone: true,
  imports: [
    EBookButtonComponent,
    CommonModule,
    FlipBookComponent,
    XemPdfComponent,
  ],
  templateUrl: './ebook.component.html',
  styleUrl: './ebook.component.css',
})
export class EBookComponent implements OnInit, AfterViewInit {
  bookName: string = '';
  bookIconUrl: string = '';
  folderPath: string = '';
  files: FileData[] = [];

  currentImgPath: string = '';
  currentDownloadUrl: string = '';
  isDisplayFlipBook: boolean = false;

  isLoadingFile: boolean = true;
  isLoading: boolean = true;

  pdfName: string = '';
  pdfDownloadUrl: string = '';
  isDisplayViewpdf: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fileService: FileService,
    private imageLoaderService: ImageLoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookName = this.route.snapshot.paramMap.get('bookName')!;
    this.bookIconUrl = `images/images/${this.bookName}-icon.jpg`;
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');

        this.listFiles();
      });
    });
  }

  listFiles(): void {
    this.isLoadingFile = true;
    this.files = [];
    this.fileService
      .getFilesList(this.folderPath)
      .pipe(finalize(() => (this.isLoadingFile = false)))
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
      });
  }

  getTitle() {
    let title = 'E-book ';
    if (this.bookName == 'canh-dieu') {
      title += 'Cánh Diều';
    } else if (this.bookName == 'chan-troi-sang-tao') {
      title += 'Chân trời sáng tạo';
    } else {
      title += 'Kết nối tri thức';
    }
    return title;
  }

  onViewBook(event: any) {
    if (event.name.includes('SGK')) {
      this.currentImgPath = event?.name;
      this.currentDownloadUrl = event?.url;
      this.isDisplayFlipBook = true;
    } else {
      this.onViewPdf(event);
    }
  }

  onCloseFlipBook(event: any) {
    if (event) this.isDisplayFlipBook = false;
  }

  @ViewChild('ebookContainer', { static: true })
  ebookContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.ebookContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  onViewPdf(event: any) {
    this.isDisplayViewpdf = true;
    this.pdfDownloadUrl = event.url;
    this.pdfName = event.name;
  }

  onCloseViewPdf(event: any) {
    if (event) {
      this.isDisplayViewpdf = false;
      this.pdfDownloadUrl = '';
      this.pdfName = '';
    }
  }
}
