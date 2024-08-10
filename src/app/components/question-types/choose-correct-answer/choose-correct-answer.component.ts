import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-choose-correct-answer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-correct-answer.component.html',
  styleUrl: './choose-correct-answer.component.css',
})
export class ChooseCorrectAnswerComponent implements OnInit {
  @Input('question') question: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  isClick: boolean = false;
  isAnswerWithImage: boolean = false;

  ngOnInit(): void {
    if (this.question.choices[0].name.includes('https')) {
      this.isAnswerWithImage = true;
    }
  }

  checkAnswer(chosenAnswer: number, event: any) {
    let parentElement = event.target.parentNode;
    let childElements = [].slice.call(parentElement.children);
    childElements.forEach((element: any) => {
      element.classList.remove('active');
      element.disabled = true;
    });

    event.target.classList.add('active');

    if (this.question.answer == chosenAnswer) {
      event.target.classList.remove('active');
      event.target.classList.add('correct');

      this.result.emit(true);
    } else {
      event.target.classList.remove('active');
      event.target.classList.add('false');
      this.result.emit(false);
    }
  }
}
