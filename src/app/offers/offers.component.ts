import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rump-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    window.open("https://marketsquare.hubofallthings.com/offers", "_blank");
  }

}
