import {Injectable, provide} from '@angular/core';

@Injectable()
export class NameService {
    name = "Edit Your Name";

        getName(){
            if(localStorage.getItem('name')){
                this.name = localStorage.getItem('name');
            }
            return this.name;
        };
        setName(name: string){
            this.name = name;
            localStorage.setItem('name',name);
        };
}
