import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';          // Assignment 3: Angular Reactive Form Validtaion
                                                                             //step 2:import the class comment and form builder library
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
 
  
    dish: Dish;
    errMess: string;
    dishIds: string[];
    prev: string;
    next: string;                                                         //Step 3 Declare a variable and then form group module host the the reactive form here
    commentForm: FormGroup;
    comment: Comment;                 
  
    formErrors =                                                          //

    {
      'author': '',
      'comment': '',
    };
  
    validationMessages =                                                
    {
      'author': {
        'required':  'Name is required.',
        'minlength':  'Name must be at least 2 characters long.'
      },
      'comment': {
        'required':  'Comment is required.'
      },
    };

  constructor(private dishService:DishService, private route : ActivatedRoute,private location: Location,private fb:FormBuilder, @Inject('baseURL') private baseURL)//STEP-4 make the form services available by injecting to the constructor,constructor is called first 
    { 
      this.createForm();                                                                                                       //step 5:call the function 
    }

    ngOnInit() :void 
    {
      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))//import the param(one of the observer) from the router library
    
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);},
      errmess => this.errMess = <any>errmess);
      
    }
    setPrevNext(dishId: string)
     {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
     }
      
   
    createForm()                                                                                  //step 6:assign the variable
    {
      this.commentForm = this.fb.group
      ({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        comment: ['', [Validators.required, Validators.minLength(1)] ],
        rating: 5
      });
  
      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));                 // valuechanges is an observable
      this.onValueChanged();                                                                     // (re)set validation messages now
    }
    
  
    onValueChanged(data?: any)
     {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        this.formErrors[field] = '';                                                               // clear previous error message (if any)
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    //this.comment= form.value;
    }
  
    onSubmit() {
      this.comment = this.commentForm.value;
      this.comment.date = new Date().toISOString();
      this.dish.comments.push(this.comment);
      console.log(this.comment);
      this.comment = null;
      this.commentForm.reset({
        author: '',
        comment: '',
        rating: 5
      });
    }
         
  goback(): void
  {
  this.location.back();                                                                     
  }
  
}
       // this dishService. GetDish, and then this ID now should be obtained by using the params.
      // You see the parameter that we have there. From the params, I'll say within brackets ID. 
      //So, what happens is that whenever the params observable changes value, which means that the route parameter changes value, then immediately,
      // the switch map operator will take the params value, and then do a getDish from my dishService. So, this would be automatically initi...
      //So, we are creating a new observable which is the getDish,
       // which is going to return the dish object here. Now, once we get the getDish there, 
      //then that can now be available as an observable. I just subscribe to that observable using the subscribe here. Then, there I obtain the dish. 
      //This dish is obtained by doing this getDish here
      //I'm mapping the params observable into another observable which is basically going in fetching the dish value from my dishService, and then making that available as an observable. Then, I'm subscribing to that observable here, and then thereby, I'm getting the dish value here, and then
       //mapping the dish value or rather making the dish variable equal to the dish value here. Notice how by using the observables,
       // you are now able to take one observable then map it into another observable.