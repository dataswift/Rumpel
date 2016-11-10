import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rump-mashups',
  templateUrl: './mashups.component.html',
  styleUrls: ['./mashups.component.scss']
})
export class MashupsComponent implements OnInit {

  private activeTab: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(routerEvent => {
      this.activeTab = routerEvent.url;
    })
  }

}
