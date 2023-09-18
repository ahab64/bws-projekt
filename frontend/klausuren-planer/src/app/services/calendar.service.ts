import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient,private dataSharingService: DataSharingService) { }

  userId = this.dataSharingService.getUserId();


  getCalendarInformation() {
    const url = 'http://localhost:3001/api/kursfromuser';
    return this.http.post(url, this.userId);
  }
}
