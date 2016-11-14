import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userMgmtRoutes } from './user-mgmt/user-mgmt.routing';

import { GridComponent } from './dashboard';
import { AboutComponent } from './layout/about/about.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: GridComponent, canActivate: [AuthGuard] },
      { path: 'about', component: AboutComponent },
      ...userMgmtRoutes
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
