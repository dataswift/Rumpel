import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService) {
  }

  canActivate() {
    if (this.authSvc.isAuthenticated()) return true;
    this.authSvc.tryPreviousToken();
    return false;
  }
}