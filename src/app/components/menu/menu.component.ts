import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuButtonComponent } from '../buttons/side-menu-button/side-menu-button.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, SideMenuButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  displayMenu: boolean = false;
  menuIconPath: string = '/icons/open-menu.png';

  constructor(private readonly router: Router) {}
  ngOnInit(): void {}

  onClickMenuICon() {
    this.displayMenu = !this.displayMenu;
    if (this.displayMenu) {
      this.menuIconPath = '/icons/close-menu.png';
    } else {
      this.menuIconPath = '/icons/open-menu.png';
    }
  }

  onClickHomeIcon() {
    this.router.navigateByUrl('');
    this.menuIconPath = '/icons/open-menu.png';
    this.displayMenu = !this.displayMenu;
  }
}
