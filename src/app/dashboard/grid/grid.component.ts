import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Event, Post } from '../../shared/interfaces';
import { UiStateService } from '../../services';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy, AfterViewInit {
  public state: any;
  public showTile = { locations: false, events: false, posts: false };
  public tileHeights: { notables: number; profile: number };
  private sub: any;
  private link: string;

  constructor(private uiState: UiStateService,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };

    this.tileHeights = { notables: 2, profile: 1 };

    this.sub = this.uiState.getState$().subscribe(state => {
      this.state = state;

      if (state.dataTypes.indexOf('locations') > -1) this.showTile.locations = true;
      if (state.dataTypes.indexOf('posts') > -1) this.showTile.posts = true;
      if (state.dataTypes.indexOf('events') > -1) this.showTile.events = true;
    });

    this.uiState.fetchState();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    $('.grid').packery({
      // options
      itemSelector: '.grid-item',
      percentPosition: true
    });
  }

  setModalLink(link: string) {
    this.link = link;
    this.modal.confirm()
      .size('lg')
      .showClose(true)
      .title('Are you sure?')
      .body('<p>You are now leaving your private Rumpel space. Are you sure? (You may need to login to Rumpel again if you return unless you have enabled cookies on your web browser).</p>')
      .okBtn('Continue')
      .cancelBtn('Get Me Back')
      .open()
      .then(resultPromise => {
        resultPromise.result.then(
          result => {
          if (result === true) return this.navigateTo();
          },
          error => {
            console.log('Navigation out of Rumpel was cancelled.');
          });
      });
  }

  navigateTo() {
    window.location.href = this.link;
  }
}
