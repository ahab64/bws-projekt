//Autor: Merlin Burbach
import { Injectable } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router, private dataSharingService: DataSharingService, private jwtHelper: JwtHelperService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userId = this.dataSharingService.getUserId()

    if (userId !== 0) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // Überprüft ob der aktuelle Token noch gültig ist
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      if(expirationDate){
        return expirationDate <= new Date();
      }
    }
    return true;
  }

  // Liest den aktuellen Token
  getToken() {
    return localStorage.getItem('token');
  }

  // Loggt den User aus
  logout() {
    localStorage.removeItem('token');
    this.dataSharingService.removeUser();
    this.router.navigate(['/'])
  }
}
