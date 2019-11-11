/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
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

import { ProfileComponent } from './profiles/profile/profile.component';
import { SheFeedComponent } from './she/she-feed/she-feed.component';
import { MyDayComponent } from './mashups/my-day/my-day.component';
import { PasswordRecoverComponent } from './user/password-recover/password-recover.component';
import { PasswordChangeComponent } from './user/password-change/password-change.component';
import { HatApplicationListComponent } from './explore/hat-application-list/hat-application-list.component';
import { HatApplicationDetailsComponent } from './explore/hat-application-details/hat-application-details.component';
import { HatAppDetailsPermissionsComponent } from './explore/hat-app-details-permissions/hat-app-details-permissions.component';
import { DataDebitListComponent } from './data-management/data-debit-list/data-debit-list.component';
import { DataDebitDetailsComponent } from './data-management/data-debit-details/data-debit-details.component';
import { HatSetupLoginComponent } from './user/hat-setup-login/hat-setup-login.component';
import { DataDebitQuickConfirmComponent } from './data-management/data-debit-quick-confirm/data-debit-quick-confirm.component';
import { SettingsPageComponent } from './settings/settings-page/settings-page.component';
import { MarkdownViewComponent } from './shared/components/markdown-view/markdown-view.component';
import { ToolsListComponent } from './tools/tools-list/tools-list.component';
import { ToolsDetailsComponent } from './tools/tools-details/tools-details.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'public/profile', pathMatch: 'full' },
      { path: 'public/profile', component: PublicProfileComponent, canActivate: [NativeGuard] },
      { path: 'hatlogin', component: LoginOauthComponent, canActivate: [NativeGuard, AuthGuard] },
      { path: 'hat-setup-login', component: HatSetupLoginComponent, canActivate: [NativeGuard, AuthGuard] },
      { path: 'data-debit/:id/quick-confirm', component: DataDebitQuickConfirmComponent, canActivate: [NativeGuard, AuthGuard] },
      { path: 'user/login', component: LoginNativeComponent, canActivate: [NativeGuard] },
      { path: 'user/login/start', component: LoginStandaloneComponent },
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'feed', component: SheFeedComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'data-debit', component: DataDebitListComponent },
          { path: 'data-debit/:id', component: DataDebitDetailsComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'explore/:appKind', component: HatApplicationListComponent },
          { path: 'explore/:appKind/:appId', component: HatApplicationDetailsComponent },
          { path: 'explore/:appKind/:appId/permissions', component: HatAppDetailsPermissionsComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'tools', component: ToolsListComponent },
          { path: 'tools/:toolId', component: ToolsDetailsComponent },
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'mashups', component: MyDayComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'datastore', component: ProfileComponent }
        ]},
      { path: '', component: PrivateSpaceComponent, canActivate: [AuthGuard],
        children: [
          { path: 'settings', component: SettingsPageComponent },
          { path: 'settings/:termsId', component: MarkdownViewComponent },
        ]},
      { path: 'user/password/recover', component: PasswordRecoverComponent, canActivate: [NativeGuard] },
      { path: 'user/password/change/:resetToken', component: PasswordChangeComponent, canActivate: [NativeGuard] },
      { path: 'user/password', component: PrivateSpaceComponent, canActivate: [NativeGuard],
        children: [
          { path: 'change', component: PasswordChangeComponent, canActivate: [AuthGuard] }
        ]},
      { path: 'users/authenticate', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
    ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
