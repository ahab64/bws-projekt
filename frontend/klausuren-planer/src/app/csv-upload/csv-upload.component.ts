import { CsvUploadService } from '../services/csv-upload.service';

import { Component } from '@angular/core';
import * as Papa from 'papaparse';

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

  parseAndSendCsv() {
    if (this.selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        // Parse the CSV data using PapaParse
        Papa.parse(e.target.result, {
          header: true, // Treat the first row as headers
          dynamicTyping: true, // Automatically detect data types
          skipEmptyLines: true, // Skip empty lines
          complete: (result: any) => {
            // Convert the result to JSON
            const jsonData = result.data;
            console.log(jsonData);

            // Send the JSON data to the CsvUploadService's sendCsvToApi method
            this.csvUploadService.sendJsonToApi(jsonData).subscribe(
              (response: any) => {
                console.log('API Response:', response);
              },
              (error: any) => {
                console.error('API Error:', error);
              }
            );
          },
          error: (error: any) => {
            console.error('CSV parsing error:', error.message);
          }
        });
      };

      fileReader.readAsText(this.selectedFile);
    } else {
      console.error('No CSV file selected.');
    }
  }
}