import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-tuong-tac-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-tuong-tac-button.component.html',
  styleUrl: './game-tuong-tac-button.component.css',
})
export class GameTuongTacButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('navigateUrl') navigateUrl: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
}
