import { Component, OnInit } from '@angular/core';
import { DefaultComponent }  from './default.component';
import { NameService } from './name.service';

// import { GeoService } from './geo.service';

@Component({
  template: `
    <input [(ngModel)]="name"/>
    <button (click)="setName()">Set Name</button>
    {{name}}
    <button (click)="getName()">Show Name</button>

    `
})
export class SettingsComponent {
    name = '';

    constructor(private nameService: NameService){}
    setName(){
        this.nameService.setName(this.name);
    }
    getName(){
        let x = this.nameService.getName();
        alert(x)
    }
    ngOnInit(){
        this.name = this.nameService.getName();
    }
 }
