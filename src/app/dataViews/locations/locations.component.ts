import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '../../shared/interfaces';
import { LocationsService } from '../../services';

@Component({
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {
  public locations;
  public safeSize;
  private sub;

  constructor(private locationsSvc: LocationsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.locations = [];

    this.sub = this.locationsSvc.getLocations$().subscribe(locations => {
      this.locations = locations;
    });

    this.locationsSvc.showAll();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('85vh');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
