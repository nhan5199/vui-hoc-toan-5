import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
    this.displayMenu = !this.displayMenu;
  }
}
