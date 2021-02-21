import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//The FormBuilder is the helper API to build forms in Angular.  It provides shortcuts to create the instance of the FormControl, FormGroup or FormArray. It reduces the code required to write the complex forms.
import { Feedback, ContactType } from '../shared/feedback';
//Viewchild will enable us to get access to any of the child dom elements within my template.
@Component({//Amgular directive
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;//Form module to host the reactive form
  feedback: Feedback;//corresponding data model(fetched from the server )
  contactType = ContactType;
  @ViewChild('fform')feedbackFormDirective;
  //Template variable fform to refer feedbackform,enables access to the complete template from
  constructor(private formbuilder: FormBuilder) //create a referenct to formbuilder and access throughout the components by Injecting dependencies
  //Construction is first, but happens when the component isn't really a component yet. 
  //So therefore the constructor should only contain very basic simple code relating to basic initialization of the class. You will have the injected services
  { 
    this.createForm();
  }
  
  
  ngOnInit() //called when the component is fully initialized,it ia a part of angular life cycle
  {
  }
  createForm()
    {
    //Create a Form Group
    this.feedbackForm = this.formbuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      telnum: [0,Validators.required],
      email: ['',Validators.required],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum:0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''

    });
    this.feedbackFormDirective.resetForm();
  }
}
/*why we inject form builder instead of declare it?
Dependency injections is a mechanism that provides you with references where you need them. 
Imagine a class that represents a connection pool to your database 
you usually only have one instance of that class. 
Now you need to distribute that reference to all the classes that use it. Here is where Dependency Injection comes in handy*/