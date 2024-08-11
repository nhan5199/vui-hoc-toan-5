import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileData, FileService } from '../../../services/file.service';
import { GiaoAnDienTuButtonComponent } from '../../buttons/giao-an-dien-tu-button/giao-an-dien-tu-button.component';

@Component({
  selector: 'app-giao-an-dien-tu',
  standalone: true,
  imports: [GiaoAnDienTuButtonComponent, FormsModule, CommonModule],
  templateUrl: './giao-an-dien-tu.component.html',
  styleUrl: './giao-an-dien-tu.component.css',
})
export class GiaoAnDienTuComponent implements OnInit {
  bookName: string = '';
  bookIconUrl: string = '';
  folderPath: string = '';
  // files: FileData[] = [];

  files: any[] = [];
  selectedSemester = 'hoc-ki-1';
  semesterOptions = [
    { value: 'hoc-ki-1', label: 'Học kì 1' },
    { value: 'hoc-ki-2', label: 'Học kì 2' },
  ];

  selectedWeek: string = 'tuan-1';
  weekOptions = [
    { value: 'tuan-1', label: 'Tuần 1' },
    { value: 'tuan-2', label: 'Tuần 2' },
    { value: 'tuan-3', label: 'Tuần 3' },
    { value: 'tuan-4', label: 'Tuần 4' },
    { value: 'tuan-5', label: 'Tuần 5' },
    { value: 'tuan-6', label: 'Tuần 6' },
    { value: 'tuan-7', label: 'Tuần 7' },
    { value: 'tuan-8', label: 'Tuần 8' },
    { value: 'tuan-9', label: 'Tuần 9' },
    { value: 'tuan-10', label: 'Tuần 10' },
    { value: 'tuan-11', label: 'Tuần 11' },
    { value: 'tuan-12', label: 'Tuần 12' },
    { value: 'tuan-13', label: 'Tuần 13' },
    { value: 'tuan-14', label: 'Tuần 14' },
    { value: 'tuan-15', label: 'Tuần 15' },
    { value: 'tuan-16', label: 'Tuần 16' },
    { value: 'tuan-17', label: 'Tuần 17' },
    { value: 'tuan-18', label: 'Tuần 18' },
  ];

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

        // this.listFiles();
        this.getListTempFiles();
      });
    });

    if (this.bookName == 'canh-dieu') {
      this.defaultImgUrl = 'images/images/canh-dieu-icon.jpg';
    } else if (this.bookName == 'chan-troi-sang-tao') {
      this.defaultImgUrl = 'images/images/chan-troi-sang-tao-icon.jpg';
    } else {
      this.defaultImgUrl = 'images/images/ket-noi-tri-thuc-icon.jpg';
    }
  }

  onChangeSemester() {}

  onChangeWeek() {}

  getListTempFiles() {}

  listFiles(): void {
    this.files = [];
    this.fileService.getFilesList(this.folderPath).subscribe((files) => {
      files.forEach((file: any) => {
        this.files.push(file);
      });

      this.sortFilesByName(this.files);
    });
  }

  getTitle() {
    if (this.bookName == 'canh-dieu') {
      return 'Cánh Diều';
    } else if (this.bookName == 'chan-troi-sang-tao') {
      return 'Chân trời sáng tạo';
    } else {
      return 'Kết nối tri thức với cuộc sống';
    }
  }

  defaultImgUrl = '';
  getImgUrl1() {
    if (this.bookName == 'canh-dieu') {
      return 'images/Tuan1_Bai1_Tiet1_Toan5_CD.png';
    } else if (this.bookName == 'chan-troi-sang-tao') {
      return 'images/Tuan1_Bai1_Tiet1_Toan5_KNTT.png';
    } else {
      return this.defaultImgUrl;
    }
  }

  getImgUrl2() {
    if (this.bookName == 'canh-dieu') {
      return 'images/Tuan1_Bai1_Tiet2_Toan5_CD.png';
    } else if (this.bookName == 'chan-troi-sang-tao') {
      return 'images/Tuan1_Bai1_Tiet2_Toan5_KNTT.png';
    } else {
      return this.defaultImgUrl;
    }
  }

  getImgUrl3() {
    if (this.bookName == 'canh-dieu') {
      return this.defaultImgUrl;
    } else if (this.bookName == 'chan-troi-sang-tao') {
      return 'images/Tuần 1_Bài 2_Tiết 1_Toán 5_KNTT.png';
    } else {
      return this.defaultImgUrl;
    }
  }

  getImgUrl4() {
    if (this.bookName == 'canh-dieu') {
      return this.defaultImgUrl;
    } else if (this.bookName == 'chan-troi-sang-tao') {
      return 'images/Tuan1_Bài 2_Tiết 2_Toan5_KNTT.png';
    } else {
      return this.defaultImgUrl;
    }
  }

  getImgUrl5() {
    if (this.bookName == 'canh-dieu') {
      return this.defaultImgUrl;
    } else if (this.bookName == 'chan-troi-sang-tao') {
      return this.defaultImgUrl;
    } else {
      return this.defaultImgUrl;
    }
  }

  sortFilesByName(files: FileData[]) {
    this.files = files.sort((a, b) => {
      const numA = this.extractNumber(a.name);
      const numB = this.extractNumber(b.name);
      return numA - numB;
    });
  }

  extractNumber(name: string): number {
    const number = name?.toLowerCase().split('toán 5 - tuần ')[1].split('.')[0];
    return +number;
  }
}
