import { Injectable } from '@angular/core';

export interface FileData {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  questionAnswers: any;

  constructor() {}

  setQuestionAnswers(value: any) {
    this.questionAnswers = value;
  }

  getQuestionAnswers() {
    return this.questionAnswers;
  }
}
