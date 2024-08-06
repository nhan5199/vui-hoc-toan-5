import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cau-hoi-on-tap-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cau-hoi-on-tap-button.component.html',
  styleUrl: './cau-hoi-on-tap-button.component.css',
})
export class CauHoiOnTapButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('navigateUrl') navigateUrl: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
}
