/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as leaflet from 'leaflet';
import 'leaflet.markercluster';
import { SheMapItem } from '../../she/she-feed.interface';

@Component({
  selector: 'rum-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() dataPoints: SheMapItem[];
  @Input() mapHeight: string;
  @Input() mapWidth: string;
  @Input() enableMapControls = true;
  @Output() timeSelected = new EventEmitter<number>();

  private map: any;
  private markers = leaflet.markerClusterGroup();
  private bbox = {
    minLng: 180,
    maxLng: -180,
    minLat: 180,
    maxLat: -180
  };
  private facebookPin: leaflet.Icon;
  private twitterPin: leaflet.Icon;
  private fitbitPin: leaflet.Icon;
  private googlePin: leaflet.Icon;
  private spotifyPin: leaflet.Icon;
  private notablesv1Pin: leaflet.Icon;
  private iosPin: leaflet.Icon;

  constructor() {
  }

  ngOnInit() {
  }

  constructMap() {
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,';

    this.map = leaflet.map('map-view', {
      zoomControl: this.enableMapControls,
      scrollWheelZoom: false
    })
      .setView([51.5074, 0.1278], 10);

    const map = this.map;
    this.map.once('focus', () => map.scrollWheelZoom.enable());

    const SourceIcon = leaflet.Icon.extend({
      options: {
        iconSize: [27, 38],
        iconAnchor: [10, 38],
        popupAnchor: [4, -40]
      }
    });

    this.facebookPin = new SourceIcon({ iconUrl: '/assets/images/pins/facebook.png' });
    this.twitterPin = new SourceIcon({ iconUrl: '/assets/images/pins/twitter.png' });
    this.fitbitPin = new SourceIcon({ iconUrl: '/assets/images/pins/fitbit.png' });
    this.googlePin = new SourceIcon({ iconUrl: '/assets/images/pins/google-calendar.png' });
    this.spotifyPin = new SourceIcon({ iconUrl: '/assets/images/pins/spotify.png' });
    this.notablesv1Pin = new SourceIcon({ iconUrl: '/assets/images/pins/notables.png' });
    this.iosPin = new SourceIcon({ iconUrl: '/assets/images/pins/locations.png' });

    // WHY
    setTimeout(() => {
      this.refreshMap();
    }, 400);

    leaflet.tileLayer(osmUrl, { attribution: osmAttrib, minZoom: 3, maxZoom: 18 }).addTo(this.map);
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

  updateMap(locations: SheMapItem[]) {
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

  drawMarkers(locations: SheMapItem[]): void {
    this.map.removeLayer(this.markers);
    this.markers = leaflet.markerClusterGroup();
    this.resetBoundingBox();
    // const pointlist = [];
    for (const loc of locations || []) {
      this.adjustBoundingBox(loc.latitude, loc.longitude);
      const pos = new leaflet.LatLng(loc.latitude, loc.longitude);
      const marker = leaflet.marker(pos, { icon: this[loc.source + 'Pin'] });
      // marker.timestamp = loc.data.dateCreated;

      const date = moment(Number(loc.timestamp * 1000));

      let popupContent: string;

      if (loc.content) {
        popupContent = `
          <h4 class="rum-map-popup-header">${loc.content.title}</h4>
          <div class="rum-map-popup-content">${loc.content.body}</div>
          <div class="rum-map-popup-footer">Posted on ${date.format('YYYY-MM-DD hh:mma')}</div>`;
      } else {
        popupContent = `
          <h4 class="rum-map-popup-header">From your ${loc.source} device</h4>
          <div class="rum-map-popup-content">
            Latitude: ${Math.round(loc.latitude * 1000) / 1000}<br/>
            Longitude: ${Math.round(loc.longitude * 1000) / 1000}
          </div>
          <div class="rum-map-popup-footer">Recorded at ${date.format('hh:mma, YYYY-MM-DD')}</div>`;
      }

      marker.bindPopup(popupContent, { 'className': 'rum-map-popup' }).openPopup();
      marker.on('click', (_) => {
        this.timeSelected.emit(loc.timestamp);
      });

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
}
