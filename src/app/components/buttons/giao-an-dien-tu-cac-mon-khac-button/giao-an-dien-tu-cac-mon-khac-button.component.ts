import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-giao-an-dien-tu-cac-mon-khac-button',
  standalone: true,
  imports: [],
  templateUrl: './giao-an-dien-tu-cac-mon-khac-button.component.html',
  styleUrl: './giao-an-dien-tu-cac-mon-khac-button.component.css',
})
export class GiaoAnDIenTuCacMonKhacButtonComponent {
  @Input('buttonName') buttonName: string = '';
}
