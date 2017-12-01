/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { LocationIos } from '../../shared/interfaces/location.interface';

declare var L: any;

@Component({
  selector: 'rump-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() dataPoints: HatRecord<LocationIos>[];
  @Input() mapHeight: string;
  @Input() mapWidth: string;
  @Input() enableMapControls: boolean;
  @Input() locationDate: any;
  @Output() timeSelected = new EventEmitter<any>();

  private map: any;
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

    const map = this.map;
    this.map.once('focus', () => map.scrollWheelZoom.enable());

    // WHY
    setTimeout(() => {
      this.refreshMap();
    }, 400);

    L.tileLayer(osmUrl, { attribution: osmAttrib, minZoom: 3, maxZoom: 18 }).addTo(this.map);
  }

  refreshMap() {
    this.map.invalidateSize();
    this.updateMap(this.dataPoints);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.map) {
      this.refreshMap();
    } else {
      this.constructMap();
    }
  }

  updateMap(locations: HatRecord<LocationIos>[]) {
    if (this.map) {
      this.drawMarkers(locations);
      if (locations && locations.length > 0) {
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

  drawMarkers(locations: HatRecord<LocationIos>[]) {
    this.map.removeLayer(this.markers);
    this.markers = L.markerClusterGroup();
    this.resetBoundingBox();
    // const pointlist = [];
    for (const loc of locations || []) {
      this.adjustBoundingBox(loc.data.latitude, loc.data.longitude);
      const pos = new L.LatLng(loc.data.latitude, loc.data.longitude);
      const marker = L.marker(pos);
      marker.timestamp = loc.data.dateCreated;

      const date = moment(Number(loc.data.dateCreated));
      marker.bindPopup('<b style="text-align: center">' + date.format('DD MMM YYYY h:mm a') + '</b>').openPopup();

      /*
      marker.on('click', (e: any) => {
        this.onMarkerSelected(e);
      });
      */
      // pointlist.push(pos);
      this.markers.addLayer(marker);
    }

    // var routePolyline = new L.Polyline(pointlist, {color: 'red', weight: 2, oapcity: 0.8, smoothFactor: 10});
    // routePolyline.addTo(this.map);

    this.map.addLayer(this.markers);
    }

  onMarkerSelected(e: any) {
    this.timeSelected.emit(e.target.timestamp);
  }
}
