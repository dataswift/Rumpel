import { Routes, RouterModule } from '@angular/router';
import { DataDebitConfirmComponent } from './index';

export const transactionsRoutes: Routes = [
  { path: 'dataDebit/:uuid/confirm', component: DataDebitConfirmComponent }
];

// export const transactionsRouting = RouterModule.forChild(transactionsRoutes);
