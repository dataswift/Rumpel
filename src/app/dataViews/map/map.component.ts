import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { DataPoint } from '../../shared';

declare var L: any;

@Component({
  moduleId: module.id,
  selector: 'rump-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() dataPoints: Array<DataPoint>;
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
    this.dataPoints = [];
    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,';

    this.map = L.map('map-view', { zoomControl: false }).setView([51.5074, 0.1278], 10);
    let map = this.map;
    setTimeout(function(){ map.invalidateSize()}, 400);

    L.tileLayer(osmUrl, { attribution: osmAttrib, minZoom: 3, maxZoom: 18 }).addTo(this.map);
  }

  ngOnChanges() {
    if (this.map && this.dataPoints.length > 0) this.updateMap(this.dataPoints);
  }

  updateMap(dps: Array<DataPoint>) {
    console.log('map points', dps);
    if (dps.length <= 0) return;
    this.drawMarkers(dps);
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

  drawMarkers(dps: Array<DataPoint>) {
      this.map.removeLayer(this.markers);
      this.markers = L.markerClusterGroup();
      this.resetBoundingBox();
      for(let dp of dps) {
        this.ajustBoundingBox(dp.location.latitude, dp.location.longitude);
        let pos = new L.LatLng(dp.location.latitude, dp.location.longitude);
        let marker = L.marker(pos);
        marker.timestamp = dp.timestamp;
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