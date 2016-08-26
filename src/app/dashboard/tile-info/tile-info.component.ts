import { Component, OnInit, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'rump-tile-info',
  templateUrl: 'tile-info.component.html',
  styleUrls: ['tile-info.component.scss']
})
export class TileInfoComponent implements OnInit {
  @Input() link: string;
  @Input() icon: string;
  @Input() bkgColor: string;
  @Input() infoText: string;

  constructor(private router: Router,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
  }

  showContent() {
    this.modal.alert()
      .size('md')
      .showClose(false)
      .title('New to Rumpel?')
      .body(`
        <div class="row">
          <div class="col-xs-2">ACQUIRE</div>
          <div class="col-xs-10">data from the Internet through the data plugs</div>
        </div>
        <div class="row">
          <div class="col-xs-2">ADD</div>
          <div class="col-xs-10">more data to your HAT</div>
        </div>
        <div class="row">
          <div class="col-xs-2">UPLOAD</div>
          <div class="col-xs-10">content to your HAT that you might want to view or exchange (2017)</div>
        </div>
        <div class="row">
          <div class="col-xs-2">VISUALISE</div>
          <div class="col-xs-10">data from the Internet through the data plugs</div>
        </div>
        <div class="row">
          <div class="col-xs-2">CONTROL</div>
          <div class="col-xs-10">who gets your data by exchanging it through the HAT data debit system</div>
        </div>
        <div class="row">
          <div class="col-xs-2">CREATE</div>
          <div class="col-xs-10">nudges and prompts based on intelligence from your own data (2017)</div>
        </div>
        <div class="row">
          <div class="col-xs-2">SEARCH</div>
          <div class="col-xs-10">your data by time, text, location, company or person (2017)</div>
        </div>
        `)
      .open();
  }

  navigate() {
    this.router.navigate([this.link]);
  }

}
