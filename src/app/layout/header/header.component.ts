/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../dialog.service';
import { NotificationsService } from '../notifications.service';
import { ExternalNotification } from '../../shared/interfaces/index';
import { Profile } from '../../shared/interfaces';
import { ProfilesService } from '../../profiles/profiles.service';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { UserService } from '../../services/index';
import { User } from '../../shared/interfaces/index';
import { Subscription } from 'rxjs/Rx';
import { AccountStatus } from '../../user/account-status.interface';
import { APP_CONFIG, IAppConfig } from '../../app.config';

declare var introJs: any;
declare var $: any;

@Component({
  selector: 'rump-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() clickNotifications = new EventEmitter<string>();
  public hatDomain: string;
  private sub: Subscription;
  public marketSquareLink: string;
  private intro: any;
  public userAuthenticated = false;
  public profile: { photo: { url: string; shared: boolean; }, first_name: string };
  public accountStatus: AccountStatus;
  public showNotifications: boolean;

  public unreadNotifications: number;
  public totalNotifications: number;

  constructor(@Inject(APP_CONFIG) public config: IAppConfig,
              private router: Router,
              private dialogSvc: DialogService,
              private userSvc: UserService,
              private _notificationsSvc: NotificationsService,
              private profilesSvc: ProfilesService) {

    this.intro = introJs();
    this.intro.setOptions({
      tooltipClass: 'customIntroTooltip',
      highlightClass: 'customIntroHighlight',
      showStepNumbers: false,
      overlayOpacity: 0.1,
      steps: [
        {
          'element': '#intro-step1',
          'intro': 'Here is your navigation bar to access Rumpel featured services.',
          'position': 'auto'
        },
        {
          'element': '#intro-step2',
          'intro': 'Here you can view the notifications from the Rumpel team.',
          'position': 'auto'
        },
        {
          'element': '#intro-step3',
          'intro': 'The dashboard is where you have an overview of Rumpel.',
          'position': 'auto'
        },

        {
          'element': '#intro-step4',
          'intro': 'You can view and edit the details of your profile and decide what information is private and'
                 + ' what is to be shared.',
          'position': 'auto'
        },
        {
          'element': '#intro-step6',
          'intro': 'Here is where you can see various mashups of your data.',
          'position': 'auto'
        },
        {
          'element': '#intro-step7',
          'intro': 'Here is where you can see where you have been. You would need iOS phone to pull location data'
                 + ' into your HAT.',
          'position': 'auto'
        },
        {
          'element': '#intro-step8',
          'intro': 'Here is where you can see the details of your calendar.',
          'position': 'auto'
        },
        {
          'element': '#intro-step9',
          'intro': 'Your social stream details can be seen here.',
          'position': 'auto'
        },
        {
          'element': '#intro-step10',
          'intro': 'Here you can view the photos you have pulled into your HAT.',
          'position': 'auto'
        },
        {
          'element': '#intro-step11',
          'intro': 'Data comes into your HAT via data plugs. Click here to see what data plugs are available,'
                 + ' and what data plugs are already connected.',
          'position': 'auto'
        },
        {
          'element': '#intro-step12',
          'intro': 'You can view the available data offers by clicking on this icon. However, you will be leaving'
                 + ' Rumpel to go to MarketSquare.',
          'position': 'auto'
        },
        {
          'element': '#intro-step13',
          'intro': 'These features will be coming soon - so stay tuned!',
          'position': 'auto'
        },
        {
          'element': '#intro-step14',
          'intro': 'Your words are your memories! Notables allow you to create and keep your social media'
                 + ' interactions, thoughts, blogs, shopping lists - all in one place, and lets you decide what'
                 + ' is private to yourself and what to share! Enabling the calendar icon when the notable is shared'
                 + ' will create a 7 day expiry of the note visibility in the sharing space.',
          'position': 'auto'
        },
        {
          'element': '#intro-step15',
          'intro': 'You can add to your HAT personal profile and decide what information should be made public'
                 + ' or kept private. Public information would be available on your Personal HAT address (PHATA)'
                 + ' front page and also by others. If you choose not to have any information public, your PHATA'
                 + ' front page would display a pre-set standard private PHATA page.',
          'position': 'auto'
        },
        {
          'element': '#intro-step16',
          'intro': 'Displays a list of the upcoming events in all your connected calendars (iCal, Facebook, etc.).',
          'position': 'auto'
        },
        {
          'element': '#intro-step17',
          'intro': 'By setting up data plugs you can view your recent activity in one convenient place.',
          'position': 'auto'
        },
        {
          'element': '#intro-step18',
          'intro': 'List of currently available data plugs. Set up your HAT by acquiring data and view it on Rumpel.',
          'position': 'auto'
        },
        {
          'element': '#intro-step19',
          'intro': 'Check out this section to see all the latest data offers.'
                 + ' Claim any of the offers and start benefiting from your data.',
          'position': 'auto'
        },
        {
          'element': '#intro-step20',
          'intro': `You can see where you have been here. To pull location data into your HAT, you would need to have`
            + `an iOS phone and download `
            + `<a href='https://itunes.apple.com/gb/app/rumpel-lite/id1147137249' target='_blank' class='inline-link'>`
            + `the Rumpel lite app</a>.`,
          'position': 'auto'
        },
        {
          'element': '#intro-step21',
          'intro': `Here you can view a list of your HAT's data debits. `
                 + `This gives you the information on what data you are currently sharing and with whom.`,
          'position': 'auto'
        },
        {
          'element': '#intro-step24',
          'intro': 'The full version of Notables is accessible here.',
          'position': 'auto'
        }
      ]
    });
  }

  ngOnInit() {
    this.marketSquareLink = 'https://marketsquare.hubofallthings.com';
    this.userAuthenticated = false;
    this.showNotifications = false;

    this.sub = this.userSvc.user$.subscribe((user: User) => {
      this.userAuthenticated = user.authenticated;
      if (user.authenticated) {
        this._notificationsSvc.getAllNotifications();

        this.profilesSvc.getPicture().subscribe(result => {
          if (result && result.url) {
            this.profile.photo.url = result.url;
          }
        });

        this.hatDomain = user.fullDomain;
        this.marketSquareLink = `https://${this.hatDomain}/hatlogin?name=MarketSquare&` +
                                `redirect=https://marketsquare.hubofallthings.com/authenticate/hat`;
      } else {
        this.hatDomain = null;
        this.marketSquareLink = 'https://marketsquare.hubofallthings.com/';
      }
    });



    this.totalNotifications = 0;

    this._notificationsSvc.stats$.subscribe(stats => {
      this.totalNotifications = stats.total;
      this.unreadNotifications = stats.unread;
    });

    this._notificationsSvc.showNotifs$.subscribe(status => this.showNotificationsBar(status));


    this.profile = {
      photo: { url: '', shared: false }, first_name: ''
    };

    this.profilesSvc.data$.subscribe((profileSnapshots: Profile[]) => {
      const latestSnapshot = profileSnapshots[0];

      if (latestSnapshot && latestSnapshot.personal.first_name) {
        this.profile.first_name = latestSnapshot.personal.first_name;
      }

      if (latestSnapshot && latestSnapshot.fb_profile_photo) {
        this.profile.photo.shared = !latestSnapshot.fb_profile_photo.private;
      }
    });

    this.userSvc.getAccountStatus().subscribe((accountStatus: AccountStatus) => this.accountStatus = accountStatus);


  }

  showInfoModal() {
    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
      title: 'Help',
      message: `HATs are distributed systems and being private also means no one will know if you have a problem.<br><br>
      If you have an issue with your HAT or this dashboard, please report it <a href="mailto:contact@HATDeX.org?subject=Support%20for%20` + window.location.hostname + `">here</a>`
    });
  }

  // showLinkingModal() {
  //   this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
  //     title: 'Report An Issue',
  //     message: `There are 2 ways to report bugs. Post them at the
  //              community forum or just drop us a note in the chatroom at Marketsquare.
  //              There is already a room called feedback and bug report and you can talk to us there!`,
  //     buttons: [
  //       { title: 'Go To Forum', link: 'http://forum.hatcommunity.org/c/hat-users' },
  //       { title: 'Chat To Us', link: 'https://marketsquare.hubofallthings.com' }
  //     ]
  //   });
  // }

  signOut() {
    this.userSvc.logout();
    this.router.navigate(['/public/profile']);
  }

  signIn() {
    this.router.navigate(['/user/login']);
  }

  showNotificationsCentre() {
    if (this.totalNotifications > 0) {
      this._notificationsSvc.toggleShow();
    }
  }



  navigateTo(link: string) {
    window.location.href = link;
  }

  startIntro() {
    this.router.navigate(['/dashboard']);
    setTimeout(() => this.intro.start(), 50);
  }

  showPopover() {
    $('[data-toggle="popover"]').popover();
  }

  showAccountOptions() {
    $('.dropdown-toggle').dropdown();
  }


  showNotificationsBar(bool: boolean): void {
    this.showNotifications = bool;

    const duration = 400;
    let barHeight = 64;

    if (bool === false) {
      barHeight = 0;
    }

    $('.navbar, .menubar-left, .burger, .content-main').stop().animate({ marginTop: barHeight }, duration);
    $('.notifications-wrapper').stop().animate({ top: (barHeight - 100) }, duration);
  }
}
