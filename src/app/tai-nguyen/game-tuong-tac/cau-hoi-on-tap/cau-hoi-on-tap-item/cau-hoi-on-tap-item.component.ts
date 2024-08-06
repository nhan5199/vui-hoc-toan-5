import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cau-hoi-on-tap-item',
  standalone: true,
  imports: [],
  templateUrl: './cau-hoi-on-tap-item.component.html',
  styleUrl: './cau-hoi-on-tap-item.component.css',
})
export class CauHoiOnTapItemComponent implements OnInit {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly route: ActivatedRoute
  ) {}

  topicUrl: string = '';
  ngOnInit(): void {
    this.topicUrl = this.route.snapshot.paramMap.get('topic')!;
    console.log(
      this.databaseService
        .getQuestionAnswers()
        .filter((x: any) => x.topicUrl == this.topicUrl)
    );
  }
}
