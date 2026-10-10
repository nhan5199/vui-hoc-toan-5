import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appPressable]', standalone: true, host: { role: 'button', tabindex: '0' } })
export class PressableDirective {
  constructor(private host: ElementRef<HTMLElement>) {}
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.target !== this.host.nativeElement || event.repeat) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.host.nativeElement.click();
    }
  }
}
