import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent implements OnInit {
  @Input('buttonName') buttonName: string = '';
  @Input('routerNavigate') routerNavigate: string = '';
  @Input('buttonIcon') buttonIcon: string = '';
  ngOnInit() {}
}
