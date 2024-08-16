import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ImageLoaderService } from '../../../services/image-loader.service';
import { CommonModule } from '@angular/common';
import { FileData } from '../../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../services/file.service';
import { XemSlideComponent } from '../../../components/xem-slide/xem-slide.component';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule, XemSlideComponent],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css',
})
export class QuizzComponent implements AfterViewInit, OnInit {
  constructor(
    private imageLoaderService: ImageLoaderService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private fileService: FileService
  ) {}

  files: FileData[] = [];
  folderPath: string = '';

  isDisplayViewSlide: boolean = false;
  slideName: string = '';
  slideDownloadUrl: string = '';

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');
        this.listFiles();
      });
    });
  }

  // List files
  listFiles(): void {
    this.files = [];
    this.fileService
      .getFilesList(this.folderPath.split('//')[1])
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
      });
  }

  isLoading = true;
  @ViewChild('quizzContainer', { static: true })
  quizzContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.quizzContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  onViewSlide(event: any) {
    this.slideName = event.name;
    this.slideDownloadUrl = `files/${this.folderPath.split('//')[1]}/${
      event.name
    }`;
    this.isDisplayViewSlide = true;
  }

  onCloseViewSlide(event: boolean) {
    if (event) {
      this.isDisplayViewSlide = false;
      this.slideName = '';
      this.slideDownloadUrl = '';
    }
  }

  getCoverImage(file: FileData, text: string) {
    return `images/images/${this.folderPath.split('//')[1]}/${
      file.name.split('.')[0]
    }/${file.name.split('.')[0]}_${text}.jpg`;
  }
}
