import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CauHoiOnTapItemButtonComponent } from '../../../../components/buttons/cau-hoi-on-tap-item-button/cau-hoi-on-tap-item-button.component';
import { ChooseCorrectAnswerComponent } from '../../../../components/question-types/choose-correct-answer/choose-correct-answer.component';
import { WriteAnswerQuestionComponent } from '../../../../components/question-types/write-answer-question/write-answer-question.component';
import { YesNoQuestionComponent } from '../../../../components/question-types/yes-no-question/yes-no-question.component';
import { WriteTextAnswerComponent } from '../../../../components/question-types/write-text-answer/write-text-answer.component';

@Component({
  selector: 'app-cau-hoi-on-tap-item',
  standalone: true,
  imports: [
    CommonModule,
    CauHoiOnTapItemButtonComponent,
    ChooseCorrectAnswerComponent,
    WriteAnswerQuestionComponent,
    YesNoQuestionComponent,
    WriteTextAnswerComponent,
  ],
  templateUrl: './cau-hoi-on-tap-item.component.html',
  styleUrl: './cau-hoi-on-tap-item.component.css',
})
export class CauHoiOnTapItemComponent implements OnInit {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly route: ActivatedRoute
  ) {}

  topicUrl: string = '';
  listCauHoiOnTapItem: any[] = [];

  currentPoint: number = 0;
  tempPoint: string = '';
  rightAnswersCount: number = 0;
  wrongAnswersCount: number = 0;

  ngOnInit(): void {
    this.topicUrl = this.route.snapshot.paramMap.get('topic')!;
    this.listCauHoiOnTapItem = this.databaseService.getQuestionAnswers();
    if (this.listCauHoiOnTapItem) {
      this.listCauHoiOnTapItem = this.listCauHoiOnTapItem.filter(
        (x: any) => x.topicUrl == this.topicUrl
      )[0].content.listExercises;
    }
  }

  activeQuestion: number = 0;
  listQuestionAnswers: any[] = [];
  exerciseName: string = '';

  onDoExercise(exerciseName: string) {
    this.listQuestionAnswers = this.listCauHoiOnTapItem.filter(
      (x) => x.name == exerciseName
    );
    this.exerciseName = exerciseName;
  }

  onQuitQuestion() {
    this.listQuestionAnswers = [];
    this.activeQuestion = 0;
    this.exerciseName = '';
  }

  goToNextQuestion() {
    this.activeQuestion += 1;
  }

  onRedo() {
    this.activeQuestion = 0;
    this.rightAnswersCount = 0;
    this.wrongAnswersCount = 0;
    this.currentPoint = 0;
  }

  checkAnswer(event: any) {
    if (event) {
      setTimeout(() => {
        this.tempPoint = '+100';
      }, 500);
      setTimeout(() => {
        this.tempPoint = '';
        this.currentPoint += 100;
        this.rightAnswersCount += 1;
      }, 1000);
    } else {
      this.wrongAnswersCount += 1;
    }

    setTimeout(() => {
      this.activeQuestion += 1;
    }, 1300);
  }
}
