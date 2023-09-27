import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models/user.model';
import { DataSharingService } from '../services/data-sharing.service';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFailed: boolean = false;
  textInhalte: any;
  username: string = '';
  password: string = '';
  private user: User = {
    name: '',
    userId: 0,
    userRole: '',
  };

  constructor(
    private loginService: LoginService,
    private dataSharingService: DataSharingService,
    private router: Router,
    private textContentService: TextContentService
  ) {}

  ngOnInit() {
    this.textContentService.getTextContents().subscribe((data) => {
      this.textInhalte = data;
    });
  }

  onSubmit() {
    this.loginService
      .login(this.username, this.password)
      .pipe(
        catchError((error) => {
          this.loginFailed = true;
          console.error('Fehler bei der Anmeldung:', error);
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        this.user.name = response.name;
        this.user.userRole = response.rolle;
        this.user.userId = response.userid;
        this.dataSharingService.storeUser(this.user.userId, this.user.userRole, this.user.name);
        this.router.navigate(['/dashboard']);
      });
  }

  onRegister() {
    this.router.navigate(['/registration'])
  }
}
