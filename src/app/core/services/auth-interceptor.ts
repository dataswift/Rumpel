import { throwError as observableThrowError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../../user/user.interface';
import { APP_CONFIG, AppConfig } from '../../app.config';

const TOKEN_REFRESH_INTERVAL = 600; // Measured in seconds

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string;
  private hatUrl: string;
  private lastTokenUpdate: number;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private authSvc: AuthService,
              private router: Router) {
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

      return next.handle(modReq).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.processResponse(event);
        }
      }));
    } else {
      return observableThrowError('Unauthenticated!');
    }
  }

  private processResponse(event: HttpResponse<any>): void {
    if (event.status === 200 && this.timeIsElapsed(TOKEN_REFRESH_INTERVAL)) {
      const freshToken = event.headers.get('x-auth-token');

      if (freshToken) {
        this.authSvc.loginWithToken(freshToken);
      }
    } else if (event.status === 401) {
      this.router.navigate(this.config.native ? ['user', 'login'] : ['user', 'login', 'start']);
    }
  }

  private timeIsElapsed(duration: number): boolean {
    return Date.now() - this.lastTokenUpdate > duration * 1000;
  }
}
