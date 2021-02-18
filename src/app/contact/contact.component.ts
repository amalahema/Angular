import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//The FormBuilder is the helper API to build forms in Angular.  It provides shortcuts to create the instance of the FormControl, FormGroup or FormArray. It reduces the code required to write the complex forms.
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;//Form module to host the reactive form
  feedback: Feedback;//corresponding data model(fetched from the server )
  contactType = ContactType;

  constructor(private formbuilder: FormBuilder) 
  //called when the component is constructed & Used for Injecting dependencies
  //Construction is first, but happens when the component isn't really a component yet. So therefore the constructor should only contain very basic simple code relating to basic initialization of the class. You will have the injected services
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
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset();
  }
}
