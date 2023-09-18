import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserExtended } from '../models/userExtended.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registration(user: UserExtended) {
    const url = 'http://localhost:3001/api/registration';
    const kurseNamen: string[] = [];
    user.kurse.forEach(kurs => {
      kurseNamen.push(kurs.name)
    }); 
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      kurse: kurseNamen,
      rolle: user.rolle
    };
    return this.http.post(url, data);
  }
}
