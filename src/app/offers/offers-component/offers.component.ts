import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { DialogService } from '../../layout/dialog.service';
import { InfoBoxComponent } from '../../layout/info-box/info-box.component';

@Component({
  selector: 'rump-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})


export class OffersComponent implements OnInit {

  public offers: any = [{title: 'batman', illustrationUrl: 'assets/icons/facebook-plug.svg', 'expires': 1527116400000},
                        {title: 'robin', illustrationUrl: 'assets/icons/twitter-plug.svg', 'expires': 1497889035000},
                      {title: 'robin', illustrationUrl: 'assets/icons/twitter-plug.svg', 'expires': 1327116400000}]

  public expiry: String = '';
  public timeNow: Number = Date.now();

  constructor(  private dialogSvc: DialogService ) { }

  ngOnInit() {

  }


  showModal() {
    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
      title: 'Help',
      message: `HATs are distributed systems and being private also means no one will know if you have a problem.<br><br>
      If you have an issue with your HAT or this dashboard, please report it <a href="mailto:contact@HATDeX.org?subject=Support%20for%20`
      + window.location.hostname + `">here</a>`
    });
  }

}
