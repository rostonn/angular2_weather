import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { GeoService } from './geo.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  // templateUrl: 'app.component.html',
  template:`
  <nav>
    <img (click)="toggleMenu()" src="../menu.svg"/>
    <h1 id="title">City Weather</h1>

  </nav>
  <ul *ngIf="showMenu">
    <li>
      <a (click)="toggleMenu()" [routerLink]="['/']" class="menu"><span>Home</span>
      </a>
    </li>
    <li>
      <a (click)="toggleMenu()" [routerLink]="['/settings']" class="menu">
          <span>Settings</span>
      </a>
    </li>
  </ul>
  <div (click)="turnOff()">
    <router-outlet></router-outlet>
  </div>
  `,
  // styles: ['nav{height:20vh; background-color: blue;}'],
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: []
})
export class AppComponent {
    showMenu:boolean = false;
    toggleMenu(){
        if(this.showMenu){
            this.showMenu = false;
        }
        else{
            this.showMenu = true;
        }
    }
    turnOff(){
        if(this.showMenu){
            this.showMenu = false;
        }
    }
}
