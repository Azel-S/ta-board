import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataComponentService } from '../services/data-component.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  // Data
  professor: { firstName: string, lastName: string } = { firstName: "", lastName: "" };
  numCourses: number = 0;
  // INFO: Cannot store as object since an array object's field is undefined.
  ids: string[] = [];
  passcodes: string[] = [];
  names: string[] = [];
  descriptions: string[] = [];

  // Forms Stuff
  initGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    numCourses: ['', Validators.pattern('[0-9]')]
  });

  courseGroup = this._formBuilder.group({
    courseID: ['', Validators.required],
    coursePasscode: ['', Validators.required],
    courseName: ['', Validators.required],
    courseDescription: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private serve_comm: DataComponentService) { };

  RegisterUser() {
    // Register Name
    

    // Register Courses


    // Navigate to login page
    this.serve_comm.Navigate("login");
  };
}