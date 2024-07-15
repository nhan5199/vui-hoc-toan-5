import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileData, FileService } from '../services/file.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  uploadProgress: number | undefined;
  files: FileData[] = [];
  downloadUrl: string | undefined;
  isUploadFile: boolean = false;

  constructor(
    private fileService: FileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listFiles();
  }

  // List files
  listFiles(): void {
    this.fileService.getFilesList('uploads').subscribe((files) => {
      this.files = files;
    });
  }

  // Download file
  downloadFile(fileName: string): void {
    const filePath = `uploads/${fileName}`;
    this.fileService.getFileUrl(filePath).subscribe((url) => {
      this.downloadUrl = url;
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

  onUploadFile() {
    setTimeout(() => {
      this.isUploadFile = !this.isUploadFile;
      this.cdr.detectChanges();
    }, 0);
  }
}
