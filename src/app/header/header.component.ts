import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AuthService } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'rump-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [ROUTER_DIRECTIVES, MODAL_DIRECTIVES]
})
export class HeaderComponent implements OnInit {
  public user: string;
  public modalMsgs: any;
  public msg: string;
  private sub: any;

  constructor(private auth: AuthService, private router: Router) {
    this.msg = 'whoCanSee';
    this.modalMsgs = {
      whoCanSee: {
        header: 'Who can see this page?',
        body: `This page is only seen by you (and whoever is looking over your shoulder).
               Rumpel is your PERSONAL hyperdata browser for your HAT data.
               You should treat this page like the way you would treat your bank statement page online.`,
        footer: '',
        link: ''
      },
      bugReport: {
        header: 'Report A Bug',
        body: `There are 2 ways to report bugs. Post them at the community forum here or
               just drop us a note in the chatroom at Marketsquare.
               There is already a room called feedback and bug report and you can talk to us there!`,
        footer: 'Go To Forum',
        link: 'http://forum.hatcommunity.org/c/hat-users'
      }
    }
  }

  ngOnInit() {
    this.sub = this.auth.auth$.subscribe(isAuthenticated => {
      if (isAuthenticated) this.user = this.auth.getDomain();
    });
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
