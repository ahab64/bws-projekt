import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvParserService {
  parseCSV(file: File): Promise<string[][]> {
    return new Promise<string[][]>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target?.result as string;
        const rows = csvText.split('\n');
        const data: string[][] = [];

        for (const row of rows) {
          const values = row.split(',');
          data.push(values);
        }

        resolve(data);
      };

      reader.onerror = (e) => {
        reject('Error reading CSV file.');
      };

      reader.readAsText(file);
    });
  }
}
