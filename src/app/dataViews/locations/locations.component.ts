import { Component, OnInit, AfterContentInit } from '@angular/core';
import { LocationsService } from '../../services';

declare var L: any;

@Component({
  moduleId: module.id,
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations$;
  map;
  markers = L.markerClusterGroup();
  boundingBox = {
    minLong: 180,
    maxLong: -180,
    minLat: 180,
    maxLat: -180
  };

  constructor(private _locationsSvc: LocationsService) {}

  ngOnInit() {
    this.locations$ = this._locationsSvc.locations$;

    this._locationsSvc.locations$.subscribe(updatedLocations => {
      this.drawMap(updatedLocations);
    });

    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,';

    this.map = L.map('map-view').setView([52.105, 55.09], 9);

    L.tileLayer(osmUrl, { attribution: osmAttrib, minZoom: 2, maxZoom: 18 }).addTo(this.map);

    this._locationsSvc.loadAll();
  }

  drawMap(locations: Array<any>) {
    this.map.removeLayer(this.markers);
    this.markers = L.markerClusterGroup();
    for (let loc of locations) {
      let pos = new L.LatLng(loc.latitude, loc.longitude);
      let marker = L.marker(pos);
      this.markers.addLayer(marker);
    }

    this.map.addLayer(this.markers);
  }

}
