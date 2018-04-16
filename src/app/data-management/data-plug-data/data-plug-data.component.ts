import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rum-data-plug-data',
  templateUrl: './data-plug-data.component.html',
  styleUrls: ['./data-plug-data.component.scss']
})
export class DataPlugDataComponent implements OnInit, OnDestroy {
  public currentPage = 'feed';
  public rsub: Subscription;
  public plugName = '';
  public plugMeta: any;

  public sub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.plugName = params['provider'];
    });

    this.currentPage = this.route.snapshot.firstChild.url[0].path;

    this.rsub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.url.split('/');
        this.currentPage = urlSegments[urlSegments.length - 1];
      });
  }

  ngOnDestroy() {
    this.rsub.unsubscribe();
  }

  resizeWindow() {
     // this is used to make the sure the map initialises properly
     const evt = document.createEvent('HTMLEvents');
     evt.initEvent('resize', true, false);
     window.dispatchEvent(evt);
  }

}
