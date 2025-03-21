import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { VanBanButtonComponent } from '../../components/buttons/van-ban-button/van-ban-button.component';
import { FileData, FileService } from '../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlipBookComponent } from '../../components/flip-book/flip-book.component';
import { ImageLoaderService } from '../../services/image-loader.service';
import { XemPdfComponent } from '../../components/xem-pdf/xem-pdf.component';
import { ScreenSizeService } from '../../services/screen-size.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-van-ban-quy-dinh',
  standalone: true,
  imports: [
    VanBanButtonComponent,
    CommonModule,
    FlipBookComponent,
    XemPdfComponent,
  ],
  templateUrl: './van-ban-quy-dinh.component.html',
  styleUrl: './van-ban-quy-dinh.component.css',
})
export class VanBanQUyDinhComponent implements OnInit {
  folderPath: string = '';
  files: FileData[] = [];
  isLoadingFiles: boolean = true;

  isDisplayFlipBook: boolean = false;
  currentImgPath: string = '';
  currentDownloadUrl: string = '';

  pdfName: string = '';
  pdfDownloadUrl: string = '';
  isDisplayViewpdf: boolean = false;
  isMobileScreen: boolean = false;

  constructor(
    private readonly fileService: FileService,
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly imageLoaderService: ImageLoaderService,
    private screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');

        this.listFiles();
      });
    });

    //detect mobile screen
    this.screenSizeService.isMobileScreen$.subscribe((isMobile) => {
      this.isMobileScreen = isMobile;
    });
  }

  listFiles(): void {
    this.isLoadingFiles = true;
    this.files = [];
    this.fileService
      .getFilesList(this.folderPath)
      .pipe(finalize(() => (this.isLoadingFiles = false)))
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
      });
  }

  onViewFile(event: any) {
    // if (
    //   event.name.includes('Tai-lieu-Giao-duc-Ki-nang-Cong-dan-so-17.04.24') ||
    //   event.name.includes('4670qdbgddttai-lieu-kem-theo') ||
    //   this.isMobileScreen
    // ) {
    //   this.onViewPdf(event);
    // } else {
    //   this.currentImgPath = event?.name?.split('//')[1];
    //   this.currentDownloadUrl = `files/${this.folderPath.split('//')[1]}/${
    //     event.name
    //   }`;
    //   this.isDisplayFlipBook = true;
    // }
    this.onViewPdf(event);
  }

  onCloseFlipBook(event: any) {
    if (event) this.isDisplayFlipBook = false;
  }

  isLoading = true;
  @ViewChild('vanBanQuyDinhContainer', { static: true })
  vanBanQuyDinhContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(
      this.vanBanQuyDinhContainer,
      () => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    );
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
