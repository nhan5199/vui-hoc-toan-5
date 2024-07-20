import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FileData, FileService } from '../../services/file.service';
import { FileDisplayComponent } from '../file-display/file-display.component';

@Component({
  selector: 'app-list-file',
  standalone: true,
  imports: [CommonModule, FileDisplayComponent, FileDisplayComponent],
  templateUrl: './list-file.component.html',
  styleUrl: './list-file.component.css',
})
export class ListFileComponent implements OnInit, OnChanges {
  @Input('folderPath') folderPath: string = '';

  path: string = '';
  files: FileData[] = [];
  bookshelfLines: any[][] = [];

  constructor(private readonly fileService: FileService) {}
  ngOnInit(): void {}

  listFiles(folderPath: string): void {
    this.files = [];
    this.fileService.getFilesList(folderPath).subscribe((files) => {
      files.forEach((file: any) => {
        this.files.push(file);
      });

      for (let i = 0; i < this.files.length; i += 4) {
        this.bookshelfLines.push(this.files.slice(i, i + 4));
      }
    });
  }

  // Download file
  downloadFile(fileName: string): void {
    const folderPath = `${this.path}/${fileName}`;
    this.fileService.getFileUrl(folderPath).subscribe((url) => {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folderPath']) {
      this.listFiles(this.folderPath);
    }
  }
}
