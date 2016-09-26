import { Routes, RouterModule } from '@angular/router';
import { transactionsRoutes } from './transactions/transactions.routing';
import { dataViewsRoutes } from './dataViews/data-views.routing';
import { userMgmtRoutes } from './user-mgmt/user-mgmt.routing';

import { GridComponent } from './dashboard';
import { AboutComponent } from './about';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: GridComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  ...userMgmtRoutes,
  ...dataViewsRoutes,
  ...transactionsRoutes
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);