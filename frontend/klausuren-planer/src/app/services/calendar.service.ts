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

  deleteCalendarEvent(klausurId: number) {
    const url = 'http://localhost:3001/api/deleteTermin';
    const data = {
      klausur_id: klausurId,
    };
    return this.http.post<any>(url, data).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  createIsoString(dayDate: string, timeDate: string): string {
    const inputDateString =
      timeDate
    const targetDateString = dayDate;

    // Datum aus dem ersten String extrahieren
    const inputDate = new Date(inputDateString);

    // Zeit aus dem ersten Datum extrahieren
    const inputTime = inputDate.toTimeString().split(' ')[0];

    // Datum aus dem zweiten String extrahieren
    const targetDate = new Date(targetDateString);

    // Das Datum des zweiten Strings auf das Datum des ersten Strings setzen
    targetDate.setHours(Number(inputTime.split(':')[0]));
    targetDate.setMinutes(Number(inputTime.split(':')[1]));
    targetDate.setSeconds(Number(inputTime.split(':')[2]));

    // Das Format des zweiten Strings beachten (in ISO-Format umwandeln)
     const formattedTargetDate = targetDate.toISOString();
     return formattedTargetDate
  }

  updateCalendarEvent(klausurId: number, start: string, end: string) {
    const url = 'http://localhost:3001/api/updateTermin';
    const data = {
      klausur_id: klausurId,
      date_start: start,
      date_ende: end,
    };
    return this.http.post<any>(url, data).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  formartTimeString(dateString: string) {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Get the individual components (year, month, day, hours, minutes, seconds, milliseconds)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    // Create the formatted date string in the desired format
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    return formattedDate;
  }

  addCalendarEvent(
    kursId: number,
    dateStart: string,
    dateEnd: string
  ): Observable<any> {
    const url = 'http://localhost:3001/api/klausureintrag';
    const data = {
      kurs_id: kursId,
      date_start: dateStart,
      date_ende: dateEnd,
    };
    return this.http.post<any>(url, data).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  async loadEvents(): Promise<{
    transformed: EventInput[];
    raw: KlausurEvent[];
  }> {
    try {
      const userId = this.dataSharingService.getUserId();
      if (this.dataSharingService.getUserId !== null) {
      }
      const $eventData = await lastValueFrom(
        this.getCalendarInformation(userId)
      );
      return {
        transformed: this.transformEventData($eventData),
        raw: $eventData,
      };
    } catch (error) {
      throw error;
    }
  }

  extractHoursAndMinutes(dateTimeStr: string): {
    hours: number;
    minutes: number;
  } {
    // Split the date and time parts
    const [dateStr, timeStr] = dateTimeStr.split('T');

    // Extract the hours and minutes from the time part
    const [time, _] = timeStr.split('.');
    const [hours, minutes] = time.split(':').map(Number);

    return { hours, minutes };
  }
  toLocalTime(date: Date) {
    return date.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
  }

  private transformEventData(
    eventData: KlausurEvent[] | undefined
  ): EventInput[] {
    if (!eventData) {
      return [];
    }
    return eventData.map((event) => ({
      id: event.id.toString(),
      groupId: event.klausur_id.toString(),
      title: `${event.kursname} bei ${event.kurslehrer}`,
      start: event.date_start,
      end: event.date_ende,
    }));
  }
}
