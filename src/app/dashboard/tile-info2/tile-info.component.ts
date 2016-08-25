import { Component, OnInit, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-info2',
  templateUrl: 'tile-info.component2.html',
  styleUrls: ['tile-info.component2.css']
})
export class TileInfoComponent2 implements OnInit {
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
    this.modal
      .alert()
      .size('md')
      .showClose(false)
      .title('Spotlight')
      .body(`
        <h2>HATDeX Business Solutions</h2>

        <h5>3rd August 2016 by Irene Ng</h5>

        <br>
        <p>Organisations store and use a lot of personal data. This is necessary, because providing customers with services will inevitably result in the creation of the data. However, this comes with risks as well, because they would need to secure it and ensure it is private. These risks are not only costly, they also result in reputational risk if they don’t manage it well.</p>

        <br>
        <p>Read the full post on <a href="http://www.hatdex.org/hatdex-business-solutions/" target="_blank">HATDeX blog</a>.</p>`)
      .open();
  }

  navigate() {
    this.router.navigate([this.link]);
  }

}
