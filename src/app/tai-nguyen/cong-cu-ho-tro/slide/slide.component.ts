import { Component, OnInit } from '@angular/core';
import { FileData, FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { SlideButtonComponent } from '../../../components/buttons/slide-button/slide-button.component';
import { CommonModule } from '@angular/common';
import { XemSlideComponent } from '../../../components/xem-slide/xem-slide.component';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [SlideButtonComponent, CommonModule, XemSlideComponent],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css',
})
export class SlideComponent implements OnInit {
  currentPath: string = '';
  files: FileData[] = [];

  isDisplayViewSlide: boolean = false;
  slideName: string = '';
  slideDownloadUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService
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
    this.fileService
      .getFilesList(this.currentPath.split('//')[1])
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
      });
  }

  onViewSlide(event: any) {
    this.slideName = event.name;
    this.slideDownloadUrl = event.url;
    this.isDisplayViewSlide = true;
  }

  onCloseViewSlide(event: boolean) {
    if (event) this.isDisplayViewSlide = false;
  }
}
