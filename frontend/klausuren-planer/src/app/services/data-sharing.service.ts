import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private user: User = {
    userId: '',
    userRole: '',
    name: ''
  };

  setUser(user: User) {
     this.user = user;
  }
  getUser(): User {
    return this.user;
  }
}
