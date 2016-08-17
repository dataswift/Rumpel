import { Routes, RouterModule } from '@angular/router';
import { AuthComponent, LoginComponent } from './index';

export const userMgmtRoutes: Routes = [
  { path: 'users/login', component: LoginComponent },
  { path: 'users/authenticate/:jwt', component: AuthComponent }
];

// export const userMgmtRouting = RouterModule.forChild(userMgmtRoutes);