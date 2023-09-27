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

 getPendingUser(): Promise<PendingUser[]> {
    const url = `${this.baseUrl}/pendinguser`;
    return lastValueFrom(this.http
      .post<PendingUser[]>(url, {})
      .pipe(catchError(this.handleError)))
  }

  approveUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/admin/user-approval`;
    console.log(url)
    const data = {
      userId: userId,
      action: 'approve',
    };
    return this.http.post(url, data).pipe(catchError(this.handleError));
  }

  blockUser(userId: number) {
    const url = `${this.baseUrl}/admin/user-approval`;
    const data = {
      userId: userId,
      action: 'block',
    };
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
