import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileData, FileService } from '../services/file.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';
import { RouterLink } from '@angular/router';
import { MenuButtonComponent } from '../components/menu-button/menu-button.component';

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
