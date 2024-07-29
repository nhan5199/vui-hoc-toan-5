import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-re-arrange-vertical',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './re-arrange-vertical.component.html',
  styleUrl: './re-arrange-vertical.component.css',
})
export class ReArrangeVerticalComponent implements OnChanges, OnInit {
  @Input('question') question: string = 'Sắp xếp lại các ý sau';
  @Input('answer') answer: string[] = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

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
