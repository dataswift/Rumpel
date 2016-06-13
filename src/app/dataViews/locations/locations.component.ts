import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  moduleId: module.id,
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.css'],
  directives: [MapComponent]
})
export class LocationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
