import { Injectable } from '@angular/core';

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
}
