import {Injectable, provide, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS, Http, Response, XHRBackend} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './environment';

console.log(environment.googleKey);
console.log(environment.weatherKey);

@Injectable()
export class GeoService implements OnInit {
    geo:any = "";
    errorMessage = '';
    city = {};
    weather = {};
    constructor (private http: Http) {}

    getGeo(){
        return this.geo;
    }

    getPosition(): Observable<Object> {
   return Observable.create(observer => {
       navigator.geolocation.watchPosition((pos: Position) => {
           this.geo = pos.coords;
           observer.next(pos.coords);
        //    observer.complete();

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
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + geo.latitude +','+ geo.longitude + "&key=" + environment.googleKey;

        return this.http.get(url)
            .map(res => res.json());
    }
    getWeather(zipCode): Observable<Object> {
        let url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" + environment.weatherKey;
        return this.http.get(url)
            .map(res => res.json());
    }
    getPos(){
        this.getPosition()
            .subscribe(
                pos => {
                    this.geo = pos
                },
                error => this.errorMessage = <any>error
            )
    }
    ngOnInit(){
        this.getPos();
    }
}
