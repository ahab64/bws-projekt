import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from './auth.service'; // Ersetze dies durch deinen Authentifizierungsdienst
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {} // Ersetze dies durch deinen Authentifizierungsdienst

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isLoginRequest = req.url.endsWith('/login');
    const isTextAssetRequest = req.url.endsWith('/text-inhalte.json');
    const isRegistrationRequest = req.url.endsWith('/registration');
    if (isLoginRequest || isTextAssetRequest || isRegistrationRequest) {
      return next.handle(req);
    }

    const token = this.authService.getToken();

    if (token !== null && token !== undefined) {
      const authReq = req.clone({
        setHeaders: {
          'x-access-token': token,
        },
      });
      return next.handle(authReq);
    } else {
      this.authService.logout();
      return EMPTY;
    }
  }
}
