import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// FormControl
import { FormControl, Validators } from '@angular/forms';
import { DataComponentService } from '../services/data-component.service';
import { DataBackendService } from '../services/data-backend.service';

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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private service_comm: DataComponentService, private serve_back: DataBackendService) { }

  // Input fields
  courseID: string | null = null;
  username: string | null = null;
  password: string | null = null;
  passcode: string | null = null;
  confirmPassword: string | null = null;

  student(credentials: { courseID: string }) {
    this.serve_back.LoginStudent(this.courseID!, this.passcode!).then(res => {
      this.service_comm.SetLoggedIn("S");
      this.service_comm.Navigate('student-view');

      // TODO: Update data in component class
      // e.g. serve_comm.SetProfName(serve_back.GetProfName(...));
    }).catch(res => {
      // TODO: Show error message
      console.log("YAHOO!");
    });
  }

  teacher(credentials: { username: string, password: string }) {
    this.serve_back.LoginTeacher(this.username!, this.password!).then(res => {
      this.service_comm.SetLoggedIn("T");
      this.service_comm.Navigate('teacher-view');

      // TODO: Update data in component class
      // e.g. serve_comm.SetProfName(serve_back.GetProfName(...));
    }).catch(res => {
      // TODO: Show error message
      console.log("YAHOO!");
    });
  }

  register(credentials: { username: string, password: string, confirmPassword: string }) {
    this.serve_back.Register(this.username!, this.password!, this.confirmPassword!).then(res => {
      this.service_comm.Navigate('signup');
    }).catch(res => {
      // TODO: Show error message
      console.log("YAHOO!");
    });
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
