import { Component } from '@angular/core';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})


export class CsvUploadComponent {
  selectedFile: File | null = null;
  csvData: any[] = []; // Array to store CSV data

  constructor() { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
    // Read and parse the selected CSV file
    if (this.selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        const csvData = e.target.result;
        this.csvData = this.parseCsvData(csvData);
        console.log(csvData);
      };

      fileReader.readAsText(this.selectedFile);
    }
  }

  private parseCsvData(csvData: string): any[] {
    // Implement CSV parsing logic here to convert the CSV data to an array of objects.
    // For simplicity, we'll assume a basic CSV format (comma-separated values).
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
    
      // Check if the row is empty or has fewer values than headers
      if (values.length === headers.length) {
        const row: Record<string, any> = {};
    
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = values[j];
        }
    
        data.push(row);
      }
    }

    return data;
  }
}
