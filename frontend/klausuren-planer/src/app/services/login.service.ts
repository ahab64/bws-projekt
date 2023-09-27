import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private token: string | null = null;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}
  login(username: string, password: string): Observable<any> {
    const url = 'http://localhost:3001/api/login';
    const data = {
      email: username,
      password: password,
    };

    // Use the map operator to transform the response into an Observable
    return this.http.post<any>(url, data).pipe(
      map((response) => {
        this.setSession(response);
        return response; // You can return the response data if needed
      })
    );
  }
  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.idToken);
  }
}
