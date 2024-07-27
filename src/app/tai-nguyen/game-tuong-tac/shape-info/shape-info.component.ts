import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shape-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shape-info.component.html',
  styleUrl: './shape-info.component.css',
})
export class ShapeInfoComponent {
  @Input('isDispayInfo') isDisplayInfo: boolean = false;
  @Output('closeInfoPopup') closeInfoPopup: EventEmitter<boolean> =
    new EventEmitter();

  onClosePopup() {
    this.closeInfoPopup.emit(true);
  }
}
