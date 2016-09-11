import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { LocationsService } from '../../services';
import { MapComponent } from '../../dataViews/map/map.component';

@Component({
  selector: 'rump-tile-map',
  templateUrl: 'tile-map.component.html',
  styleUrls: ['tile-map.component.scss'],
  directives: [MapComponent]
})
export class TileMapComponent implements OnInit, OnDestroy {
  @Input() title;
  @Input() iconName;
  @Input() info;
  public locations;
  private sub;
  public safeSize;

  constructor(private sanitizer: DomSanitizationService,
              private locationSvc: LocationsService) {}

  ngOnInit() {
    this.locations = [];

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('29em');
    this.sub = this.locationSvc.getLocations$().subscribe(locations => {
      this.locations = locations;
    });
    this.locationSvc.showAll();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
