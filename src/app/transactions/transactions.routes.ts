import { RouterConfig } from '@angular/router';
import { DataDebitConfirmComponent } from './index';
import { AuthGuard } from '../auth.guard';

export const TransactionsRoutes: RouterConfig = [
  { path: 'dataDebit/:uuid/confirm', component: DataDebitConfirmComponent, canActivate: [AuthGuard] }
];
