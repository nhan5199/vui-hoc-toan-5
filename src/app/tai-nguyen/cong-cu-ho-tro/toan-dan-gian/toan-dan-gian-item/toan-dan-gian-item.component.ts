import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ImageLoaderService } from '../../../../services/image-loader.service';
import { CommonModule } from '@angular/common';
import { FileData, FileService } from '../../../../services/file.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toan-dan-gian-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toan-dan-gian-item.component.html',
  styleUrl: './toan-dan-gian-item.component.css',
})
export class ToanDanGianItemComponent implements AfterViewInit {
  folderPath: string = '';
  files: FileData[] = [];
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
      console.log(this.files);
    });
  }

  isLoading = true;
  @ViewChild('toanDanGianItemContainer', { static: true })
  toanDanGianItemContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(
      this.toanDanGianItemContainer,
      () => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    );
  }
}
