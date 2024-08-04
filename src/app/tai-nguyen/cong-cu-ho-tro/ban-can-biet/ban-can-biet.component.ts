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

@Component({
  selector: 'app-ban-can-biet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ban-can-biet.component.html',
  styleUrl: './ban-can-biet.component.css',
})
export class BanCanBietComponent implements OnInit {
  imgUrls: string[] = [
    'images/images/tai-nguyen/ban-can-biet/Slide1.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide2.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide3.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide4.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide5.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide6.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide7.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide8.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide9.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide10.PNG',
    'images/images/tai-nguyen/ban-can-biet/Slide11.PNG',
  ];

  currentUrl: number = 0;
  downloadUrl: string = '';

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
          fileDownload.push(file);
        });
        this.downloadUrl = fileDownload[0].url;
      });
  }

  onClick(event: number) {
    this.currentUrl += event;
    if (this.currentUrl < 0) {
      this.currentUrl = this.imgUrls.length - 1;
    } else if (this.currentUrl > this.imgUrls.length - 1) {
      this.currentUrl = 0;
    }
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
}
