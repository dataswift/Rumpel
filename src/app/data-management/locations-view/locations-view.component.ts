import { Component, OnInit, Input } from '@angular/core';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { Location } from '../../shared/interfaces/location.interface';

@Component({
  selector: 'rump-locations-view',
  templateUrl: './locations-view.component.html',
  styleUrls: ['./locations-view.component.scss']
})
export class LocationsViewComponent implements OnInit {

  @Input() item: HatRecord<Location>;

  constructor() { }

  ngOnInit() {
  }

}
