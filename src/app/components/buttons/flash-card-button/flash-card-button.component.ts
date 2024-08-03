import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-flash-card-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './flash-card-button.component.html',
  styleUrl: './flash-card-button.component.css',
})
export class FlashCardButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('routerNavigate') routerNavigate: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
}
