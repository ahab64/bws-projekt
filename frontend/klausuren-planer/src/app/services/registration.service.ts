//Autor: Merlin Burbach
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserExtended } from '../models/userExtended.model';
import { Observable, catchError } from 'rxjs';
import { Kurs } from '../models/kurs.model';
import { error } from 'jquery';
import { er } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  // Benutzerregistrierung durchführen
  registration(user: UserExtended) {
    const url = 'http://localhost:3001/api/registration';
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      kurse: user.kurse,
      rolle: user.rolle
    };
    return this.http.post(url, data);
  }

  // Kurse basierend auf der Klassenstufe abrufen
  getKurse(stufe: string): Observable<Kurs[]> {
    const url = 'http://localhost:3001/api/kursefromlevel';
    const data = {
      "stufe": stufe
    }
    return this.http.post<Kurs[]>(url, data).pipe(
      catchError(
        (error) =>  {throw error;}
      )
    )
  }
}
