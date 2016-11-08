import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
    imports: [
      RouterModule.forChild([
        { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard] }
      ])
    ],
    exports: [
      RouterModule
    ]
})
export class LocationsRoutingModule {}
