import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cau-hoi-trac-nghiem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cau-hoi-trac-nghiem.component.html',
  styleUrl: './cau-hoi-trac-nghiem.component.css',
})
export class CauHoiTracNghiemComponent implements OnChanges {
  @Input() testData!: any;

  @ViewChildren('answerBox') answerBoxes!: QueryList<ElementRef>;

  listAnswers: any[] = [];
  selectedAnswer: string = '';
  hasCheckedAnser: boolean = false;

  questionKey: string = '';

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['testData']) {
      this.listAnswers = [
        {
          key: 'A',
          value: this.testData.answerA,
        },
        {
          key: 'B',
          value: this.testData.answerB,
        },
        {
          key: 'C',
          value: this.testData.answerC,
        },
        {
          key: 'D',
          value: this.testData.answerD,
        },
      ];

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
    //đã nộp bài
    this.hasCheckedAnser = true;

    //Kiểm tra đáp án và hiển thị đúng sai
    this.answerBoxes.forEach((box: ElementRef) => {
      debugger;
      const key = box.nativeElement.querySelector('input')?.id;

      // Clear old classes
      this.renderer.removeClass(box.nativeElement, 'selected-correct');
      this.renderer.removeClass(box.nativeElement, 'selected-wrong');
      this.renderer.removeClass(box.nativeElement, 'correct-answer');

      if (!this.hasCheckedAnser) return;

      if (key === this.questionKey + this.selectedAnswer) {
        if (this.selectedAnswer === this.testData.correctAnswer) {
          this.renderer.addClass(box.nativeElement, 'selected-correct');
        } else {
          this.renderer.addClass(box.nativeElement, 'selected-wrong');
        }
      } else if (key == this.testData.correctAnswer) {
        this.renderer.addClass(box.nativeElement, 'correct-answer');
      }
    });

    if (
      this.selectedAnswer.toUpperCase() ==
      this.testData.correctAnswer.toUpperCase()
    ) {
      return 1;
    }
    return 0;
  }
}
