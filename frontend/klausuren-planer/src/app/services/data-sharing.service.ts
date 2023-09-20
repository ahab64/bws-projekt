import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor(private sessionStorage: SessionStorageService) { }

  private user: User = {
    userId: 0,
    userRole: '',
    name: ''
  };

  setUser(user: User) {
     this.user = user;
  }
  getUser(): User {
    return this.user;
  }

  getUserId(): number {
    return this.user.userId;
  }
}
