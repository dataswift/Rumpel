import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '../../shared/interfaces';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {
  public locations: Array<Location>;
  public safeSize;
  private selectedTime: string;
  private sub;

  constructor(private locationsSvc: LocationsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.locations = [];
    this.selectedTime = 'all';

    this.sub = this.locationsSvc.locations$.subscribe(locations => {
      this.locations = locations;
    });

    this.locationsSvc.getRecentLocations();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('73em');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  selectLocationTime(event) {
    this.selectedTime = event.target.value;
  }
}
