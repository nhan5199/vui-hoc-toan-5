import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cau-hoi-on-tap-item-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cau-hoi-on-tap-item-button.component.html',
  styleUrl: './cau-hoi-on-tap-item-button.component.css',
})
export class CauHoiOnTapItemButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('navigateUrl') navigateUrl: string = '';

  @Output('doExercise') doExercise: EventEmitter<string> =
    new EventEmitter<string>();

  onClickDoExercise() {
    this.doExercise.emit(this.buttonName);
  }
}
