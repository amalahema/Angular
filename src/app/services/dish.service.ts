import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }

  getDishes(): Dish[] //
  {
    return DISHES;
  }
  //Specific Dish
  getDish(id: string): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }
 //Display Featured dish
  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
}
//so this method will return the DISHES constant that 
//we have imported into our DishService. With this, our DishService is now 
//configured to supply that DISHES JavaScript object array to any other part of our application that requires it.then add the service in app module
