import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserExtended } from '../models/userExtended.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registration(user: UserExtended) {
    const url = 'http://localhost:3001/api/registration';
    const encryptedPassword = CryptoJS.AES.encrypt(user.password, 'secret_key').toString();
    const data = {
      name: user.name,
      email: user.email,
      password: encryptedPassword,
      kurse: user.kurse,
      rolle: user.rolle
    };
    return this.http.post(url, data);
  }
}
