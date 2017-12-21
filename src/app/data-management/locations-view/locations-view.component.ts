import { Component, OnInit, Input } from '@angular/core';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { LocationIos } from '../../shared/interfaces/location.interface';

@Component({
  selector: 'rum-locations-view',
  templateUrl: './locations-view.component.html',
  styleUrls: ['./locations-view.component.scss']
})
export class LocationsViewComponent implements OnInit {

  @Input() item: HatRecord<LocationIos>;

  constructor() { }

  ngOnInit() {
  }

}
