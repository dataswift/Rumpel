import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

declare var L: any;

@Component({
  moduleId: module.id,
  selector: 'rump-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() locations;
  @Input() mapSize: string;
  @Output() timeSelected = new EventEmitter<any>();

  private map;
  private markers = L.markerClusterGroup();
  private bbox = {
    minLng: 180,
    maxLng: -180,
    minLat: 180,
    maxLat: -180
  };

  constructor() {}

  ngOnInit() {
    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,';

    this.map = L.map('map-view').setView([51.5074, 0.1278], 10);
    let map = this.map;
    setTimeout(function(){ map.invalidateSize()}, 400);

    L.tileLayer(osmUrl, { attribution: osmAttrib, minZoom: 3, maxZoom: 18 }).addTo(this.map);
  }

  ngOnChanges() {
    if (this.map) this.updateMap(this.locations);
  }

  updateMap(locations: Array<any>) {
    this.drawMarkers(locations);
    this.map.fitBounds([
      [this.bbox.minLat, this.bbox.minLng],
      [this.bbox.maxLat, this.bbox.maxLng]
    ]);
  }

  resetBoundingBox() {
    this.bbox.minLat = 180; this.bbox.maxLat = -180;
    this.bbox.minLng = 180; this.bbox.maxLng = -180;
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
      this.resetBoundingBox();
      for(let loc of locations) {
        this.ajustBoundingBox(loc.latitude, loc.longitude);
        let pos = new L.LatLng(loc.latitude, loc.longitude);
        let marker = L.marker(pos);
        marker.timestamp = loc.start;
        let self = this;
        marker.on('click', (e: any) => {
          self.onMarkerSelected(e);
        });
        this.markers.addLayer(marker);
      }

    this.map.addLayer(this.markers);
    }

  onMarkerSelected(e: any) {
    this.timeSelected.emit(e.target.timestamp);
  }
}