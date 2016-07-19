import { Component, OnInit } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { Location } from '../../shared';
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
  public locations;
  public safeSize;
  private sub;

  constructor(private locationsSvc: LocationsService, private sanitizer: DomSanitizationService) { }

  ngOnInit() {
    this.locations = [];

    this.sub = this.locationsSvc.getLocations$().subscribe(locations => {
      this.locations = locations;
    });

    this.locationsSvc.showAll();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('85vh');
  }
}
