import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { NotablesViewComponent } from './notables-view/notables-view.component';

const notablesRoutes: Routes = [
  { path: 'notables', component: NotablesViewComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(notablesRoutes);
