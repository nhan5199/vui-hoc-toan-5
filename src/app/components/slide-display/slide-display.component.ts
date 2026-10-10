import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { CommonModule, Location } from '@angular/common';
import Constant from '../../shared/constants/Constant';
import { PreviewService } from '../../services/preview.service';

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
  loadError = false;
  async imageLoaded(event: Event): Promise<void> {
    const index = this.activeImg;
    const img = event.target as HTMLImageElement;
    try { await img.decode(); } catch { }
    if (index === this.activeImg) { this.loading = false; this.cdr.markForCheck(); }
  }
  imageFailed(): void { this.loading = false; this.loadError = true; }
  retryImage(): void {
    this.loadError = false;
    this.loading = true;
  }

  constructor(
    public previews: PreviewService,
    private readonly fileService: FileService,
    private cdr: ChangeDetectorRef,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.imageFolderPath = this.fileService.getImageFolderPath();
    this.imageDownloadUrl = this.fileService.getImageDownloadUrl();
    if (this.imageFolderPath?.length > 0) {
      this.listImagePaths = Constant.findImages(this.imageFolderPath);

      let path = `${this.imageFolderPath}`;
      this.listImagePaths = this.listImagePaths.filter((x) => x.includes(path));

      this.sortImagePathsByNumber(this.listImagePaths);
    }
    this.loading = this.listImagePaths.length > 0;
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
    if (!this.listImagePaths.length) return;
    this.loading = true;
    this.loadError = false;
    this.activeImg += action;

    if (this.activeImg < 0) {
      this.activeImg = this.listImagePaths.length - 1;
    } else if (this.activeImg >= this.listImagePaths.length) {
      this.activeImg = 0;
    }
  }

  onBack() {
    this.location.back();
  }
}
