//Autor: Sajiel Ahmad
import { CsvUploadService } from '../../services/csv-upload.service';
import { Component } from '@angular/core';
import * as Papa from 'papaparse';

//CSV upload Komponente
@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent {
  selectedFile: File | null = null;

  constructor(private csvUploadService: CsvUploadService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Parst die ausgewählte CSV-Datei und sendet sie an den Service
  parseAndSendCsv() {
    if (this.selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        Papa.parse(e.target.result, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result: any) => {
            const jsonData = result.data.map((row: any) => {
              if (typeof row.Kurse === 'string') {
                row.Kurse = row.Kurse.split(';').map((kurs: string) => kurs.trim());
              }
              return row;
            });

            this.csvUploadService.sendJsonToApi(jsonData).subscribe(
              (response: any) => {
              },
              (error: any) => {
              }
            );
          },
          error: (error: any) => {
          }
        });
      };

      fileReader.readAsText(this.selectedFile);
    } else {
    }
  }
}
