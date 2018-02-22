/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './core/about/about.component';
import { AuthGuard } from './auth.guard';
import { LoginOauthComponent } from './user/login-oauth/login-oauth.component';
import { NativeGuard } from './native-guard.service';
import { PublicProfileComponent } from './public-pages/public-profile/public-profile.component';
import { PrivateSpaceComponent } from './core/private-space/private-space.component';
import { LoginNativeComponent } from './user/login-native/login-native.component';
import { LoginStandaloneComponent } from './user/login-standalone/login-standalone.component';

// Standalone modules

import { DataPlugsComponent } from './data-management/data-plugs/data-plugs.component';
import { DataPlugDataComponent } from './data-management/data-plug-data/data-plug-data.component';
import { ProfileComponent } from './profiles/profile/profile.component';
import { OffersHomeComponent } from './offers/offers-home/offers-home.component';
import { GridComponent } from './dashboard/grid/grid.component';
import { SheFeedComponent } from './dashboard/she-feed/she-feed.component';
import { NotablesViewComponent } from './notables/notables-view/notables-view.component';
import { MashupsComponent } from './mashups/mashups/mashups.component';
import { MyDayComponent } from './mashups/my-day/my-day.component';
import { PasswordRecoverComponent } from './user/password-recover/password-recover.component';
import { PasswordChangeComponent } from './user/password-change/password-change.component';
import { DataPlugFeedComponent } from './data-management/data-plug-feed/data-plug-feed.component';
import { DataPlugStaticComponent } from './data-management/data-plug-static/data-plug-static.component';
import {LocationsComponent} from './locations/locations/locations.component';
import {SocialComponent} from './social/social/social.component';
import {HatApplicationListComponent} from './explore/hat-application-list/hat-application-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'public/profile', pathMatch: 'full' },
      { path: 'public/profile', component: PublicProfileComponent, canActivate: [NativeGuard] },
      { path: 'hatlogin', component: LoginOauthComponent, canActivate: [NativeGuard] },
      { path: 'user/login', component: LoginNativeComponent, canActivate: [NativeGuard] },
      { path: 'user/login/start', component: LoginStandaloneComponent },
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'dashboard', component: GridComponent },
          { path: 'feed', component: SheFeedComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'offers', component: OffersHomeComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'notables', component: NotablesViewComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'locations', component: LocationsComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'social', component: SocialComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'explore', component: HatApplicationListComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'mashups', component: MashupsComponent,
            children: [
              { path: 'myday', component: MyDayComponent }
            ]}
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'dataplugs', component: DataPlugsComponent },
          { path: 'dataplugs/data/location/feed', component: LocationsComponent },
          { path: 'dataplugs/data/:provider', component: DataPlugDataComponent,
            children: [
              { path: 'feed', component: DataPlugFeedComponent },
              { path: 'static', component: DataPlugStaticComponent }
            ]}
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'datastore', component: ProfileComponent }
        ]},
      { path: 'user/password/recover', component: PasswordRecoverComponent, canActivate: [NativeGuard] },
      { path: 'user/password/change/:resetToken', component: PasswordChangeComponent, canActivate: [NativeGuard] },
      { path: 'user/password', component: PrivateSpaceComponent, canActivate: [NativeGuard],
        children: [
          { path: 'change', component: PasswordChangeComponent, canActivate: [AuthGuard] }
        ]},
      { path: 'users/authenticate', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'about', component: AboutComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
