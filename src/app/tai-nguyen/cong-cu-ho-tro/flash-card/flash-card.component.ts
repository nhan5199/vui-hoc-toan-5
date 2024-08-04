import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FlashCardButtonComponent } from '../../../components/buttons/flash-card-button/flash-card-button.component';
import { ImageLoaderService } from '../../../services/image-loader.service';

@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [CommonModule, FlashCardButtonComponent],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.css',
})
export class FlashCardComponent implements AfterViewInit {
  constructor(
    private readonly imageLoaderService: ImageLoaderService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  isLoading = true;
  @ViewChild('flashCardContainer', { static: true })
  flashCardContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.flashCardContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
