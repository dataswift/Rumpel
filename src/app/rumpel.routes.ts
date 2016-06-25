import { provideRouter, RouterConfig } from '@angular/router';
import { TransactionsRoutes } from './transactions/transactions.routes';
import { ViewsRoutes } from './dataViews/views.routes';

import { GridComponent } from './dashboard';
import { AuthComponent } from './auth';

export const routes: RouterConfig = [
  { path: '', component: GridComponent },
  { path: 'authenticate/:jwt', component: AuthComponent },
  ...ViewsRoutes,
  ...TransactionsRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];