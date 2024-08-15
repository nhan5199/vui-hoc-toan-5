import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FileData, FileService } from '../../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImageLoaderService } from '../../../../services/image-loader.service';
import { constants } from 'node:buffer';
import Constant from '../../../../shared/constants/Constant';
import { XemSlideComponent } from '../../../../components/xem-slide/xem-slide.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-flash-card-item',
  standalone: true,
  imports: [CommonModule, XemSlideComponent],
  templateUrl: './flash-card-item.component.html',
  styleUrl: './flash-card-item.component.css',
})
export class FlashCardItemComponent implements OnInit {
  currentPath: string = '';
  files: FileData[] = [];

  slideName: string = '';
  slideDownloadUrl: string = '';
  isDisplayViewSlide: boolean = false;

  isLoadingFile: boolean = true;
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private imageLoaderService: ImageLoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

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

  @ViewChild('flashCardItemContainer', { static: true })
  flashCardItemContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(
      this.flashCardItemContainer,
      () => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    );
  }

  getDownloadUrl(fileName: string) {
    let downloadUrl = Constant.FILE_PATH.files.filter((x) =>
      x.includes(this.currentPath.split('//')[1] + `/${fileName.split('.')[0]}`)
    );
    return downloadUrl[0].split('public/')[1];
  }

  onViewFile(event: any) {
    this.isDisplayViewSlide = true;
    this.slideDownloadUrl = event.url;
    this.slideName = event.name;
  }

  onCloseViewSlide(event: any) {
    if (event) {
      this.isDisplayViewSlide = false;
      this.slideDownloadUrl = '';
      this.slideName = '';
    }
  }
}
