import { Injectable } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router, private dataSharingService: DataSharingService) {}

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
}
