import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models/user.model';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private dataSharingService: DataSharingService, private router: Router){}

  username: string = '';
  password: string = '';
  private user: User = {
    name: '',
    userId: '',
    userRole: ''
  }
  
  onSubmit(){
    this.loginService.login(this.username, this.password).pipe(
      catchError(error => {
        // Hier können Sie den Fehler verarbeiten und/oder protokollieren
        console.error('Fehler bei der Anmeldung:', error);
        // Wir geben ein neues Observable zurück, das einen leeren Fehler zurückgibt
        return throwError(() => error);
      })
    )
    .subscribe(response => {
      this.user.name = response.name;
      this.user.userRole = response.userRole;
      this.user.userId = response.userId;
      this.dataSharingService.setUser(this.user);
      this.router.navigate(['/dashboard']);
    })
  }
}
