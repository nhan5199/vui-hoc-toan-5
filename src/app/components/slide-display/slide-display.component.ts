import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { CommonModule, Location } from '@angular/common';
import Constant from '../../shared/constants/Constant';

@Component({
  selector: 'app-slide-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-display.component.html',
  styleUrl: './slide-display.component.css',
})
export class SlideDisplayComponent implements OnInit {
  imageFolderPath: string = '';
  imageDownloadUrl: string = '';
  listImagePaths: string[] = [];
  content: any[] = [];

  loading: boolean = true;

  constructor(
    private readonly fileService: FileService,
    private cdr: ChangeDetectorRef,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.imageFolderPath = this.fileService.getImageFolderPath();
    this.imageDownloadUrl = this.fileService.getImageDownloadUrl();
    if (this.imageFolderPath?.length > 0) {
      this.listImagePaths = Constant.IMAGE_PATHS.images.filter((x) =>
        x.includes(this.imageFolderPath)
      );

      let path = `${this.imageFolderPath}`;
      this.listImagePaths = this.listImagePaths.filter((x) => x.includes(path));

      this.sortImagePathsByNumber(this.listImagePaths);
    }
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

  activeImg: number = 0;
  setActiveImg(action: number) {
    this.activeImg += action;

    if (this.activeImg < 0) {
      this.activeImg = this.listImagePaths.length - 1;
    } else if (this.activeImg >= this.listImagePaths.length) {
      this.activeImg = 0;
    }
    console.log('data: ', this.activeImg);
  }

  onBack() {
    this.location.back();
  }
}
