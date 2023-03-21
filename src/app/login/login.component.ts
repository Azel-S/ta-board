import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// FormControl
import { FormControl, Validators } from '@angular/forms';


// Source: https://blog.angular-university.io/angular-custom-validators/
export function createErrorVal(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    if (value == "error") {
      return { errorVal: true };
    }
    else {
      return null;
    }
  }
}

@Component
  ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent {
  constructor(public router: Router, private http: HttpClient) { }

  // Input fields
  courseID: string | null = null;
  username: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;

  // TODO: Add service component
  student() {
    if (this.courseID == "admin") {
      this.router.navigate(['student-view']);
    }
  }

  teacher(credentials: { username: string, password: string }) {
    // if (this.username == "admin") {
    //   this.router.navigate(['teacher-view']);
    // }
    const url = 'http://localhost:4222';
    console.log(credentials)
    this.http.post(url + '/teacherlogin', {
      username: this.username,
      password: this.password
    }).subscribe(res => {
      console.log(res)
      this.router.navigate(['teacher-view']);
    })
  }

  register(credentials: { username: string, password: string }) {
    const url = 'http://localhost:4222';
    console.log(credentials);
    this.http.post(url + '/registeruser', {
      username: this.username,
      password: this.password
    }).subscribe()
  }

    //===INPUT ERRORS===//
  //==Student==//
  courseIDFormControl = new FormControl('', [Validators.required]);
  //==Teacher==//
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  //==Register==//
  confirmPasswordFormControl = new FormControl('', [Validators.required]);


}
