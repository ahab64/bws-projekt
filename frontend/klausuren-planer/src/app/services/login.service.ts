import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, passwordEncrypted: string): Observable<any> {
    const url = 'http://localhost:3000/api/login';
    const data = {
      email: username,
      password: passwordEncrypted
    };
    return this.http.post(url, data);
  }
}
