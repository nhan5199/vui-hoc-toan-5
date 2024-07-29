import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cong-cu-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cong-cu-button.component.html',
  styleUrl: './cong-cu-button.component.css',
})
export class CongCuButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('routerNavigate') routerNavigate: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
}
