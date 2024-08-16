import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stem-button',
  standalone: true,
  imports: [],
  templateUrl: './stem-button.component.html',
  styleUrl: './stem-button.component.css',
})
export class StemButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  @Output('viewFile') viewFile: EventEmitter<any> = new EventEmitter<any>();

  onViewFile() {
    this.viewFile.emit({
      name: this.buttonName,
      url: this.downloadUrl,
    });
  }
}
