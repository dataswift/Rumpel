import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

const layoutRoutes: Routes = [
  { path: 'about', component: AboutComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forChild(layoutRoutes);