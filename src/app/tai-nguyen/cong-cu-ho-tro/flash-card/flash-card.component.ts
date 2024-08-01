import { Component, OnInit } from '@angular/core';
import { FileData, FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.css',
})
export class FlashCardComponent implements OnInit {
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
        console.log(this.files);
      });
  }
}
