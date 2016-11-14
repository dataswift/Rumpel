import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Location } from '../../shared/interfaces';

declare var L: any;

@Component({
  selector: 'rump-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() dataPoints: Array<Location>;
  @Input() mapHeight: string;
  @Input() mapWidth: string;
  @Input() enableMapControls: boolean;
  @Output() timeSelected = new EventEmitter<any>();

  private map;
  private markers = L.markerClusterGroup();
  private bbox = {
    minLng: 180,
    maxLng: -180,
    minLat: 180,
    maxLat: -180
  };

  constructor() {
  }

  ngOnInit() {
  }

  constructMap() {
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,';

    this.map = L.map('map-view', {
      zoomControl: this.enableMapControls,
      scrollWheelZoom: false
    })
      .setView([51.5074, 0.1278], 10);

    this.map.once('focus', () => map.scrollWheelZoom.enable());
    let map = this.map;
    // WHY
    setTimeout(() => {
      map.invalidateSize();
      this.updateMap(this.dataPoints);
    }, 400);

    L.tileLayer(osmUrl, { attribution: osmAttrib, minZoom: 3, maxZoom: 18 }).addTo(this.map);
  }

  ngOnChanges() {
    if (this.map) {
      this.updateMap(this.dataPoints);
    } else {
      this.constructMap();
    }
  }

  updateMap(locations: Array<Location>) {
    if(this.map) {
      this.drawMarkers(locations);
      if (locations.length > 0) {
        this.map.invalidateSize();
        this.map.fitBounds([
          [this.bbox.minLat, this.bbox.minLng],
          [this.bbox.maxLat, this.bbox.maxLng]
        ]);
      }
    }
  }

  resetBoundingBox() {
    this.bbox.minLat = 180; this.bbox.maxLat = -180;
    this.bbox.minLng = 180; this.bbox.maxLng = -180;
  }

  adjustBoundingBox(lat: number, lng: number) {
    this.bbox.minLat = Math.min(this.bbox.minLat, lat);
    this.bbox.maxLat = Math.max(this.bbox.maxLat, lat);
    this.bbox.minLng = Math.min(this.bbox.minLng, lng);
    this.bbox.maxLng = Math.max(this.bbox.maxLng, lng);
  }


  drawMarkers(locations: Array<Location>) {
    this.map.removeLayer(this.markers);
    this.markers = L.markerClusterGroup();
    this.resetBoundingBox();
    //var pointlist = [];
    for(let loc of locations) {
      this.adjustBoundingBox(loc.latitude, loc.longitude);
      let pos = new L.LatLng(loc.latitude, loc.longitude);
      let marker = L.marker(pos);
      marker.timestamp = loc.timestamp;
      let self = this;
      marker.on('click', (e: any) => {
        self.onMarkerSelected(e);
      });
      //pointlist.push(pos);
      this.markers.addLayer(marker);
    }

    // var routePolyline = new L.Polyline(pointlist, {color: 'red', weight: 3, oapcity: 0.8, smoothFactor: 10});
    // routePolyline.addTo(this.map);

    this.map.addLayer(this.markers);
    }

  onMarkerSelected(e: any) {
    this.timeSelected.emit(e.target.timestamp);
  }
}
