import { RouterConfig } from '@angular/router';
import { AuthComponent, LoginComponent } from './index';

export const UserMgmtRoutes: RouterConfig = [
  { path: 'users/login', component: LoginComponent },
  { path: 'users/authenticate/:jwt', component: AuthComponent }
];