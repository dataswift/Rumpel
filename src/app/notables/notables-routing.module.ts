import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { NotablesViewComponent } from './notables-view/notables-view.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'notables', component: NotablesViewComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class NotablesRoutingModule {}
