import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'rump-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent implements OnInit {
  public user: string;
  private sub: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.sub = this.auth.getAuth$().subscribe(isAuthenticated => {
      if (isAuthenticated) this.user = this.auth.getDomain();
    });
  }

  signOut() {
    this.user = null;
    this.auth.signOut();
    this.router.navigate(['/users/login']);
  }

}
