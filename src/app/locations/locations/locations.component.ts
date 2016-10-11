import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataPoint } from '../../shared/data-point.interface';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {
  public locations: Array<DataPoint>;
  public safeSize;
  private sub;

  constructor(private locationsSvc: LocationsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.locations = [];

    this.sub = this.locationsSvc.locations$.subscribe(locations => {
      this.locations = locations;
    });

    this.locationsSvc.getRecentLocations();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('85vh');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
