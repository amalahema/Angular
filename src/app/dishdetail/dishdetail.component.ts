import { Component, OnInit } from '@angular/core';//Input is an one of the module
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
 
  
    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
     
  constructor(private dishService:DishService,
    private route : ActivatedRoute,
    private location: Location) //make the services available
    { }

    ngOnInit() {
      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))//import the param(one of the observer) from the router library
      // this dishService. GetDish, and then this ID now should be obtained by using the params.
      // You see the parameter that we have there. From the params, I'll say within brackets ID. 
      //So, what happens is that whenever the params observable changes value, which means that the route parameter changes value, then immediately,
      // the switch map operator will take the params value, and then do a getDish from my dishService. So, this would be automatically initi...
      //So, we are creating a new observable which is the getDish,
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
      // which is going to return the dish object here. Now, once we get the getDish there, 
      //then that can now be available as an observable. I just subscribe to that observable using the subscribe here. Then, there I obtain the dish. 
      //This dish is obtained by doing this getDish here
      //I'm mapping the params observable into another observable which is basically going in fetching the dish value from my dishService, and then making that available as an observable. Then, I'm subscribing to that observable here, and then thereby, I'm getting the dish value here, and then
       //mapping the dish value or rather making the dish variable equal to the dish value here. Notice how by using the observables,
       // you are now able to take one observable then map it into another observable.
    }
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    
  goback(): void
  {
    this.location.back();
  }
}
