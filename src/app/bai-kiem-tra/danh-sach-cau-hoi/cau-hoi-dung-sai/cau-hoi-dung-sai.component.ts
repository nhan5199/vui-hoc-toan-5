import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cau-hoi-dung-sai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cau-hoi-dung-sai.component.html',
  styleUrl: './cau-hoi-dung-sai.component.css',
})
export class CauHoiDungSaiComponent implements OnChanges {
  @Input() testData!: any;
  @Input() questionNumber: number = 1;
  selectedAnswer: string = '';
  hasCheckedAnser: boolean = false;
  questionKey: string = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['testData']) {
      this.testData.listQuestions.forEach((item: any) => {
        let listAnswers = [
          {
            key: 'd',
            value: item.answerA,
          },
          {
            key: 's',
            value: item.answerB,
          },
        ];

        item.listAnswers = listAnswers;
      });

      this.questionKey = this.generateComponentKey();
    }
  }

  generateComponentKey(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  receiveValue(key: string) {
    this.selectedAnswer = key;
  }

  checkAnswer(): number {
    this.hasCheckedAnser = true;

    if (
      this.selectedAnswer.toUpperCase() ==
      this.testData.correctAnswer.toUpperCase()
    ) {
      return 1;
    }
    return 0;
  }
}
