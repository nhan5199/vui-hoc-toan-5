import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ImageLoaderService } from '../../../services/image-loader.service';
import { ToanDanGianButtonComponent } from '../../../components/buttons/toan-dan-gian-button/toan-dan-gian-button.component';
import { FileData } from '../../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../services/file.service';
import { finalize } from 'rxjs';
import Constant from '../../../shared/constants/Constant';
import { XemPdfComponent } from '../../../components/xem-pdf/xem-pdf.component';

@Component({
  selector: 'app-toan-dan-gian',
  standalone: true,
  imports: [CommonModule, ToanDanGianButtonComponent, XemPdfComponent],
  templateUrl: './toan-dan-gian.component.html',
  styleUrl: './toan-dan-gian.component.css',
})
export class ToanDanGianComponent implements AfterViewInit, OnInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private imageLoaderService: ImageLoaderService,
    private route: ActivatedRoute,
    private fileService: FileService
  ) {}

  isLoading = true;
  @ViewChild('toanDanGianContainer', { static: true })
  toanDanGianContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.toanDanGianContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  currentPath: string = '';
  files: FileData[] = [];

  pdfName: string = '';
  pdfDownloadUrl: string = '';
  isDisplayViewpdf: boolean = false;

  isLoadingFile: boolean = true;

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');

        this.listFiles();
      });
    });
  }

  // List files
  listFiles(): void {
    this.files = [];
    this.isLoadingFile = true;
    this.fileService
      .getFilesList(this.currentPath.split('//')[1])
      .pipe(finalize(() => (this.isLoadingFile = false)))
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
      });
  }

  onViewFile(event: any) {
    this.isDisplayViewpdf = true;
    this.pdfDownloadUrl = event.url;
    this.pdfName = event.name;
  }

  onCloseViewpdf(event: any) {
    if (event) {
      this.isDisplayViewpdf = false;
      this.pdfDownloadUrl = '';
      this.pdfName = '';
    }
  }

  getImgCover(file: FileData) {
    let imgPath = '';
    imgPath = Constant.IMAGE_PATHS.images.filter((x) =>
      x.includes(
        'images/images/' +
          this.currentPath.split('//')[1] +
          `/${file.name.split('.')[0]}`
      )
    )[0];
    return imgPath.split('public/')[1];
  }
}
