import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-button-detail',
  standalone: true,
  imports: [],
  templateUrl: './left-button-detail.component.html',
  styleUrl: './left-button-detail.component.css',
})
export class LeftButtonDetailComponent implements OnInit {
  @Input('buttonName') buttonName: string = '';
  @Input('router') router: string = '';
  @Input('isQuestion') isQuestion = false;
  @Input('buttonDecaratePath') buttonDecoratePath: string = '';
  @Input('buttonBackgroundPath') buttonBackgroundPath: string = '';

  @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onClick() {
    if (this.isQuestion) {
      this.onClickEvent.emit('list-question');
    } else {
      this.onClickEvent.emit(this.router);
    }
  }
}
