import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ImageLoaderService } from '../../../services/image-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toan-dan-gian',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toan-dan-gian.component.html',
  styleUrl: './toan-dan-gian.component.css',
})
export class ToanDanGianComponent implements AfterViewInit {
  constructor(
    private imageLoaderService: ImageLoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  isLoading = true;
  @ViewChild('toanDanGianContainer', { static: true })
  toanDanGianContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.toanDanGianContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
