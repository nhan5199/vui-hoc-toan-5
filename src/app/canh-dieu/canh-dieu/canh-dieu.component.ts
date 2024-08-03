import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListFileComponent } from '../../components/list-file/list-file.component';
import { BookButtonComponent } from '../../components/buttons/book-button/book-button.component';
import { CommonModule } from '@angular/common';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-canh-dieu',
  standalone: true,
  imports: [ListFileComponent, BookButtonComponent, CommonModule],
  templateUrl: './canh-dieu.component.html',
  styleUrl: './canh-dieu.component.css',
})
export class CanhDieuComponent implements OnInit, AfterViewInit {
  currentPath: string = '/';
  listFilePath: string = '';

  hiddenMenu: boolean = false;
  appearListFile: boolean = false;

  buttonName: string = '';
  routerName: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly imageLoaderService: ImageLoaderService
  ) {}
  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath += urlSegment.map((segment) => segment.path).join('/');
      });
    });
  }

  getListFile(event: any, buttonName: string, routerName: string) {
    this.listFilePath = '';
    this.currentPath = '/';

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
  @ViewChild('canhDieuContainer', { static: true })
  canhDieuContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.canhDieuContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
