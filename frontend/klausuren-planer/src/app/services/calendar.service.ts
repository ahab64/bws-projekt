import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from './data-sharing.service';
import { catchError, map } from 'rxjs/operators';
import { KlausurEvent } from '../models/event.model';
import { EventInput } from 'fullcalendar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(
    private http: HttpClient,
    private dataSharingService: DataSharingService
  ) {}

  private getCalendarInformation(userId: number): Observable<KlausurEvent[]> {
    const url = 'http://localhost:3001/api/kursfromuser';
    const data = { userId: userId };
    return this.http.post<any>(url, data);
  }
  
  loadEvents(): Promise<EventInput[]> {
    return new Promise<EventInput[]>((resolve, reject) => {
      this.getCalendarInformation(this.dataSharingService.getUserId())
        .pipe(
          catchError((error) => {
            reject(error); // Wenn ein Fehler auftritt, reject die Promise
            return [];
          }),
          map((eventData) => this.transformEventData(eventData))
        )
        .subscribe((events) => {
          resolve(events); // Resolve die Promise mit den Ereignissen
        });
    });
  }

  private transformEventData(
    eventData: KlausurEvent[] | undefined
  ): EventInput[] {
    if (!eventData) {
      return []; // Wenn eventData undefined ist, gib ein leeres Array zurück
    }

    const arrayOfEvents: EventInput[] = [];
    eventData.forEach((event) => {
      const tmpEvent: EventInput = {
        title: event.kursname + ' bei ' + event.kurslehrer,
        start: event.date_start,
        end: event.date_ende,
      };
      arrayOfEvents.push(tmpEvent);
    });
    return arrayOfEvents;
  }
}
