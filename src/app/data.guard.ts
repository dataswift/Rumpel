import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UiStateService } from './services';

@Injectable()
export class DataGuard implements CanActivate {

  constructor(private uiState: UiStateService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const routeStr = route.url[0].path;
    const types = this.uiState.getDataTypes();

    if (~types.indexOf(routeStr)) {
      return true;
    }
    else {
      this.router.navigate(['/issue']);
      return false;
    }

  }
}