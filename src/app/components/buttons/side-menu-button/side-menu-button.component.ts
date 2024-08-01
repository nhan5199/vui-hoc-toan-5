import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-menu-button.component.html',
  styleUrl: './side-menu-button.component.css',
})
export class SideMenuButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('routerNavigate') routerNavigate: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
}
