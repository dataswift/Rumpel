import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations$;

  constructor(private _locationsSvc: LocationsService) {}

  ngOnInit() {
    this.locations$ = this._locationsSvc.locations$;

    this._locationsSvc.loadAll();
  }

}
