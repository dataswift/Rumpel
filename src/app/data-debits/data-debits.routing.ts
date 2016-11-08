import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataDebitConfirmComponent } from './data-debit-confirm/data-debit-confirm.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'dataDebit/:uuid/confirm', component: DataDebitConfirmComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DataDebitsRoutingModule {}
