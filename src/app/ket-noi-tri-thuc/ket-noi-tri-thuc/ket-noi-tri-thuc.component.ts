import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookButtonComponent } from '../../components/buttons/book-button/book-button.component';
import { ImageLoaderService } from '../../services/image-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ket-noi-tri-thuc',
  standalone: true,
  imports: [BookButtonComponent, CommonModule],
  templateUrl: './ket-noi-tri-thuc.component.html',
  styleUrl: './ket-noi-tri-thuc.component.css',
})
export class KetNoiTriThucComponent implements OnInit, AfterViewInit {
  currentPath: string = '/';
  listFilePath: string = '';

  hiddenMenu: boolean = false;
  appearListFile: boolean = false;

  buttonName: string = '';
  routerName: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly imageLoaderService: ImageLoaderService,
    private readonly cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}

  getListFile(event: any, buttonName: string, routerName: string) {
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
  @ViewChild('ketNoiTriThucContainer', { static: true })
  ketNoiTriThucContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(
      this.ketNoiTriThucContainer,
      () => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    );
  }
}
