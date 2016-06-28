import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-weather',
  templateUrl: 'tile-weather.component.html',
  styleUrls: ['tile-weather.component.css'],
  providers: [WeatherService]
})
export class TileWeatherComponent implements OnInit {
  public icon: string;
  public temp: string;
  public city: string;
  public description: string;
  public feelsLike: string;
  public lastUpdated: any;

  constructor(private weatherSvc: WeatherService) {}

  ngOnInit() {
    this.weatherSvc.getCurrentWeather('UK', 'London').subscribe(
      currentw => {
        this.icon = currentw.weather.replace(new RegExp(' ', 'g'), '').toLowerCase();
        if (this.icon === 'haze' || this.icon === 'clear') this.icon = 'cloud';
        this.city = currentw.display_location.full;
        this.temp = currentw.temp_c;
        this.description = currentw.weather;
        this.feelsLike = currentw.feelslike_c;
        this.lastUpdated = moment.unix(currentw.observation_epoch).fromNow();
      },
      err => console.log('Weather data could not be retrieved', err));
  }

}
