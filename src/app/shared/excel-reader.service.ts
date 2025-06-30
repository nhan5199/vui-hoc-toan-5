// excel-reader.service.ts
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelReaderService {
  constructor() {}

  readFileReading(
    file: File
  ): Promise<{ contentData: any[]; interpreterData: any[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const contentSheet = workbook.Sheets['content'];
        const interpreter = workbook.Sheets['interpreter'];

        if (!contentSheet || !interpreter) {
          return reject('Sheet names are not valid');
        }

        const contentData = XLSX.utils.sheet_to_json(contentSheet, {
          defval: '',
        });
        const interpreterData = XLSX.utils.sheet_to_json(interpreter, {
          defval: '',
        });

        resolve({ contentData, interpreterData });
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  }

  readFileTest(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets['test'];

        if (!sheet) {
          return reject('Sheet name is not valid');
        }

        const rawData = XLSX.utils.sheet_to_json<any>(sheet, {
          defval: '',
        });

        const result: any[] = [];
        let currentGroup: any = null;

        rawData.forEach((item) => {
          if (item.questionType === 1) {
            // Push previous group if exists
            if (currentGroup) {
              result.push(currentGroup);
              currentGroup = null;
            }
            result.push({
              question: item.question,
              questionType: 1,
              answerA: item.answerA,
              answerB: item.answerB,
              answerC: item.answerC,
              answerD: item.answerD,
              correctAnswer: item.correctAnswer,
              level: item.level,
            });
          } else if (item.questionType === 2) {
            // Push previous group if exists
            if (currentGroup) {
              result.push(currentGroup);
            }
            currentGroup = {
              questionType: 2,
              listQuestions: [],
              level: item.level,
            };
            currentGroup.listQuestions.push({
              question: item.question,
              answerA: item.answerA,
              answerB: item.answerB,
              answerC: item.answerC,
              answerD: item.answerD,
              correctAnswer: item.correctAnswer,
            });
          } else {
            if (currentGroup && currentGroup.questionType === 2) {
              currentGroup.listQuestions.push({
                question: item.question,
                answerA: item.answerA,
                answerB: item.answerB,
                answerC: item.answerC,
                answerD: item.answerD,
                correctAnswer: item.correctAnswer,
              });
            }
          }
        });

        if (currentGroup) {
          result.push(currentGroup);
        }

        resolve(result);
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  }
}
