//Autor: Merlin Burbach
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, lastValueFrom, throwError } from 'rxjs';
import { PendingUser } from '../models/pendingUser.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  // Ruft ausstehende Benutzeranfragen ab
  getPendingUser(): Promise<PendingUser[]> {
    const url = `${this.baseUrl}/pendinguser`;
    return lastValueFrom(this.http
      .post<PendingUser[]>(url, {})
      .pipe(catchError(this.handleError)))
  }

  // Genehmigt einen Benutzer
  approveUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/admin/user-approval`;
    const data = {
      userId: userId,
      action: 'approve',
    };
    return this.http.post(url, data).pipe(catchError(this.handleError));
  }

  // Sperrt einen Benutzer
  blockUser(userId: number) {
    const url = `${this.baseUrl}/admin/user-approval`;
    const data = {
      userId: userId,
      action: 'block',
    };
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  // Behandelt Fehler in HTTP-Anfragen
  private handleError(error: any) {
    return throwError(() => error);
  }
}
