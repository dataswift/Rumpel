import { Routes, RouterModule } from '@angular/router';
import { DataDebitConfirmComponent } from './data-debit-confirm/data-debit-confirm.component';

export const dataDebitsRoutes: Routes = [
  { path: 'dataDebit/:uuid/confirm', component: DataDebitConfirmComponent }
];

export const routing = RouterModule.forChild(dataDebitsRoutes);
