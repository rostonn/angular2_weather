import { Component, OnInit } from '@angular/core';
import { GeoService } from './geo.service';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS} from '@angular/http';
import * as moment from 'moment';
import { ROUTER_DIRECTIVES,provideRouter, RouterConfig } from '@angular/router';

const routes: RouterConfig = [
  { path: 'settings', component: SettingsComponent },
  { path: '/', component: DefaultComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [GeoService,HTTP_PROVIDERS]
})
export class AppComponent implements OnInit {
  title = 'City Weather App';
  geo = {};
  errorMessage = '';
  city = {};
  weather = {};
  timeOfDay = '';
  date = moment().format('MMMM Do YYYY, h:mm:ss a');
  testD:any = moment().format('H:mm:ss');
  name = 'Master Debater';

  setDate(){
      this.date = moment().format('MMMM Do, h:mm a');
      this.testD = moment().format('H');
      this.testD = Number(this.testD);
      if(this.testD >= 12){
          this.timeOfDay = "Good Afternoon";
      }
      else if(this.testD >= 18){
          this.timeOfDay = "Good Evening";
      }
      else{
          this.timeOfDay = "Good Morning";
      }

  }

  constructor(private geoService: GeoService){
       setInterval(() => { this.setDate(); }, 500);
  }

  getPosition(){
    this.geoService.getPosition()
          .subscribe(
              pos => {this.geo = pos
                    this.getCity(pos)},
              error =>  this.errorMessage = <any>error
          )
        //   console.log(this.geo);

      }
    getCity(geo){
        this.geoService.getCity(geo)
            .subscribe(
                city => {
                        this.city['name'] = city['results'][1]['address_components'][3]['long_name'];
                        this.city['state'] = city['results'][1]['address_components'][5]['long_name'];
                        this.city['zipCode'] = city['results'][1]['address_components'][7]['long_name'];
                        this.getWeather(this.city['zipCode']);
                    },
                error => this.errorMessage = <any>error
            )
    }
    getWeather(zipCode){
        this.geoService.getWeather(zipCode)
            .subscribe(
                weather => {
                    console.log(weather['main'])
                    this.weather['temp'] = ((weather['main']['temp'] - 273.15)*(9/5) + 32).toFixed();
                },
                error => this.errorMessage = <any>error
            )
    }

    getTimeOfDay(){

    }

    ngOnInit(){
        this.getPosition();
    }
}
