import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileData, FileService } from '../../services/file.service';
import { CommonModule } from '@angular/common';
import { PdfService } from '../../services/pdf.services';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-paragraph',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.css',
})
export class ParagraphComponent implements OnInit {
  path: string = '';

  uploadProgress: number | undefined;
  files: FileData[] = [];
  downloadUrl: string | undefined;
  isUploadFile: boolean = false;

  pdfSrc!: string;
  images: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private cdr: ChangeDetectorRef,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.path += urlSegment.map((segment) => segment.path).join('/');

        this.listFiles();
      });
    });
  }

  // List files
  listFiles(): void {
    this.files = [];
    this.fileService.getFilesList(this.path).subscribe((files) => {
      files.forEach((file: any) => {
        this.files.push(file);
      });
    });
  }

  // Download file
  downloadFile(fileName: string): void {
    const filePath = `${this.path}/${fileName}`;
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

  viewFile(fileUrl: string) {
    this.downloadUrl = fileUrl;
  }
}
