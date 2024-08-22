import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageLoaderService } from '../../../../services/image-loader.service';
import Constant from '../../../../shared/constants/Constant';
import { GiaoAnDIenTuCacMonKhacButtonComponent } from '../../../buttons/giao-an-dien-tu-cac-mon-khac-button/giao-an-dien-tu-cac-mon-khac-button.component';

@Component({
  selector: 'app-giao-an-dien-tu-cac-mon-khac',
  standalone: true,
  imports: [CommonModule, FormsModule, GiaoAnDIenTuCacMonKhacButtonComponent],
  templateUrl: './giao-an-dien-tu-cac-mon-khac.component.html',
  styleUrl: './giao-an-dien-tu-cac-mon-khac.component.css',
})
export class GiaoAnDienTuCacMonKhacComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  isLoadingFiles: boolean = false;

  folderPath: string = '';
  bookIconUrl: string = '';

  files: any[] = [];

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
    private readonly cdRef: ChangeDetectorRef,
    private readonly imageLoaderService: ImageLoaderService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath += urlSegment.map((segment) => segment.path).join('/');
      });

      if (this.folderPath.includes('canh-dieu')) {
        this.bookIconUrl = 'images/images/canh-dieu-icon.jpg';
      } else if (this.folderPath.includes('ket-noi-tri-thuc')) {
        this.bookIconUrl = 'images/images/ket-noi-tri-thuc-icon.jpg';
      } else {
        this.bookIconUrl = 'images/images/chan-troi-sang-tao-icon.jpg';
      }
    });

    this.getListFolder();
  }

  patternRegex = /\/(\w+-\d+)\//;

  getListFolder() {
    this.isLoadingFiles = true;
    console.log(`${this.folderPath}/${this.selectedWeek}`);
    this.files = Array.from(
      new Set(
        Constant.FILE_PATH.files.map((path) => {
          if (path.includes(`${this.folderPath}/${this.selectedWeek}`)) {
            return path;
          } else {
            return '';
          }
        })
      )
    ).filter((x) => x.length > 0);

    const mergedSegments = this.files.map((file) => {
      const parts = file.split('/');
      return `${parts[5]}/${parts[6]}`;
    });

    // Get distinct values
    this.files = Array.from(new Set(mergedSegments));

    setTimeout(() => {
      this.isLoadingFiles = false;
    }, 500);
  }

  onChangeWeek() {
    this.getListFolder();
  }

  @ViewChild('giaoAnDienTuContainer', { static: true })
  giaoAnDienTuContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(
      this.giaoAnDienTuContainer,
      () => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    );
  }

  getButtonName(fileName: string): string {
    if (fileName.includes('toan-5')) {
      return 'Toán';
    } else if (fileName.includes('tieng-viet-5')) {
      return 'Tiếng Việt';
    } else if (fileName.includes('khoa học-5')) {
      return 'khoa-hoc';
    } else if (fileName.includes('lich-su-va-dia-li-5')) {
      return 'Lịch sử và Địa lí';
    } else if (fileName.includes('cong-nghe-5')) {
      return 'Công nghệ';
    } else if (fileName.includes('tin-hoc-5')) {
      return 'Tin học';
    } else if (fileName.includes('dao-duc-5')) {
      return 'Đạo đức';
    } else if (fileName.includes('giao-duc-the-chat-5')) {
      return 'Giáo dục thể chất';
    } else if (fileName.includes('hoat-dong-trai-nghiem-5')) {
      return 'HĐ trải nghiệm';
    } else if (fileName.includes('mi-thuat-5')) {
      return 'Mĩ thuật';
    } else if (fileName.includes('anh-van-5')) {
      return 'Anh văn';
    }
    return '';
  }

  goToSubject(fileName: string) {
    this.router.navigateByUrl(`${this.folderPath}/${fileName}`);
  }
}
