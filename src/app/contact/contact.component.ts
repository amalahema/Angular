import { Component, OnInit,Inject} from '@angular/core';
import {  switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut } from '../animation/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { Feedback, ContactType } from '../shared/feedback';                                                                              //The FormBuilder is the helper API to build forms in Angular.  It provides shortcuts to create the instance of the FormControl, FormGroup or FormArray. It reduces the code required to write the complex forms.


@Component({                                                          //Angular directive
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;                                          //Form module to host the reactive form
  feedback: Feedback;                                               //corresponding data model(fetched from the server )
  contactType = ContactType;
  spinnerVisibility: boolean = false;
  errMess: string;
  
 
  constructor(private feedbackservice:FeedbackService,private formbuilder:FormBuilder)// private route : ActivatedRoute,private location: Location,private formbuilder:FormBuilder, @Inject('baseURL') private baseURL)//STEP-4 make the form services available by injecting to the constructor,constructor is called first 
  { 
    this.createForm();  
    this.isFormLoading = true;                                      //Form Load
    this.isShowingResponse = false;                                //List fetched from server as a list
                                                               
  }

ngOnInit() :void                                                   //called when the component is fully initialized,it ia a part of angular life cycle
{
 
}
                                                                   //java object formErrors
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

                                                                      //error message appeared depending on the form elements
  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  isFormLoading: boolean;
  isShowingResponse: boolean;

   
  createForm()
  {
    //Create a Form Group
    
    this.feedbackForm = this.formbuilder.group({
      firstname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0,[Validators.required, Validators.pattern]],
      email: ['',[Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged(); //(re)set form validatiom messages

  }
  onSubmit() 
  {   
    this.spinnerVisibility = true;                        //Display Spinner
    this.isFormLoading = false;                           
    this.feedback = this.feedbackForm.value;
    this.feedbackservice.submitfeedback(this.feedback)
      .subscribe(feedback => {
          this.feedback = feedback;
          console.log(this.feedback);
        } ,
        errmess => {
          this.feedback = null;
          this.errMess = <any>errmess;
        } ,
       () => {
         this.spinnerVisibility = false;
         this.isShowingResponse = true;//For a particular time Display the details fetched from the server in the list
         setTimeout(() => {this.isShowingResponse = false; this.isFormLoading = true;} , 5000 );//After timeout make the form display 
        });
       
    this.feedbackForm.reset({
      firstname: '' ,
      lastname: '' ,
      telnum: '' ,
      email: '' ,
      agree: false ,
      contacttype: 'None' ,
      message: ''
      
    });
    
  
    
  }

  onValueChanged(data?: any) //passing parameter
  {
    if (!this.feedbackForm) //if the form not created return anything
      { return; }

    const form = this.feedbackForm;//define the rest of the code
    for (const field in this.formErrors)//check all the objects
     {
      if (this.formErrors.hasOwnProperty(field)) 
      {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) 
        {
          const messages = this.validationMessages[field];
          for (const key in control.errors) 
          {
            if (control.errors.hasOwnProperty(key))         // if there are errors then the form errors JavaScript object for that particular field, will have all the error messages attached to it.
             {
              this.formErrors[field] += messages[key] + ' ';//Depending upon the for error, corressponding error messages attached with 
             }
          }          
        }  
      }
    } 
  }

 
}

/*why we inject form builder instead of declare it?
Dependency injections is a mechanism that provides you with references where you need them. 
Imagine a class that represents a connection pool to your database 
you usually only have one instance of that class. 
Now you need to distribute that reference to all the classes that use it. Here is where Dependency Injection comes in handy*/