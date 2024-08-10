import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-write-answer-question',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './write-answer-question.component.html',
  styleUrl: './write-answer-question.component.css',
})
export class WriteAnswerQuestionComponent implements OnInit {
  @Input('question') question: any;
  @Output('result') result: EventEmitter<boolean> = new EventEmitter();
  answer: string = '';

  ngOnInit() {}

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
    let button = document.getElementById('checkButton') as HTMLButtonElement;
    if (button) button.disabled = true;
    let element = document.getElementById('answer');
    if (element) {
      if (this.answer === this.question.answer) {
        element.style.color = 'rgb(21, 182, 21)';
        element.style.borderColor = 'rgb(21, 182, 21)';
        this.result.emit(true);
      } else {
        element.style.color = 'red';
        element.style.borderColor = 'red';
        this.result.emit(false);
      }
    }
  }
}
