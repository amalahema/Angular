import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service'


 @Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  dishes: Dish[]; 
  selectedDish :Dish;

 //equals signs are used to assign the value to a variable. A colon is used to assign a type.
  constructor(private dishService: DishService) { }
//when this component is created, then this DishService that you have injected into the app module. When you inject that into the app module, it'll create one single dishService object. And that dishService object will be made available to you within your menu component here.
  ngOnInit() {
    //this.dishes=this.dishService.getDishes();
     this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes);// Menu component is now able to consume the observable values that is being emitted by the observable.
  }
  onSelect(dish: Dish)//parameter dish is passed to select method
   {
    this.selectedDish = dish;//dish is assigned to selectedDish
   }

}


 
 
 
 