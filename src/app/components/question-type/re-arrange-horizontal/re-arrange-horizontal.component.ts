import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-re-arrange',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './re-arrange-horizontal.component.html',
  styleUrl: './re-arrange-horizontal.component.css',
})
export class ReArrangeHorizontalComponent implements OnChanges, OnInit {
  @Input('question') question: string = 'Sắp xếp lại câu sau';
  @Input('answer') answer: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  reArrangedAnswer: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['answer'] && this.question?.length > 0) {
      this.reArrangedAnswer = this.shuffleArray(this.answer);
    }
  }

  ngOnInit(): void {
    this.reArrangedAnswer = this.shuffleArray(this.answer);
  }

  shuffleArray(array: string[]): string[] {
    const shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.reArrangedAnswer,
      event.previousIndex,
      event.currentIndex
    );
  }

  checkAnswer() {
    for (let i = 0; i < this.reArrangedAnswer.length; i++) {
      if (this.answer[i] !== this.reArrangedAnswer[i]) {
        return false;
      }
    }
    return true;
  }
}
