import { Injectable } from '@angular/core';
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
    // Listen for both screen orientation changes and window resize events
    window.addEventListener('resize', () => this.handleScreenChange());
    window.addEventListener('orientationchange', () =>
      this.handleScreenChange()
    );
  }

  private handleScreenChange() {
    // Update orientation and mobile screen state
    this.orientationSubject.next(this.getOrientation());
    this.mobileScreenSubject.next(this.isMobileScreen());
  }

  // Method to check if the screen width is less than or equal to 500px
  private isMobileScreen(): boolean {
    return window.innerWidth <= 500;
  }

  // Method to determine the current orientation
  private getOrientation(): string {
    return window.matchMedia('(orientation: landscape)').matches
      ? 'landscape'
      : 'portrait';
  }
}
