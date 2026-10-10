import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'vui-hoc-toan-5';
  navigating = false;
  navigationFailed = false;
  private destroyRef = inject(DestroyRef);

  constructor(
    private readonly location: Location,
    router: Router
  ) {
    router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationStart) { this.navigating = true; this.navigationFailed = false; }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.navigating = false;
        this.navigationFailed = event instanceof NavigationError;
      }
    });
  }

  retryNavigation(): void { window.location.reload(); }

  onBack() {
    this.location.back();
  }
}
