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

@Component({
  selector: 'app-flash-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flash-card-item.component.html',
  styleUrl: './flash-card-item.component.css',
})
export class FlashCardItemComponent implements OnInit {
  currentPath: string = '';
  files: FileData[] = [];

  isDisplayViewSlide: boolean = false;
  slideName: string = '';
  slideDownloadUrl: string = '';

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
        console.log(this.files);
      });
    });
  }

  // List files
  listFiles(): void {
    this.files = [];
    this.fileService
      .getFilesList(this.currentPath.split('//')[1])
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
        console.log(this.files);
      });
  }

  isLoading = true;
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
}
