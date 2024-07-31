import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-xem-video',
  standalone: true,
  imports: [],
  templateUrl: './xem-video.component.html',
  styleUrl: './xem-video.component.css',
})
export class XemVideoComponent {
  @Input('videoUrl') videoUrl: string = '';
  @Output('closeVideo') closeVideo: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const clickedInside = this.el.nativeElement
      .querySelector('.video video')
      .contains(event.target as Node);
    if (!clickedInside) {
      this.closeVideo.emit(true);
    }
  }
}
