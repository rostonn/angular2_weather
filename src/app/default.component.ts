import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS} from '@angular/http';
import { GeoService } from './geo.service';
import * as moment from 'moment';
import { ROUTER_DIRECTIVES,provideRouter, RouterConfig } from '@angular/router';
import { NameService } from './name.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'default.component.html',
  styleUrls: ['app.component.css'],
  providers: []
})
export class DefaultComponent implements OnInit {
    //Set STATE on geoservice
  title = 'City Weather App';
  geo = {};
  errorMessage = '';
  city = {};
  weather = {};
  timeOfDay = '';
  date = moment().format('MMMM Do YYYY, h:mm:ss a');
  testD:any = moment().format('H:mm:ss');
  name = 'Master Debater';
  imageUrl = '';
  setDate(){
      this.date = moment().format('MMMM Do, h:mm a');
      this.testD = moment().format('H');
      this.testD = Number(this.testD);
      if(this.testD >= 12 && this.testD < 17){
          this.timeOfDay = "Good Afternoon";
          this.imageUrl = "url('../afternoon.jpg')";
      }
      else if(this.testD >= 17 && this.testD < 22){
          this.timeOfDay = "Good Evening";
          this.imageUrl = "url('../evening.jpg')";
      }
      else if(this.testD >= 22  || (this.testD >=0 && this.testD < 4 )){
          this.timeOfDay = "Good Night"
          this.imageUrl = "url('../nighttime.jpg')";
      }
      else{
          this.timeOfDay = "Good Morning";
          this.imageUrl = "url('../morning.jpg')";
      }

  }

  constructor(private geoService: GeoService, private nameService: NameService){
       setInterval(() => { this.setDate(); }, 500);
  }


  getPosition(){
    this.geoService.getPosition()
          .subscribe(
              pos => {this.geo = pos
                    this.getCity(pos)},
              error =>  this.errorMessage = <any>error
          )
      }
    getCity(geo){
        this.geoService.getCity(geo)
            .subscribe(
                city => {
                        console.log(city['results'][1]['address_components']);
                        this.city['name'] = city['results'][1]['address_components'][3]['long_name'];
                        this.city['state'] = city['results'][1]['address_components'][5]['long_name'];
                        this.city['zipCode'] = city['results'][1]['address_components'][7]['long_name'];
                        this.getWeather(this.city['zipCode']);
                    },
                error => {this.errorMessage = <any>error
                        console.log(error);
                }
            )
    }
    getWeather(zipCode){
        this.geoService.getWeather(zipCode)
            .subscribe(
                weather => {
                    // console.log(weather['main'])
                    this.weather['temp'] = ((weather['main']['temp'] - 273.15)*(9/5) + 32).toFixed();
                },
                error => this.errorMessage = <any>error
            )
    }

    getImage(){
        return this.imageUrl;
    }

    ngOnInit(){
        this.getPosition();
        this.geo = this.geoService.getGeo();
        if(this.geo != ""){
            this.getCity(this.geo);
        }
        this.name = this.nameService.getName();
    }
}
