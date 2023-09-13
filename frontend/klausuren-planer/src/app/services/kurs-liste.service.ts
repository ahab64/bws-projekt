import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KursListeService {

  constructor(private http: HttpClient) { }

  getKursListe(klassenstufe: string){}
}
