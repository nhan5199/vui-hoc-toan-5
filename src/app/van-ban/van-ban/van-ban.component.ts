import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData, FileService } from '../../services/file.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-van-ban',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './van-ban.component.html',
  styleUrl: './van-ban.component.css',
})
export class VanBAnComponent implements OnInit {
  path: string = '';
  files: FileData[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly fileService: FileService
  ) {}
  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.path += urlSegment.map((segment) => segment.path).join('/');
        console.log('data: ', this.path);

        this.listFiles();
      });
    });
  }

  listFiles(): void {
    this.files = [];
    this.fileService.getFilesList(this.path).subscribe((files) => {
      files.forEach((file: any) => {
        this.files.push(file);
        console.log(files);
      });
    });
  }

  // Download file
  downloadFile(fileName: string): void {
    const filePath = `${this.path}/${fileName}`;
    this.fileService.getFileUrl(filePath).subscribe((url) => {
      window.open(url, '_blank');
    });
  }

  getFileType(fileName: string) {
    if (fileName.includes('.pdf')) {
      return 'icons/pdf.png';
    } else if (fileName.includes('.docx') || fileName.includes('.doc')) {
      return 'icons/word.png';
    } else if (fileName.includes('.ppt')) {
      return 'icons/ppt.png';
    } else {
      return null;
    }
  }
}
