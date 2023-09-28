//Autor: Sajiel Ahmad
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvUploadService {
  private url = 'http://localhost:3001/api/csv';

  constructor(private http: HttpClient) {}

  // Schickt die User Daten an die API
  sendJsonToApi(jsonData: any): Observable<any> {
    return this.http.post(this.url, jsonData);
  }
}  

