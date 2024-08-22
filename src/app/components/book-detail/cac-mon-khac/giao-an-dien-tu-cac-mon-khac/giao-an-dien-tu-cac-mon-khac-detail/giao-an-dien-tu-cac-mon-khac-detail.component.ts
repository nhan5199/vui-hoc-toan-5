import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageLoaderService } from '../../../../../services/image-loader.service';
import Constant from '../../../../../shared/constants/Constant';
import { GiaoAnDienTuCacMonKhacDetailButtonComponent } from '../../../../buttons/giao-an-dien-tu-cac-mon-khac-detail-button/giao-an-dien-tu-cac-mon-khac-detail-button.component';

@Component({
  selector: 'app-giao-an-dien-tu-cac-mon-khac-detail',
  standalone: true,
  imports: [GiaoAnDienTuCacMonKhacDetailButtonComponent, CommonModule],
  templateUrl: './giao-an-dien-tu-cac-mon-khac-detail.component.html',
  styleUrl: './giao-an-dien-tu-cac-mon-khac-detail.component.css',
})
export class GiaoAnDienTuCacMonKhacDetailComponent
  implements OnInit, AfterViewInit
{
  isLoading: boolean = true;
  isLoadingFiles: boolean = false;

  folderPath: string = '';
  bookIconUrl: string = '';

  files: any[] = [];

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
    this.files = Array.from(
      new Set(
        Constant.FILE_PATH.files.map((path) => {
          if (path.includes(this.folderPath)) {
            return path;
          } else {
            return '';
          }
        })
      )
    ).filter((x) => x.length > 0);

    setTimeout(() => {
      this.isLoadingFiles = false;
    }, 500);
  }

  onChangeWeek() {
    this.getListFolder();
  }

  @ViewChild('giaoAnDienTuDetailContainer', { static: true })
  giaoAnDienTuDetailContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(
      this.giaoAnDienTuDetailContainer,
      () => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    );
  }

  getButtonName(fileName: string): string {
    return fileName.split('/')[fileName.split('/').length - 1];
  }
}
