import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from './data-sharing.service';
import { catchError, map } from 'rxjs/operators';
import { KlausurEvent } from '../models/event.model';
import { EventInput } from 'fullcalendar';
import { Observable, lastValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {

  
  constructor(
    private http: HttpClient,
    private dataSharingService: DataSharingService
  ) {}

  getCalendarInformation(userId: number): Observable<KlausurEvent[]> {
    const url = 'http://localhost:3001/api/kursfromuser';
    const data = { userId: userId };
    return this.http.post<KlausurEvent[]>(url, data).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  async loadEvents(): Promise<{transformed: EventInput[], raw: KlausurEvent[] }> {
    try {
      const userId = this.dataSharingService.getUserId();
      if(this.dataSharingService.getUserId !== null){}
      const $eventData = await lastValueFrom(
        this.getCalendarInformation(userId)
      );
      return {
        transformed: this.transformEventData($eventData),
        raw: $eventData
      };
    } catch (error) {
      throw error;
    }
  }

  private transformEventData(
    eventData: KlausurEvent[] | undefined
  ): EventInput[] {
    if (!eventData) {
      return [];
    }
    return eventData.map((event) => ({
      title: `${event.kursname} bei ${event.kurslehrer}`,
      start: event.date_start,
      end: event.date_ende,
    }));
  }
}
