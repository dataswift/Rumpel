import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rump-locations-view',
  templateUrl: './locations-view.component.html',
  styleUrls: ['./locations-view.component.scss']
})
export class LocationsViewComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

}
