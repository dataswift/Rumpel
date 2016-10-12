import { Routes, RouterModule } from '@angular/router';
import { dataViewsRoutes } from './dataViews/data-views.routing';
import { userMgmtRoutes } from './user-mgmt/user-mgmt.routing';

import { GridComponent } from './dashboard';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: GridComponent, canActivate: [AuthGuard] },
  ...userMgmtRoutes,
  ...dataViewsRoutes
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);