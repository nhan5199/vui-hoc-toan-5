import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { CauHoiOnTapButtonComponent } from '../../../components/buttons/cau-hoi-on-tap-button/cau-hoi-on-tap-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cau-hoi-on-tap',
  standalone: true,
  imports: [CauHoiOnTapButtonComponent, CommonModule],
  templateUrl: './cau-hoi-on-tap.component.html',
  styleUrl: './cau-hoi-on-tap.component.css',
})
export class CauHoiOnTapComponent implements OnInit {
  constructor(private readonly databaseService: DatabaseService) {}

  isLoading = true;
  loadError = false;
  listQuestionAnswer: any[] = [];
  ngOnInit(): void {
    this.databaseService.getQuestionAnswers().subscribe({
      next: data => { this.listQuestionAnswer = data; this.isLoading = false; },
      error: () => { this.loadError = true; this.isLoading = false; }
    });
  }
}
