import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookButtonComponent } from '../../components/buttons/book-button/book-button.component';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-tai-nguyen',
  standalone: true,
  imports: [BookButtonComponent, CommonModule],
  templateUrl: './tai-nguyen.component.html',
  styleUrl: './tai-nguyen.component.css',
})
export class TaiNguyenComponent implements OnInit {
  currentPath: string = '/';
  listFilePath: string = '';

  hiddenMenu: boolean = false;
  appearListFile: boolean = false;

  buttonName: string = '';
  routerName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly imageLoaderService: ImageLoaderService,
    private readonly cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}

  getListFile(event: string, buttonName: string, routerName: string) {
    //đưa đến danh sách câu hỏi ôn tập
    if (routerName == 'bai-on-tap') {
      this.router.navigateByUrl('bai-on-tap');
    }

    //đưa đến trang danh sách file
    this.listFilePath = '';
    this.currentPath = '/';

    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath += urlSegment.map((segment) => segment.path).join('/');
      });
    });
    this.listFilePath = this.currentPath + '/' + event;
    this.buttonName = buttonName;
    this.routerName = routerName;

    this.hiddenMenu = true;
    setTimeout(() => {
      this.appearListFile = true;
    }, 100);
  }
  onBack() {
    this.appearListFile = false;
    setTimeout(() => {
      this.hiddenMenu = false;
    }, 100);
  }

  isLoading = true;
  @ViewChild('taiNguyenContainer', { static: true })
  taiNguyenContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.taiNguyenContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
