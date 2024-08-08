import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CauHoiOnTapItemButtonComponent } from '../../../../components/buttons/cau-hoi-on-tap-item-button/cau-hoi-on-tap-item-button.component';

@Component({
  selector: 'app-cau-hoi-on-tap-item',
  standalone: true,
  imports: [CommonModule, CauHoiOnTapItemButtonComponent],
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

  ngOnInit(): void {
    this.topicUrl = this.route.snapshot.paramMap.get('topic')!;
    this.listCauHoiOnTapItem = this.databaseService.getQuestionAnswers();
    console.log('data: ', this.listCauHoiOnTapItem);
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
    console.log(this.listQuestionAnswers[0]?.quests?.length);
  }

  onRedo() {
    this.activeQuestion = 0;
  }
}
