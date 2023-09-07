import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    const url = 'http://localhost:3001/api/login';
     // Verschlüssle das Passwort mit CryptoJS (z.B., AES-Verschlüsselung)
     const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_key').toString();
    const data = {
      email: username,
      password: encryptedPassword
    };
    return this.http.post(url, data);
  }
}
