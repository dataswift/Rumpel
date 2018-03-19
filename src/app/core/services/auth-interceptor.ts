import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/user.interface';

const TOKEN_REFRESH_INTERVAL = 600; // Measured in seconds

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string;
  private hatUrl: string;
  private lastTokenUpdate: number;

  constructor(private authSvc: AuthService) {
    this.authSvc.token$.subscribe(token => {
      this.token = token;
      this.lastTokenUpdate = Date.now();
    });
    this.authSvc.user$.subscribe((user: User) => this.hatUrl = user.hatUrl);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token && this.hatUrl) {
      const modReq = req.clone({
        url: this.hatUrl ? this.hatUrl + req.url : req.url,
        headers: req.headers.set('X-Auth-Token', this.token)
      });

      return next.handle(modReq).do(this.updateAuthToken.bind(this));
    } else {
      return Observable.throw('Unauthenticated!');
    }
  }

  private updateAuthToken(event: HttpEvent<any>): void {
    if (event instanceof HttpResponse && event.status === 200 && this.timeIsElapsed(TOKEN_REFRESH_INTERVAL)) {
      const freshToken = event.headers.get('x-auth-token');

      if (freshToken) {
        this.authSvc.loginWithToken(freshToken);
      }
    }
  }

  private timeIsElapsed(duration: number): boolean {
    return Date.now() - this.lastTokenUpdate > duration * 1000;
  }
}
