import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toan-dan-gian-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './toan-dan-gian-button.component.html',
  styleUrl: './toan-dan-gian-button.component.css',
})
export class ToanDanGianButtonComponent {
  @Input('buttonName') buttonName: string = '';
  @Input('navigateUrl') navigateUrl: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
}
