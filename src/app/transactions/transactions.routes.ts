import { RouterConfig } from '@angular/router';
import { DataDebitConfirmComponent } from './index';

export const TransactionsRoutes: RouterConfig = [
  { path: 'dataDebit/:uuid/confirm', component: DataDebitConfirmComponent }
];
