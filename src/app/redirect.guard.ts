import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hash = window.location.hash;
    let path = '';

    if (hash.startsWith('#')) {
      path = hash.substring(1);
    } else if (hash.startsWith('%23')) {
      path = hash.substring(3)
    }

    window.location.href =  window.location.origin + path;

    return false;
  }
}
