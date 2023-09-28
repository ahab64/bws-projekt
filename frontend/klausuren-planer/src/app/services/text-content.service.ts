//Autor: Merlin Burbach
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TextContentService {

  constructor(private http: HttpClient) { }

  getTextContents(): Observable<any> {
    return this.http.get('../../assets/text-inhalte.json');
  }
}
