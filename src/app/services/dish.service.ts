import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable,of } from 'rxjs';//
import { delay } from 'rxjs/operators';
//My service is now updated to return promises from an observable here. So, with this update, 
//my dish service is updated to make use of observables rather than directly using the values.
@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }
  
  //dish service 
  getDishes(): Observable<Dish[]> 
  {
    return of(DISHES).pipe(delay(2000));
                         
  }

  getDish(id:string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
  getDishIds():Observable<string[] | any>
  {
    return of(DISHES.map(dish => dish.id));
  }
}
//
  //RxJS' of() is a creational operator that allows you to create an RxJS Observable from a sequence of values.
              //of() converts the arguments to an observable sequence.
              //convert this toPromise and emit the promise. 
              //So now, my getDishes method is updated to make use of an observable,
              //and then convert that into a promise and then send out the promise to my component.
              
//so this method will return the DISHES constant that 
//we have imported into our DishService. With this, our DishService is now 
//configured to supply that DISHES JavaScript object array to any other part of our application that requires it.then add the service in app modul