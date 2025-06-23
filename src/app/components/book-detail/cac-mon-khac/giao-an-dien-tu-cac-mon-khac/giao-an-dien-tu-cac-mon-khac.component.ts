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
import { FileData, FileService } from '../../../../services/file.service';
import { finalize } from 'rxjs';

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
  subjectUrlName: string | null = '';
  subjectName: string | null = '';

  patternRegex = /\/(\w+-\d+)\//;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly imageLoaderService: ImageLoaderService,
    private readonly router: Router,
    private fileService: FileService
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

    this.subjectUrlName = this.route.snapshot.paramMap.get('subject');
    this.getSubjectName();

    this.getListFolder();
  }

  getSubjectName() {
    switch (this.subjectUrlName) {
      case 'cong-nghe-5':
        this.subjectName = 'Công nghệ 5';
        break;
      case 'dao-duc-5':
        this.subjectName = 'Đạo đức 5';
        break;
      case 'hoat-dong-trai-nghiem-5':
        this.subjectName = 'Hoạt động trải nghiệm 5';
        break;
      case 'khoa-hoc-5':
        this.subjectName = 'Khoa học 5';
        break;
      case 'lich-su-dia-li-5':
        this.subjectName = 'Lịch sử và Địa lí 5';
        break;
      case 'mi-thuat-5':
        this.subjectName = 'Mĩ thuật 5';
        break;
      case 'tieng-viet-5':
        this.subjectName = 'Tiếng Việt 5';
        break;
      default:
        this.subjectName = '';
        break;
    }
  }

  getListFolder() {
    this.isLoadingFiles = true;
    this.files = [];

    this.fileService
      .getFilesList(this.folderPath)
      .pipe(finalize(() => (this.isLoadingFiles = false)))
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
        this.sortFilesByName(this.files);
      });
  }

  onChangeWeek() {
    this.getListFolder();
  }

  sortFilesByName(files: FileData[]) {
    this.files = files.sort((a, b) => {
      const numA = this.extractNumber(a.name);
      const numB = this.extractNumber(b.name);
      return numA - numB;
    });
  }

  extractNumber(name: string): number {
    const number = name?.toLowerCase().split('tuan-')[1].split('.rar')[0];
    return +number;
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
    return 'Tuần ' + fileName.split('.')[0]?.split('-')[1];
  }

  goToSubject(fileName: string) {
    this.router.navigateByUrl(`${this.folderPath}/${fileName}`);
  }
}
