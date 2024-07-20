import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-display.component.html',
  styleUrl: './file-display.component.css',
})
export class FileDisplayComponent implements OnInit {
  @Input('fileName') fileName: string = '';
  @Input('currentPath') currentPath: string = '';
  @Input('imageDownloadUrl') imageDownloadUrl: string = '';

  constructor(
    private readonly router: Router,
    private readonly fileService: FileService
  ) {}

  ngOnInit(): void {}

  viewFile() {
    this.fileService.setImageFolderPath(`${this.currentPath}/${this.fileName}`);
    this.fileService.setImageDownloadUrl(this.imageDownloadUrl);
    this.router.navigateByUrl('flip-book');
  }
}
