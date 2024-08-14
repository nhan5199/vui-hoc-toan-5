import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FileData, FileService } from '../../../services/file.service';
import { RouterLink } from '@angular/router';
import { ImageLoaderService } from '../../../services/image-loader.service';
import Constant from '../../../shared/constants/Constant';
import { XemSlideComponent } from '../../../components/xem-slide/xem-slide.component';

@Component({
  selector: 'app-ban-can-biet',
  standalone: true,
  imports: [CommonModule, RouterLink, XemSlideComponent],
  templateUrl: './ban-can-biet.component.html',
  styleUrl: './ban-can-biet.component.css',
})
export class BanCanBietComponent implements OnInit {
  files: FileData[] = [];

  currentUrl: number = 0;
  downloadUrl: string = '';

  slideName: string = '';
  slideDownloadUrl: string = '';
  isDisplayViewSlide: boolean = false;

  constructor(
    private readonly fileService: FileService,
    private readonly imageLoaderService: ImageLoaderService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    let fileDownload: FileData[] = [];
    this.fileService
      .getFilesList('tai-nguyen/cong-cu-ho-tro/ban-can-biet')
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
      });
  }

  isLoading = true;
  @ViewChild('banCanBietContainer', { static: true })
  banCanBietContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.banCanBietContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  getCoverUrl(fileName: string) {
    let cover!: string | undefined;
    console.log(fileName?.split('.')[0]);
    cover = Constant.IMAGE_PATHS.images.find(
      (x) => x.includes(fileName?.split('.')[0]) && x.includes('images-0')
    );
    return cover?.split('public/')[1];
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
