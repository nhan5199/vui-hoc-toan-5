import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-write-text-answer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './write-text-answer.component.html',
  styleUrl: './write-text-answer.component.css',
})
export class WriteTextAnswerComponent implements OnChanges {
  @Input('question') question: any;
  @Output('result') result: EventEmitter<any> = new EventEmitter();
  answer: string[] = [];
  isClickChecked: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.answer = this.createArrayWithNullElements(
        this.question.questionName.length
      );
      this.isClickChecked = false;

      let index = 0;
      let id = 'answer-' + index;
      this.answer.forEach((answer: any) => {
        let id = 'answer-' + index;
        const inputElement = document.getElementById(id);
        if (inputElement) {
          inputElement.style.color = 'white';
          inputElement.style.borderColor = 'white';
        }
        index++;
      });
    }
  }

  createArrayWithNullElements(count: number) {
    return new Array(count).fill(null);
  }

  convertViToEn(str: string, toUpperCase: boolean = false) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

    return toUpperCase ? str.toUpperCase() : str;
  }

  onCheckAnswer() {
    this.isClickChecked = true;

    let index = 0;
    let countCorrect = 0;
    this.answer.forEach((answer: any) => {
      let id = 'answer-' + index;
      const inputElement = document.getElementById(id);
      if (inputElement) {
        if (
          answer?.trim() === this.question.answer[index]?.trim() ||
          answer?.trim()?.toUpperCase() === this.question.answer[index]?.trim()
        ) {
          inputElement.style.color = 'green';
          inputElement.style.borderColor = 'green';
          countCorrect++;
        } else {
          inputElement.style.color = 'red';
          inputElement.style.borderColor = 'red';
        }
      }
      index++;
    });

    if (countCorrect == this.question.answer.length) {
      this.result.emit(true);
    } else {
      this.result.emit(false);
    }
  }
}
