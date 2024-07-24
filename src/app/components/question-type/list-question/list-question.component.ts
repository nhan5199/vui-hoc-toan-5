import { Component } from '@angular/core';
import { ReArrangeHorizontalComponent } from '../re-arrange-horizontal/re-arrange-horizontal.component';
import { ReArrangeVerticalComponent } from '../re-arrange-vertical/re-arrange-vertical.component';

@Component({
  selector: 'app-list-question',
  standalone: true,
  imports: [ReArrangeHorizontalComponent, ReArrangeVerticalComponent],
  templateUrl: './list-question.component.html',
  styleUrl: './list-question.component.css',
})
export class ListQuestionComponent {}
