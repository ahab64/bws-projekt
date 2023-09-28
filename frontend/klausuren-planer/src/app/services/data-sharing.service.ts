//Autor: Merlin Burbach
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Kurs } from '../models/kurs.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  // Daten in Session Storage speichern
  storeUser(userId: number, userRole: string, userName:string): void {
    this.setUserId(userId);
    this.setUserRole(userRole);
    this.setUserName(userName);
  }

  // Benutzerdaten aus dem Session Storage entfernen
  removeUser(){
    sessionStorage.removeItem('UserId');
    sessionStorage.removeItem('UserRole');
    sessionStorage.removeItem('UserName');
  }

  // Private Hilfsfunktion zum Speichern der Benutzer-ID im Session Storage
  private setUserId(userId: number){
    sessionStorage.setItem('UserId', userId.toString());
  }

  // Private Hilfsfunktion zum Speichern der Benutzerrolle im Session Storage
  private setUserRole(role: string){
    sessionStorage.setItem('UserRole', role);
  }

  // Private Hilfsfunktion zum Speichern des Benutzernamens im Session Storage
  private setUserName(name: string){
    sessionStorage.setItem('UserName', name);
  }

  // Benutzer-ID aus dem Session Storage abrufen
  getUserId(): number {
    const userId = sessionStorage.getItem('UserId');
    if(userId === null) {
      return 0
    } else {
      return parseInt(userId);
    }
  }

  // Benutzerinformationen aus dem Session Storage abrufen
  getUser(): User {
    const _userId = sessionStorage.getItem('UserId');
    const _userName = sessionStorage.getItem('UserName'); 
    const _userRole = sessionStorage.getItem('UserRole');

    if(_userId !== null && _userName !== null && _userRole !== null){
      const user: User = { 
        userId: parseInt(_userId),
        name: _userName,
        userRole: _userRole 
      }
      return user
    } else {
      const user: User = {
        userId: 0,
        name: '',
        userRole: '',
      }
      return user;
      }
    }

  }
