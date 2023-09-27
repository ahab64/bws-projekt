import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvUploadService {
  private url = 'http://localhost:3001/api/csv'; // Replace with your API upload CSV path

  constructor(private http: HttpClient) {}

  sendJsonToApi(jsonData: any): Observable<any> {
    // Send the JSON data to the specified API endpoint using an HTTP POST request
    return this.http.post(this.url, jsonData);
  }
}  

