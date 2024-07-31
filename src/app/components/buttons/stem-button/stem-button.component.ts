import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stem-button',
  standalone: true,
  imports: [],
  templateUrl: './stem-button.component.html',
  styleUrl: './stem-button.component.css',
})
export class StemButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
}
