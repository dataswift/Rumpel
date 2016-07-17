import { RouterConfig } from '@angular/router';
import { AuthComponent, LoginComponent, NewUserComponent } from './index';

export const UserMgmtRoutes: RouterConfig = [
  { path: 'users/login', component: LoginComponent },
  { path: 'users/authenticate/:jwt', component: AuthComponent },
  { path: 'users/new-user', component: NewUserComponent }
];