import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Constant from '../../../shared/constants/Constant';
import { XemPdfComponent } from '../../xem-pdf/xem-pdf.component';

@Component({
  selector: 'app-phan-phoi-chuong-trinh',
  standalone: true,
  imports: [CommonModule, XemPdfComponent],
  templateUrl: './phan-phoi-chuong-trinh.component.html',
  styleUrl: './phan-phoi-chuong-trinh.component.css',
})
export class PhanPhoiChuongTrinhComponent implements OnInit {
  folderPath: string = '';
  bookIconUrl: string = '';
  titleName: string = '';

  pdfName: string = '';
  pdfDownloadUrl: string = '';
  isDisplayViewpdf: boolean = false;

  files: string[] = [];
  isLoadingFiles: boolean = true;
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

  getImgCover(fileName: string) {
    return Constant.IMAGE_PATHS.images
      .filter((x) => x.includes(fileName) && !x.includes('jpg'))[0]
      ?.split('public/')[1];
  }

  onViewPdf(fileName: string) {
    let filePath = Constant.FILE_PATH.files
      .filter((x) => x.includes(`files/${this.folderPath}/${fileName}`))[0]
      .split('public/')[1];

    if (filePath.includes('xlsx')) {
      this.downloadFile(fileName);
    } else {
      this.isDisplayViewpdf = true;

      this.pdfDownloadUrl = filePath;

      this.pdfName = filePath
        .slice(0, filePath.lastIndexOf('.'))
        .split('phan-phoi-chuong-trinh')[1];
    }
  }

  onCloseViewPdf(event: any) {
    if (event) {
      this.isDisplayViewpdf = false;
      this.pdfDownloadUrl = '';
      this.pdfName = '';
    }
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
