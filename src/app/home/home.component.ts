import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuButtonComponent } from '../components/buttons/menu-button/menu-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  disappearHomeImg = false;
  appearMenu = false;

  onDisappear() {
    this.disappearHomeImg = true;
    setTimeout(() => {
      this.appearMenu = true;
    }, 0); // 2 seconds delay to match the transition duration of the disappear animation
  }
}
