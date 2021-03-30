import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service'
import { flyInOut,expand } from '../animation/app.animation';

 @Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  //ADD A NEW PROPERTY HOST
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class MenuComponent implements OnInit {
  dishes: Dish[]; 
  errMess:  string;
 //equals signs are used to assign the value to a variable. A colon is used to assign a type.
 constructor(private dishService: DishService,
  @Inject('baseURL') private baseURL) { }//@ is a decorator
  
//when this component is created, then this DishService that you have injected into the app module. When you inject that into the app module, it'll create one single dishService object. And that dishService object will be made available to you within your menu component here.
  ngOnInit() {
    //this.dishes=this.dishService.getDishes();
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
    // Menu component is now able to consume the observable values that is being emitted by the observable.

  }
 

}


 
 
 
 