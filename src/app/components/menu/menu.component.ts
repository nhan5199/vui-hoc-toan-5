import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  displayMenu: boolean = false;
  menuIconPath: string = '/icons/open-menu.png';

  ngOnInit(): void {}

  onClickMenuICon() {
    this.displayMenu = !this.displayMenu;
    if (this.displayMenu) {
      this.menuIconPath = '/icons/close-menu.png';
    } else {
      this.menuIconPath = '/icons/open-menu.png';
    }
  }
}
