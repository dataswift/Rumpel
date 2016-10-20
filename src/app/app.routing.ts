import { Routes, RouterModule } from '@angular/router';
import { userMgmtRoutes } from './user-mgmt/user-mgmt.routing';

import { GridComponent } from './dashboard';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: GridComponent, canActivate: [AuthGuard] },
  ...userMgmtRoutes
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
