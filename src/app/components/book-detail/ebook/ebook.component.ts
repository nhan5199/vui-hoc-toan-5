import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData, FileService } from '../../../services/file.service';
import { EBookButtonComponent } from '../../buttons/ebook-button/ebook-button.component';
import { CommonModule } from '@angular/common';
import { FlipBookComponent } from '../../flip-book/flip-book.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ebook',
  standalone: true,
  imports: [EBookButtonComponent, CommonModule, FlipBookComponent],
  templateUrl: './ebook.component.html',
  styleUrl: './ebook.component.css',
})
export class EBookComponent implements OnInit {
  bookName: string = '';
  bookIconUrl: string = '';
  folderPath: string = '';
  files: FileData[] = [];

  currentImgPath: string = '';
  currentDownloadUrl: string = '';
  isDisplayFlipBook: boolean = false;

  isLoadingFile: boolean = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fileService: FileService
  ) {}

  ngOnInit(): void {
    this.bookName = this.route.snapshot.paramMap.get('bookName')!;
    this.bookIconUrl = `images/images/${this.bookName}-icon.jpg`;
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');

        this.listFiles();
      });
    });
  }

  listFiles(): void {
    this.isLoadingFile = true;
    this.files = [];
    this.fileService
      .getFilesList(this.folderPath)
      .pipe(finalize(() => (this.isLoadingFile = false)))
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
      });
  }

  getTitle() {
    let title = 'E-book ';
    if (this.bookName == 'canh-dieu') {
      title += 'Cánh Diều';
    } else if (this.bookName == 'chan-troi-sang-tao') {
      title += 'Chân trời sáng tạo';
    } else {
      title += 'Kết nối tri thức';
    }
    return title;
  }

  onViewBook(event: any) {
    this.currentImgPath = event?.name;
    this.currentDownloadUrl = event?.url;
    this.isDisplayFlipBook = true;
  }

  onCloseFlipBook(event: any) {
    if (event) this.isDisplayFlipBook = false;
  }
}
