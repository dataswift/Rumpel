import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataPoint } from '../../shared/data-point.interface';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'rump-tile-map',
  templateUrl: 'tile-map.component.html',
  styleUrls: ['tile-map.component.scss']
})
export class TileMapComponent implements OnInit, OnDestroy {
  @Input() title;
  @Input() info;
  public locations: Array<DataPoint>;
  private sub;
  public safeSize;

  constructor(private sanitizer: DomSanitizer,
              private locationSvc: LocationsService) {}

  ngOnInit() {
    this.locations = [];

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('29em');
    this.sub = this.locationSvc.locations$.subscribe(locations => {
      this.locations = locations;
    });

    this.locationSvc.getRecentLocations();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
