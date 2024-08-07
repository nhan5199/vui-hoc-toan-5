import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuButtonComponent } from '../components/buttons/menu-button/menu-button.component';
import { HomeButtonComponent } from '../components/buttons/home-button/home-button.component';
import { ImageLoaderService } from '../services/image-loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuButtonComponent, HomeButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private imageLoaderService: ImageLoaderService
  ) {}

  ngOnInit(): void {}

  disappearHomeImg = false;
  appearMenu = false;

  onDisappear() {
    this.disappearHomeImg = true;
    setTimeout(() => {
      this.appearMenu = true;
    }, 0); // 2 seconds delay to match the transition duration of the disappear animation
  }

  isLoading = true;
  @ViewChild('homeContainer', { static: true })
  homeContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.imageLoaderService.checkImagesLoaded(this.homeContainer, () => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
