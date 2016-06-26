import { provideRouter, RouterConfig } from '@angular/router';
import { TransactionsRoutes } from './transactions/transactions.routes';
import { ViewsRoutes } from './dataViews/views.routes';
import { UserMgmtRoutes } from './user-mgmt/user-mgmt.routes';

import { GridComponent } from './dashboard';
import { AuthGuard } from './auth.guard';

export const routes: RouterConfig = [
  { path: '', component: GridComponent, canActivate: [AuthGuard] },
  ...UserMgmtRoutes,
  ...ViewsRoutes,
  ...TransactionsRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];