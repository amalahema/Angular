import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

 @Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  dishes: Dish[] = DISHES;
  selectedDish :Dish;//used to diaplay the 1st item of the array
 //equals signs are used to assign the value to a variable. A colon is used to assign a type.
  constructor() { }

  ngOnInit() {
  }
  onSelect(dish: Dish)//parameter dish is passed to select method
   {
    this.selectedDish = dish;//dish is assigned to selectedDish
   }

}


 
 
 
 