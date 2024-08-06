import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { Location } from '@angular/common';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'vui-hoc-toan-5';

  constructor(
    private readonly location: Location,
    private readonly databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    fetch(
      `https://vui-hoc-toan-5-default-rtdb.asia-southeast1.firebasedatabase.app/questionAnswer.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.databaseService.setQuestionAnswers(data.questionAnswer);
      });
  }

  onBack() {
    this.location.back();
  }
}
