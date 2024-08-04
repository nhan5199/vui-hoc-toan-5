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
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css',
})
export class QuizzComponent implements AfterViewInit {
  constructor(
    private imageLoaderService: ImageLoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  isLoading = true;
  @ViewChild('quizzContainer', { static: true })
  quizzContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.quizzContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
