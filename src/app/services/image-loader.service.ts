import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {
  constructor() {}

  checkImagesLoaded(container: ElementRef, callback: () => void): void {
    const images = Array.from(container.nativeElement.querySelectorAll('img') as NodeListOf<HTMLImageElement>)
      .filter(img => img.loading !== 'lazy' && !!img.getAttribute('src'));
    const bgImages = this.getBackgroundImages(container);
    const totalImages = images.length + bgImages.length;
    let loadedImages = 0;

    if (totalImages === 0) {
      // If there are no images, invoke the callback immediately
      callback();
      return;
    }

    let finished = false;
    const cleanup: (() => void)[] = [];
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      cleanup.forEach(remove => remove());
      callback();
    };
    const timeout = setTimeout(finish, 8000);
    const imageLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        finish();
      }
    };

    images.forEach((img: HTMLImageElement) => {
      if (img.complete) {
        imageLoaded();
      } else {
        const settled = () => {
          img.removeEventListener('load', settled);
          img.removeEventListener('error', settled);
          imageLoaded();
        };
        img.addEventListener('load', settled);
        img.addEventListener('error', settled);
        cleanup.push(() => { img.removeEventListener('load', settled); img.removeEventListener('error', settled); });
      }
    });

    bgImages.forEach((url: string) => {
      const bgImg = new Image();
      bgImg.onload = bgImg.onerror = () => {
        bgImg.onload = bgImg.onerror = null;
        imageLoaded();
      };
      cleanup.push(() => { bgImg.onload = bgImg.onerror = null; });
      bgImg.src = url;
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
