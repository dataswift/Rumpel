import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { MapComponent } from '../map/map.component';
import { LocationsService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.css'],
  directives: [MapComponent]
})
export class LocationsComponent implements OnInit {
  private _sub: any;
  public safeSize;
  public locations: any;

  constructor(private _locationsSvc: LocationsService, private sanitizer: DomSanitizationService) { }

  ngOnInit() {
    this._sub = this._locationsSvc.locations$.subscribe(updatedLocations => {
      this.locations = updatedLocations;
    });

    this._locationsSvc.loadAll();
    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('85vh');
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

}
