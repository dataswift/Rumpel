import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs/Rx';
import { UserService } from './services/user.service';
import { User } from './shared/interfaces/index';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private user: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    var subject = new ReplaySubject<boolean>();
    this.user.user$.subscribe((user: User) => {
      subject.next(user.authenticated);

      if (user.authenticated === false) {
        let navigationExtras: NavigationExtras = {
          queryParams: { 'redirect': route.routeConfig.path }
        };

        this.router.navigate(['/users/login'], navigationExtras);
      }
    });

    if (route.queryParams['token']) {
      this.user.login(route.queryParams['token']);
    } else {
      this.user.isAuthenticated();
    }

    return subject.asObservable().take(1);
  }
}
