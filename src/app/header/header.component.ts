import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { AuthService, HatApiService } from '../services';


@Component({
  selector: 'rump-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: string;
  public modalMsgs: any;
  public msg: string;
  private sub: any;
  public msLink: string;

  constructor(private auth: AuthService, private router: Router,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal  ) {
    overlay.defaultViewContainer = vcRef;
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
    this.sub = this.auth.auth$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.user = this.auth.getDomain();
        this.msLink = `https://${this.user}/hatlogin?name=MarketSquare&redirect=https://marketsquare.hubofallthings.com/authenticate/hat`;
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
    this.user = null;
    this.auth.signOut();
    this.router.navigate(['/users/login']);
  }

  navigateTo(link: string) {
    window.location.href = link;
  }

}
