import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Data
  contact: { first: string, last: string, email: string, phone: string} | undefined;

  contactGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.pattern('[0-9]+')]
  });
  testGroup = this._formBuilder.group({
  });

  constructor(private _formBuilder: FormBuilder) { }
}
