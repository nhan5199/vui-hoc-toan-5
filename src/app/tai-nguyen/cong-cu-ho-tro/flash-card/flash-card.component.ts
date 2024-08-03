import { Component, OnInit } from '@angular/core';
import { FileData, FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlashCardButtonComponent } from '../../../components/buttons/flash-card-button/flash-card-button.component';

@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [CommonModule, FlashCardButtonComponent],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.css',
})
export class FlashCardComponent {}
