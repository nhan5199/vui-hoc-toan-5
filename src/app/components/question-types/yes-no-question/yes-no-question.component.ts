import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-yes-no-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yes-no-question.component.html',
  styleUrl: './yes-no-question.component.css',
})
export class YesNoQuestionComponent implements OnChanges {
  @Input('question') question: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  listAnswer: any[] = [];
  isClickCheck: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.question.choices.forEach((choice: any) => {
        this.listAnswer.push({
          choice: -1,
          answer: choice.answer,
        });
      });
    }
  }

  saveAnswer(i: number, event: any) {
    let parentElement = event.target.parentNode;
    let childElements = [].slice.call(parentElement.children);
    childElements.forEach((element: any) => {
      element.classList.remove('active');
    });
    event.target.classList.add('active');
    this.listAnswer[i].choice = event.target.innerHTML.trim() == 'Đ' ? 1 : 0;
  }

  onCheckAnswer() {
    this.isClickCheck = true;

    let button = document.getElementById('checkButton') as HTMLButtonElement;
    if (button) button.disabled = true;

    let result: boolean[] = [];
    let childrenNodes = [].slice.call(
      document.getElementsByClassName('list-answers')[0].children
    );
    childrenNodes.forEach((answers: any, i) => {
      [].slice.call(answers.children[1].children).forEach((button: any) => {
        if (button.classList.contains('active')) {
          button.classList.remove('active');
          button.disabled = true;
          if (this.listAnswer[i].choice == this.listAnswer[i].answer) {
            button.classList.add('correct');
            result.push(true);
          } else {
            button.classList.add('false');
            result.push(false);
          }
        }
      });
    });

    if (result.filter((x) => x == true)?.length == this.listAnswer?.length) {
      this.result.emit(true);
    } else {
      this.result.emit(false);
    }
  }
}
