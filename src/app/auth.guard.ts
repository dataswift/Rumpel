import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) {
  }

  canActivate() {
    if (this.authSvc.isAuthenticated()) {
      return true;
    } else if (this.authSvc.isPreviousTokenValid()) {
      const token = this.authSvc.getSavedToken();
      this.router.navigate(['/users/authenticate', token]);
      return false;
    } else {
      this.router.navigate(['/users/login']);
      return false;
    }

  }
}