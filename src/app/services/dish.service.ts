import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> //return promises
  {
    return Promise.resolve(DISHES);
  }
  //Specific Dish
  getDish(id: string):Promise<Dish> {
    //return DISHES.filter((dish) => (dish.id === id))[0];
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }
 //Display Featured dish
  getFeaturedDish():Promise<Dish> {
    //return DISHES.filter((dish) => dish.featured)[0];
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
//so this method will return the DISHES constant that 
//we have imported into our DishService. With this, our DishService is now 
//configured to supply that DISHES JavaScript object array to any other part of our application that requires it.then add the service in app module
