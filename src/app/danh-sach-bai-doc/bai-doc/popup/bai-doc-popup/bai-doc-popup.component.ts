import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bai-doc-popup',
  standalone: true,
  imports: [],
  templateUrl: './bai-doc-popup.component.html',
  styleUrl: './bai-doc-popup.component.css',
})
export class BaiDocPopupComponent {
  @Input() displayPopup: boolean = false;
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() imgUrl: string = '';
  @Input() description: string = '';
  @Input() title: string = '';

  onClosePopup(): void {
    this.closePopup.emit(true);
  }
}
