import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationsService } from '../../services';

declare var L: any;

@Component({
  moduleId: module.id,
  selector: 'rump-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private locationSubscription: any;
  private map;
  private markers = L.markerClusterGroup();
  private bbox = {
    minLng: 180,
    maxLng: -180,
    minLat: 180,
    maxLat: -180
  };

  constructor(private _locationsSvc: LocationsService) {}

  ngOnInit() {
    this.locationSubscription = this._locationsSvc.locations$.subscribe(updatedLocations => {
      this.updateMap(updatedLocations);
    });

    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,';

    this.map = L.map('map-view').setView([52.105, 55.09], 9);

    L.tileLayer(osmUrl, { attribution: osmAttrib, minZoom: 2, maxZoom: 18 }).addTo(this.map);

    this._locationsSvc.loadAll();
  }

  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
  }

  updateMap(locations: Array<any>) {
    this.drawMarkers(locations);
    this.map.fitBounds([
      [this.bbox.minLat, this.bbox.minLng],
      [this.bbox.maxLat, this.bbox.maxLng]
    ]);
  }

  ajustBoundingBox(lat: number, lng: number) {
      this.bbox.minLat = Math.min(this.bbox.minLat, lat);
      this.bbox.maxLat = Math.max(this.bbox.maxLat, lat);
      this.bbox.minLng = Math.min(this.bbox.minLng, lng);
      this.bbox.maxLng = Math.max(this.bbox.maxLng, lng);
    }

  drawMarkers(locations: Array<any>) {
      this.map.removeLayer(this.markers);
      this.markers = L.markerClusterGroup();
      for(let loc of locations) {
        this.ajustBoundingBox(loc.latitude, loc.longitude);
        let pos = new L.LatLng(loc.latitude, loc.longitude);
        let marker = L.marker(pos);
        this.markers.addLayer(marker);
      }

    this.map.addLayer(this.markers);
    }

}