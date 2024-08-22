import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-giao-an-dien-tu-cac-mon-khac-detail-button',
  standalone: true,
  imports: [],
  templateUrl: './giao-an-dien-tu-cac-mon-khac-detail-button.component.html',
  styleUrl: './giao-an-dien-tu-cac-mon-khac-detail-button.component.css',
})
export class GiaoAnDienTuCacMonKhacDetailButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('folderPath') folderPath: string = '';
  @Output('viewFile') viewFile: EventEmitter<any> = new EventEmitter<any>();

  onViewFile() {
    this.viewFile.emit(`${this.folderPath}/${this.buttonName}`);
  }

  getButtonDisplayName() {
    if (this.buttonName?.length > 0) {
      return this.buttonName.split('.')[0]?.length >= 37
        ? this.buttonName.split('.')[0].slice(0, 36) + '...'
        : this.buttonName.split('.')[0];
    }
    return this.buttonName;
  }
}
