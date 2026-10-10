import { PressableDirective } from '../../../shared/pressable.directive';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-button',
  standalone: true,
  imports: [PressableDirective, ],
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.css'],
})
export class HomeButtonComponent {
  @Output('clickHome') clickHome: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  onClickHome() {
    this.clickHome.emit(true);
  }
}
