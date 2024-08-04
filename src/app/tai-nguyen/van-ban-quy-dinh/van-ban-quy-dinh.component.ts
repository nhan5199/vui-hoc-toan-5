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

@Component({
  selector: 'app-van-ban-quy-dinh',
  standalone: true,
  imports: [VanBanButtonComponent, CommonModule, FlipBookComponent],
  templateUrl: './van-ban-quy-dinh.component.html',
  styleUrl: './van-ban-quy-dinh.component.css',
})
export class VanBanQUyDinhComponent implements OnInit {
  folderPath: string = '';
  files: FileData[] = [];

  isDisplayFlipBook: boolean = false;
  currentImgPath: string = '';
  currentDownloadUrl: string = '';

  constructor(
    private readonly fileService: FileService,
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly imageLoaderService: ImageLoaderService
  ) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');

        this.listFiles();
      });
    });
  }

  listFiles(): void {
    this.files = [];
    this.fileService.getFilesList(this.folderPath).subscribe((files) => {
      files.forEach((file: any) => {
        this.files.push(file);
      });
    });
  }

  onViewFile(event: any) {
    this.currentImgPath = event?.name?.split('//')[1];
    this.currentDownloadUrl = event?.url;
    this.isDisplayFlipBook = true;
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
}
