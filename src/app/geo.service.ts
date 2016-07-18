import {Injectable, provide} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS, Http, Response, XHRBackend} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GeoService {

    constructor (private http: Http) {}

    getPosition(): Observable<Object> {
   return Observable.create(observer => {
       navigator.geolocation.watchPosition((pos: Position) => {
           observer.next(pos.coords);
           observer.complete();
       }),
       () => {
           console.log('Position is not available');
       },
       {
           enableHighAccuracy: true
       };
   });
    }
    getCity(geo): Observable<Object> {
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + geo.latitude +','+ geo.longitude +      "&key=AIzaSyDqGtfPHk5BvpeqSB7Me0cYYeN69Zf18KQ";

        return this.http.get(url)
            .map(res => res.json());
    }
    getWeather(zipCode): Observable<Object> {
        let url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" + "26fd59f62356994455fd5b520e7da4d4";
        return this.http.get(url)
            .map(res => res.json());
    }
}
