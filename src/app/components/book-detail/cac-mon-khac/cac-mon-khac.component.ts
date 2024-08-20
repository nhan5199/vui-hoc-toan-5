import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData } from '../../../services/database.service';
import { CommonModule } from '@angular/common';
import Constant from '../../../shared/constants/Constant';
import { CacMonKhacButtonComponent } from '../../buttons/cac-mon-khac-button/cac-mon-khac-button.component';

@Component({
  selector: 'app-cac-mon-khac',
  standalone: true,
  imports: [CommonModule, CacMonKhacButtonComponent],
  templateUrl: './cac-mon-khac.component.html',
  styleUrl: './cac-mon-khac.component.css',
})
export class CacMonKhacComponent implements OnInit {
  folderPath: string = '';
  bookIconUrl: string = '';
  titleName: string = '';

  files: any[] = [];
  isLoadingFiles: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath += urlSegment.map((segment) => segment.path).join('/');
      });

      if (this.folderPath.includes('canh-dieu')) {
        this.titleName = 'Cánh Diều';
        this.bookIconUrl = 'images/images/canh-dieu-icon.jpg';
      } else if (this.folderPath.includes('ket-noi-tri-thuc')) {
        this.titleName = 'Kết nối tri thức với cuộc sống';
        this.bookIconUrl = 'images/images/ket-noi-tri-thuc-icon.jpg';
      } else {
        this.titleName = 'Chân trời sáng tạo';
        this.bookIconUrl = 'images/images/chan-troi-sang-tao-icon.jpg';
      }

      this.getListFolder();
    });
  }

  getListFolder() {
    this.isLoadingFiles = true;
    this.files = Array.from(
      new Set(
        Constant.FILE_PATH.files.map((path) => {
          if (path.includes(this.folderPath)) {
            const parts = path.split('/');
            return parts[parts.length - 2];
          } else return '';
        })
      )
    ).filter((x) => x.length > 0);

    setTimeout(() => {
      this.isLoadingFiles = false;
    }, 500);
  }

  getDownloadUrl(fileName: string) {
    return Constant.FILE_PATH.files
      .filter((x) => x.includes(`files/${this.folderPath}/${fileName}`))[0]
      ?.split('public/')[1];
  }

  downloadFile(fileName: string): void {
    const fileUrl = Constant.FILE_PATH.files
      .filter((x) => x.includes(`files/${this.folderPath}/${fileName}`))[0]
      .split('public/')[1];
    const link = document.createElement('a');
    link.href = fileUrl;

    let filePath = Constant.FILE_PATH.files
      .filter((x) => x.includes(`files/${this.folderPath}/${fileName}`))[0]
      .split('public/')[1];

    let filePathParts = filePath.split('/');
    link.download = filePathParts[filePathParts.length - 1];
    link.click();
  }
}
