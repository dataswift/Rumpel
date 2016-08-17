import { Routes, RouterModule } from '@angular/router';
import { DataDebitConfirmComponent } from './index';
import { AuthGuard } from '../auth.guard';

export const transactionsRoutes: Routes = [
  { path: 'dataDebit/:uuid/confirm', component: DataDebitConfirmComponent, canActivate: [AuthGuard] }
];

// export const transactionsRouting = RouterModule.forChild(transactionsRoutes);
