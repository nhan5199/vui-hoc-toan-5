import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ImageLoaderService } from '../../../services/image-loader.service';
import { ToanDanGianButtonComponent } from '../../../components/buttons/toan-dan-gian-button/toan-dan-gian-button.component';

@Component({
  selector: 'app-toan-dan-gian',
  standalone: true,
  imports: [CommonModule, ToanDanGianButtonComponent],
  templateUrl: './toan-dan-gian.component.html',
  styleUrl: './toan-dan-gian.component.css',
})
export class ToanDanGianComponent implements AfterViewInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private imageLoaderService: ImageLoaderService
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
