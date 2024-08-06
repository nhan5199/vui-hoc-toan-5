import { Component } from '@angular/core';
import { GameTuongTacButtonComponent } from '../../components/buttons/game-tuong-tac-button/game-tuong-tac-button.component';

@Component({
  selector: 'app-game-tuong-tac',
  standalone: true,
  imports: [GameTuongTacButtonComponent],
  templateUrl: './game-tuong-tac.component.html',
  styleUrl: './game-tuong-tac.component.css',
})
export class GameTuongTacComponent {}
