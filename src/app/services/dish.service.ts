import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { Observable, of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
/*My service is now updated to return promises from an observable here. So, with this update, 
my dish service is updated to make use of observables rather than directly using the values.*/

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {                                          //get id of all the dishes
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
  putDish(dish: Dish): Observable<Dish> 
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'                                           //specifying the server the incoming request in json-format 
      })
    };
  
      return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)    //dish is the parameter from the upated one(putDish)
      .pipe(catchError(this.processHTTPMsgService.handleError));
                                                                                      
  }
}




/*
  RxJS' of() is a creational operator that allows you to create an RxJS Observable from a sequence of values.
              of() converts the arguments to an observable sequence.
              convert this toPromise and emit the promise.
              So now, my getDishes method is updated to make use of an observable,
              and then convert that into a promise and then send out the promise to my component.

so this method will return the DISHES constant that
we have imported into our DishService. With this, our DishService is now
configured to supply that DISHES JavaScript object array to any other part of our application that requires it.then add the service in app modul*/