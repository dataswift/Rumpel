import { provideRouter, RouterConfig } from '@angular/router';
import { TransactionsRoutes } from './transactions/transactions.routes';
import { ViewsRoutes } from './dataViews/views.routes';
import { UserMgmtRoutes } from './user-mgmt/user-mgmt.routes';

import { GridComponent } from './dashboard';
import { IssueComponent } from './issue';
import { AboutComponent } from './about';
import { AuthGuard } from './auth.guard';

export const routes: RouterConfig = [
  { path: '', component: GridComponent, canActivate: [AuthGuard] },
  { path: 'issue', component: IssueComponent },
  { path: 'about', component: AboutComponent },
  ...UserMgmtRoutes,
  ...ViewsRoutes,
  ...TransactionsRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];