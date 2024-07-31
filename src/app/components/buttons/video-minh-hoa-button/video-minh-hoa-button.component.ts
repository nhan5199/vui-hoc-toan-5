import { Component, EventEmitter, Input, Output } from '@angular/core';
import { XemVideoComponent } from '../../xem-video/xem-video.component';

@Component({
  selector: 'app-video-minh-hoa-button',
  standalone: true,
  imports: [XemVideoComponent],
  templateUrl: './video-minh-hoa-button.component.html',
  styleUrl: './video-minh-hoa-button.component.css',
})
export class VideoMinhHoaButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  @Output('viewVideo') viewVideo: EventEmitter<string> =
    new EventEmitter<string>();
  onViewVideo() {
    this.viewVideo.emit(this.downloadUrl);
  }
}
