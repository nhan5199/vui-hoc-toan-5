import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StemButtonComponent } from '../../components/buttons/stem-button/stem-button.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FileData, FileService } from '../../services/file.service';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-stem',
  standalone: true,
  imports: [StemButtonComponent, CommonModule],
  templateUrl: './stem.component.html',
  styleUrl: './stem.component.css',
})
export class StemComponent implements OnInit {
  folderPath: string = '';
  files: FileData[] = [];
  constructor(
    private readonly fileService: FileService,
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly imageLoaderService: ImageLoaderService
  ) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');
        console.log(this.folderPath);
        this.listFiles();
      });
    });
  }

  listFiles(): void {
    this.files = [];
    this.fileService.getFilesList(this.folderPath).subscribe((files) => {
      files.forEach((file: any) => {
        this.files.push(file);
      });
    });
  }

  isLoading = true;
  @ViewChild('stemContainer', { static: true })
  stemContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.stemContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
