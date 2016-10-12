import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WeatherService {
  private baseUrl: string;
  private token: string;

  constructor(private http: Http) {
    this.baseUrl = 'https://api.wunderground.com/api';
    this.token = '648b0984a45bdea3';
  }

  getCurrentWeather(country: string, city: string): Observable<any> {
    const url = `${this.baseUrl}/${this.token}/conditions/q/${country}/${city}.json`;
    return this.http.get(url)
      .map(res => res.json())
      .map(wunder => wunder.current_observation);
  }
}
