import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {
  constructor() {}

  checkImagesLoaded(container: ElementRef, callback: () => void): void {
    const images = container.nativeElement.querySelectorAll('img');
    const bgImages = this.getBackgroundImages(container);
    const totalImages = images.length + bgImages.length;
    let loadedImages = 0;

    if (totalImages === 0) {
      // If there are no images, invoke the callback immediately
      callback();
      return;
    }

    const imageLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    };

    images.forEach((img: HTMLImageElement) => {
      if (img.complete) {
        imageLoaded();
      } else {
        img.addEventListener('load', imageLoaded);
      }
    });

    bgImages.forEach((url: string) => {
      const bgImg = new Image();
      bgImg.src = url;
      if (bgImg.complete) {
        imageLoaded();
      } else {
        bgImg.onload = imageLoaded;
      }
    });
  }

  private getBackgroundImages(container: ElementRef): string[] {
    const bgImages: string[] = [];
    const elements = container.nativeElement.querySelectorAll('*');

    // Check the container itself
    this.extractBackgroundImage(container.nativeElement, bgImages);

    // Check all child elements
    elements.forEach((element: HTMLElement) => {
      this.extractBackgroundImage(element, bgImages);
    });

    return bgImages;
  }

  private extractBackgroundImage(element: HTMLElement, bgImages: string[]) {
    const style = getComputedStyle(element);
    const bgImage = style.backgroundImage;
    if (bgImage && bgImage !== 'none') {
      const urlMatch = bgImage.match(/url\(["']?([^"']*)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        bgImages.push(urlMatch[1]);
      }
    }
  }
}
