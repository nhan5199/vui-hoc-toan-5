import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-button.component.html',
  styleUrl: './book-button.component.css',
})
export class BookButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('routerNavigate') routerNavigate: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
}
