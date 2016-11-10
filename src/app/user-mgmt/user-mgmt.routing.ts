import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './index';

export const userMgmtRoutes: Routes = [
  { path: 'users/login', component: LoginComponent }
];
