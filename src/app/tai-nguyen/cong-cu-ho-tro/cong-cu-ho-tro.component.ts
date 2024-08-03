import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CongCuButtonComponent } from '../../components/buttons/cong-cu-button/cong-cu-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageLoaderService } from '../../services/image-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cong-cu-ho-tro',
  standalone: true,
  imports: [CongCuButtonComponent, CommonModule],
  templateUrl: './cong-cu-ho-tro.component.html',
  styleUrl: './cong-cu-ho-tro.component.css',
})
export class CongCuHoTroComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly imageLoaderService: ImageLoaderService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  isLoading = true;
  @ViewChild('congCuHoTroContainer', { static: true })
  congCuHoTroContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.congCuHoTroContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
