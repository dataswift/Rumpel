import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { UserService } from '../../services/index';
import { User } from '../../shared/interfaces/index';

declare var introJs: any;

@Component({
  selector: 'rump-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  public hatDomain: string;
  public modalMsgs: any;
  public msg: string;
  private sub: any;
  public msLink: string;
  private intro: any;

  constructor(private user: UserService, private router: Router,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal  ) {
    overlay.defaultViewContainer = vcRef;

    this.intro = introJs();
    this.intro.setOptions({
      tooltipClass: 'customIntroTooltip',
      highlightClass: 'customIntroHighlight',
      showStepNumbers: false,
      overlayOpacity: 0.1,
      steps: [
        {
          "element": "#intro-step1",
          "intro": "Here is your navigation bar to access Rumpel featured services.",
          "position": "auto"
        },
        {
          "element": "#intro-step2",
          "intro": "Here you can view the notifications from the Rumpel team.",
          "position": "auto"
        },
        {
          "element": "#intro-step3",
          "intro": "The dashboard is where you have an overview of Rumpel.",
          "position": "auto"
        },
        {
          "element": "#intro-step4",
          "intro": "The full version of Notables is accessible here.",
          "position": "auto"
        },
        {
          "element": "#intro-step5",
          "intro": "You can view and edit the details of your profile and decide what information is private and what is to be shared.",
          "position": "auto"
        },
        {
          "element": "#intro-step6",
          "intro": "Here is where you can see various mashups of your data.",
          "position": "auto"
        },
        {
          "element": "#intro-step7",
          "intro": "Here is where you can see where you have been. You would need iOS phone to pull location data into your HAT.",
          "position": "auto"
        },
        {
          "element": "#intro-step8",
          "intro": "Here is where you can see the details of your calendar.",
          "position": "auto"
        },
        {
          "element": "#intro-step9",
          "intro": "Your social stream details can be seen here.",
          "position": "auto"
        },
        {
          "element": "#intro-step10",
          "intro": "Here you can view the photos you have pulled into your HAT.",
          "position": "auto"
        },
        {
          "element": "#intro-step11",
          "intro": "Data comes into your HAT via data plugs. Click here to see what data plugs are available, and what data plugs are already connected.",
          "position": "auto"
        },
        {
          "element": "#intro-step12",
          "intro": "You can view the available data offers by clicking on this icon. However, you will be leaving Rumpel to go to MarketSquare.",
          "position": "auto"
        },
        {
          "element": "#intro-step13",
          "intro": "These features will be coming soon - so stay tuned!",
          "position": "auto"
        },
        {
          "element": "#intro-step14",
          "intro": "Your words are your memories! Notables allow you to create and keep your social media interactions, thoughts, blogs, shopping lists - all in one place, and lets you decide what is private to yourself and what to share! Enabling the calendar icon when the notable is shared will create a 7 day expiry of the note visibility in the sharing space.",
          "position": "auto"
        },
        {
          "element": "#intro-step15",
          "intro": "You can add to your HAT personal profile and decide what information should be made public or kept private. Public information would be available on your Personal HAT address (PHATA) front page and also by others. If you choose not to have any information public, your PHATA front page would display a pre-set standard private PHATA page.",
          "position": "auto"
        },
        {
          "element": "#intro-step16",
          "intro": "Displays a list of the upcoming events in all your connected calendars (iCal, Facebook, etc.).",
          "position": "auto"
        },
        {
          "element": "#intro-step17",
          "intro": "By setting up data plugs you can view your recent activity in one convenient place.",
          "position": "auto"
        },
        {
          "element": "#intro-step18",
          "intro": "List of currently available data plugs. Set up your HAT by acquiring data and view it on Rumpel.",
          "position": "auto"
        },
        {
          "element": "#intro-step19",
          "intro": "Check out this section to see all the latest data offers. Claim any of the offers and start benefiting from your data.",
          "position": "auto"
        },
        {
          "element": "#intro-step20",
          "intro": "You can see where you have been here. To pull location data into your HAT, you would need to have an iOS phone and download <a href='https://itunes.apple.com/gb/app/rumpel-lite/id1147137249' target='_blank' class='inline-link'>the Rumpel lite app</a>.",
          "position": "auto"
        },
        {
          "element": "#intro-step21",
          "intro": "Here you can view a list of your HAT's data debits. This gives you the information on what data you are currently sharing and with whom.",
          "position": "auto"
        }
      ]
    });
    this.msg = 'whoCanSee';
    this.modalMsgs = {
      whoCanSee: {
        header: 'Who can see this page?',
        body: `<p>This page is only seen by you (and whoever is looking over your shoulder).
               Rumpel is your PERSONAL hyperdata browser for your HAT data.
               You should treat this page like the way you would treat your bank statement page online.</p>`,
        footer: ''
      },
      bugReport: {
        header: 'Report An Issue',
        body: `
               <p>There are 2 ways to report bugs. Post them at the
               community forum or just drop us a note in the chatroom at Marketsquare.
               There is already a room called feedback and bug report and you can talk to us there!</p>
               <div class="row">
                 <div class="col-xs-offset-2 col-xs-3">
                   <a href="http://forum.hatcommunity.org/c/hat-users" target="_blank" class="link-button">Go To Forum</a>
                 </div>
                 <div class="col-xs-offset-2 col-xs-4">
                   <a href="https://marketsquare.hubofallthings.com" target="_blank" class="link-button">Chat To Us</a>
                 </div>
               </div>
               `,
        footer: 'Go To Forum'
      }
    }
  }

  ngOnInit() {
    this.msLink = 'https://marketsquare.hubofallthings.com';
    this.sub = this.user.user$.subscribe((user: User) => {
      if (user.authenticated) {
        this.hatDomain = user.iss;
        this.msLink = `https://${this.hatDomain}/hatlogin?name=MarketSquare&redirect=https://marketsquare.hubofallthings.com/authenticate/hat`;
      }
    });
  }

  showModal() {
    this.modal.alert()
      .size('md')
      .showClose(false)
      .title(this.modalMsgs[this.msg].header)
      .body(this.modalMsgs[this.msg].body)
      .open();
  }

  signOut() {
    this.hatDomain = null;
    this.msLink = 'https://marketsquare.hubofallthings.com';
    this.user.logout();
    this.router.navigate(['/users/login']);
  }

  navigateTo(link: string) {
    window.location.href = link;
  }

  startIntro() {
    this.router.navigate(['']);
    setTimeout(() => this.intro.start(), 50);
  }
}
