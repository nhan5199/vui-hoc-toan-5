import { Component, Input } from '@angular/core';
import { CongCuButtonComponent } from '../../components/cong-cu-button/cong-cu-button.component';

@Component({
  selector: 'app-cong-cu-ho-tro',
  standalone: true,
  imports: [CongCuButtonComponent],
  templateUrl: './cong-cu-ho-tro.component.html',
  styleUrl: './cong-cu-ho-tro.component.css',
})
export class CongCuHoTroComponent {}
