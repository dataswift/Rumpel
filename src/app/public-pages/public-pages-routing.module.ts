import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicProfileComponent } from './public-profile/public-profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'public/profile', component: PublicProfileComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PublicPageRoutingModule {}