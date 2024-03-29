import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  // INFO: Courses has to have array field and cannot itself be an array since ngModel requires the object to be created when linking.
  courses: { id: string[], name: string[], codes: string[], description: string[] } = { id: [], name: [], codes: [], description: [] };
  numCourses: number = 1;
  agree: boolean = false;

  // Forms Stuff
  initGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    numCourses: ['', Validators.pattern('[0-9]+')]
  });
  courseGroup = this.formBuilder.group({
    courseID: ['', Validators.required],
    coursePasscode: ['', Validators.required],
    courseName: ['', Validators.required],
    courseDescription: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private serve_comm: DataComponentService, private serve_back: DataBackendService) { };

  RegisterUser() {
    // Register Name
    this.serve_back.UpdateName(this.serve_comm.GetSerial(), this.professor.firstName + " " + this.professor.lastName);

    // Register Courses
    for (let i = 0; i < this.numCourses; i++) {
      this.serve_back.AddCourse(this.serve_comm.GetSerial(),
      this.courses.id[i],
      this.courses.codes[i], this.courses.name[i],
      this.professor.firstName + " " + this.professor.lastName,
      this.courses.description[i]);
    }

    // Show success message and navigate to login page.
    this.serve_comm.Notify("Registration Successful!");
    this.serve_comm.Navigate("login");
  };
}