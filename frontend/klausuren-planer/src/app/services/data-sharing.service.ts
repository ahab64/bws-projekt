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

  removeUser(){
    sessionStorage.removeItem('UserId');
    sessionStorage.removeItem('UserRole');
    sessionStorage.removeItem('UserName');
  }

  private setUserId(userId: number){
    sessionStorage.setItem('UserId', userId.toString());
  }

  private setUserRole(role: string){
    sessionStorage.setItem('UserRole', role);
  }

  private setUserName(name: string){
    sessionStorage.setItem('UserName', name);
  }

  getUserId(): number {
    const userId = sessionStorage.getItem('UserId');
    if(userId === null) {
      return 0
    } else {
      return parseInt(userId);
    }
  }

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
