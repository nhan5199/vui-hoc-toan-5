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

        const test = workbook.Sheets['test'];

        if (!test) {
          return reject('Sheet name is not valid');
        }

        const testData = XLSX.utils.sheet_to_json(test, {
          defval: '',
        });

        resolve(testData);
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  }
}
