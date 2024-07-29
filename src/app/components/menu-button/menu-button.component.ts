import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('routerNavigate') routerNavigate: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
}
