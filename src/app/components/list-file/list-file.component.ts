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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-file',
  standalone: true,
  imports: [
    CommonModule,
    FileDisplayComponent,
    FileDisplayComponent,
    FormsModule,
  ],
  templateUrl: './list-file.component.html',
  styleUrl: './list-file.component.css',
})
export class ListFileComponent implements OnInit, OnChanges {
  @Input('folderPath') folderPath: string = '';

  files: FileData[] = [];
  bookshelfLines: any[][] = [];

  selectedWeek: string = 'tuan-1'; // Property to hold the selected value
  weeks: Array<{ value: string; viewValue: string }> = [
    // Options for the select box
    { value: 'tuan-1', viewValue: 'Tuần 1' },
    { value: 'tuan-2', viewValue: 'Tuần 2' },
    { value: 'tuan-3', viewValue: 'Tuần 3' },
    { value: 'tuan-4', viewValue: 'Tuần 4' },
    { value: 'tuan-5', viewValue: 'Tuần 5' },
    { value: 'tuan-6', viewValue: 'Tuần 6' },
    { value: 'tuan-7', viewValue: 'Tuần 7' },
    { value: 'tuan-8', viewValue: 'Tuần 8' },
    { value: 'tuan-9', viewValue: 'Tuần 9' },
    { value: 'tuan-10', viewValue: 'Tuần 10' },
    { value: 'tuan-11', viewValue: 'Tuần 11' },
    { value: 'tuan-12', viewValue: 'Tuần 12' },
    { value: 'tuan-13', viewValue: 'Tuần 13' },
    { value: 'tuan-14', viewValue: 'Tuần 14' },
    { value: 'tuan-15', viewValue: 'Tuần 15' },
    { value: 'tuan-16', viewValue: 'Tuần 16' },
    { value: 'tuan-17', viewValue: 'Tuần 17' },
    { value: 'tuan-18', viewValue: 'Tuần 18' },
  ];

  selectedSemester: string = 'hoc-ki-1'; // Property to hold the selected value
  semesters: Array<{ value: string; viewValue: string }> = [
    // Options for the select box
    { value: 'hoc-ki-1', viewValue: 'Học kì 1' },
    { value: 'hoc-ki-2', viewValue: 'Học kì 2' },
  ];

  bookIcon: string = '/images/images/';

  constructor(private readonly fileService: FileService) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folderPath']) {
      this.listFiles(this.folderPath);
      this.bookIcon =
        'images/images/' +
        this.folderPath.split('/')[1].split('/')[0] +
        '-icon.jpg';
      this.selectedSemester = 'hoc-ki-1';
      this.selectedWeek = 'tuan-1';
    }
  }

  listFiles(folderPath: string): void {
    this.files = [];
    this.bookshelfLines = [];

    this.files = [
      {
        name: 'GIỚI THIỆU SÁCH GIÁO KHOA.docx',
        url: 'https://firebasestorage.googleapis.com/v0/b/vui-hoc-toan-5.appspot.com/o/canh-dieu%2Fe-book%2FGI%E1%BB%9AI%20THI%E1%BB%86U%20S%C3%81CH%20GI%C3%81O%20KHOA.docx?alt=media&token=20263ed0-fb51-4ee5-95db-7fb25033d834',
      },
      {
        name: 'Sách Tiếng Việt 5 cho Giáo viên.pdf',
        url: 'https://firebasestorage.googleapis.com/v0/b/vui-hoc-toan-5.appspot.com/o/canh-dieu%2Fe-book%2FS%C3%A1ch%20Ti%E1%BA%BFng%20Vi%E1%BB%87t%205%20cho%20Gi%C3%A1o%20vi%C3%AAn.pdf?alt=media&token=f59d3823-33db-41ad-a7af-38c26abc3a9d',
      },
      {
        name: 'Sách Toán 5 cho Giáo viên.pdf',
        url: 'https://firebasestorage.googleapis.com/v0/b/vui-hoc-toan-5.appspot.com/o/canh-dieu%2Fe-book%2FS%C3%A1ch%20To%C3%A1n%205%20cho%20Gi%C3%A1o%20vi%C3%AAn.pdf?alt=media&token=9559b1f6-143b-4525-a527-e76d20d5076e',
      },
      {
        name: 'sgk Toán 5 tập 1 CD.pdf',
        url: 'https://firebasestorage.googleapis.com/v0/b/vui-hoc-toan-5.appspot.com/o/canh-dieu%2Fe-book%2Fsgk%20To%C3%A1n%205%20t%E1%BA%ADp%201%20CD.pdf?alt=media&token=dfd2e90b-bd65-4602-91f2-97e3307875a7',
      },
      {
        name: 'sgk Toán 5 tập 2 CD.pdf',
        url: 'https://firebasestorage.googleapis.com/v0/b/vui-hoc-toan-5.appspot.com/o/canh-dieu%2Fe-book%2Fsgk%20To%C3%A1n%205%20t%E1%BA%ADp%202%20CD.pdf?alt=media&token=f8285832-e391-4e42-84ff-3fe842e3fa13',
      },
    ];

    for (let i = 0; i < this.files.length; i += 4) {
      this.bookshelfLines.push(this.files.slice(i, i + 4));
    }
    // this.fileService.getFilesList(folderPath).subscribe((files) => {
    //   files.forEach((file: any) => {
    //     this.files.push(file);
    //   });

    //   for (let i = 0; i < this.files.length; i += 4) {
    //     this.bookshelfLines.push(this.files.slice(i, i + 4));
    //   }
    // });
  }

  // Download file
  downloadFile(fileName: string): void {
    const folderPath = `${this.folderPath}/${fileName}`;
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

  getFileImage(fileName: string) {
    let lastDotIndex = fileName.lastIndexOf('.');
    let fileType = fileName.substring(lastDotIndex + 1);
    let imgSrc = 'icons/';
    if (fileType.toLowerCase() == 'pdf') {
      imgSrc += 'pdf.png';
    } else if (
      fileType.toLowerCase() == 'doc' ||
      fileType.toLowerCase() == 'docx'
    ) {
      imgSrc += 'word.png';
    } else if (fileType.toLowerCase() == 'pptx') {
      imgSrc += 'ppt.png';
    }
    return imgSrc;
  }
}
