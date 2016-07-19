import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { LocationsService } from '../../services';
import { MapComponent } from '../../dataViews/map/map.component';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-map',
  templateUrl: 'tile-map.component.html',
  styleUrls: ['tile-map.component.css'],
  directives: [MapComponent]
})
export class TileMapComponent implements OnInit {
  @Input() title;
  @Input() iconName;
  @Input() info;
  public locations$;
  public safeSize;

  constructor(private sanitizer: DomSanitizationService,
              private locationSvc: LocationsService) {}

  ngOnInit() {
    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('29em');
    this.locations$ = this.locationSvc.getLocations$();
    this.locationSvc.showAll();
  }

}
