import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataBackendService } from '../services/data-backend.service';
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

  constructor(private _formBuilder: FormBuilder, private serve_comm: DataComponentService, private serve_back: DataBackendService) { };

  RegisterUser() {
    // Register Name
    this.serve_back.RegisterName(this.serve_comm.GetUserSerial(), this.professor.firstName, this.professor.lastName);

    // Register Courses
    for (let i = 0; i < this.numCourses; i++) {
      this.serve_back.RegisterCourse(this.serve_comm.GetUserSerial(), this.ids[i], this.names[i], this.passcodes[i], this.descriptions[i]);
    }

    // Navigate to login page
    this.serve_comm.Navigate("login");
  };
}