import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-background-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './background-button.component.html',
  styleUrl: './background-button.component.css',
})
export class BackgroundButtonComponent implements OnInit {
  @Input('buttonName') buttonName: string = '';
  @Input('router') router: string = '';
  @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}
  ngOnInit(): void {}

  onClick() {
    this.onClickEvent.emit(this.router);
  }
}
