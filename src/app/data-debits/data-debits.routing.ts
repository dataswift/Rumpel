import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { DataDebitConfirmComponent } from './data-debit-confirm/data-debit-confirm.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'dataDebit/:uuid/confirm', component: DataDebitConfirmComponent, canActivate:[AuthGuard] }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DataDebitsRoutingModule {}
