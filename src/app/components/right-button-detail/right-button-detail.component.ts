import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-right-button-detail',
  standalone: true,
  imports: [],
  templateUrl: './right-button-detail.component.html',
  styleUrl: './right-button-detail.component.css',
})
export class RightButtonDetailComponent {
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
