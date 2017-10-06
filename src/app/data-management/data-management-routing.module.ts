import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataPlugsComponent } from './data-plugs/data-plugs.component';
import { DataPlugDataComponent } from './data-plug-data/data-plug-data.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'dataplugs', component: DataPlugsComponent, canActivate: [AuthGuard] },
  { path: 'dataplugs/data/:id', component: DataPlugDataComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DataManagementRoutingModule { }
