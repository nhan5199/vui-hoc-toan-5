import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private mobileScreenSubject = new BehaviorSubject<boolean>(
    this.isMobileScreen()
  );
  isMobileScreen$ = this.mobileScreenSubject.asObservable();

  private orientationSubject = new BehaviorSubject<string>(
    this.getOrientation()
  );
  orientation$ = this.orientationSubject.asObservable();

  constructor() {
    window.screen.orientation.addEventListener('change', () => {
      this.checkOrientation();

      this.mobileScreenSubject.next(this.isMobileScreen());
    });
  }

  // Method to check if the screen width is less than or equal to 500px
  private isMobileScreen(): boolean {
    return window.innerWidth <= 500;
  }

  // Method to get the current orientation
  // Method to get the current orientation and log it
  private checkOrientation(): void {
    const orientation = this.getOrientation();
  }

  // Method to determine the current orientation
  private getOrientation(): string {
    return window.matchMedia('(orientation: landscape)').matches
      ? 'landscape'
      : 'portrait';
  }
}
