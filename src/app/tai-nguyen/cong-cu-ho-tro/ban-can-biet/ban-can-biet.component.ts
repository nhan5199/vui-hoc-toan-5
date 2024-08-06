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

@Component({
  selector: 'app-ban-can-biet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ban-can-biet.component.html',
  styleUrl: './ban-can-biet.component.css',
})
export class BanCanBietComponent implements OnInit {
  files: FileData[] = [];

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
    cover = Constant.IMAGE_PATHS.images.find(
      (x) => x.includes(fileName?.split('.')[0]) && x.includes('image-0')
    );
    return cover?.split('public/')[1];
  }
}
