import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicProfileComponent } from './public-profile/public-profile.component';
import { PublicNotablesComponent } from './public-notables/public-notables.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'public/profile', component: PublicProfileComponent },
      { path: 'public/notables', component: PublicNotablesComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PublicPageRoutingModule {}
