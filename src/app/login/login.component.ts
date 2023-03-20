import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataComponentService } from '../services/data-component.service';

// FormControl
import { FormControl, Validators } from '@angular/forms';

@Component
  ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent
{
  constructor(public router: Router, private http: HttpClient){}

  // Input fields
  courseID: string | undefined;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  student()
  {
    if(this.courseID == "admin")
    {
      this.router.navigate(['student-view']);
    }
    // Else if
  }

  teacher()
  {
    if(this.username == "admin")
    {
      this.router.navigate(['teacher-view']);
    }
  }

  register(credentials: {username: string, password: string})
  {
    if(this.password == this.confirmPassword)
    {
      console.log(credentials);
      this.http.post('localhost:3306/users.json', credentials).subscribe((res) =>
      {
        console.log(res);
      })
    }
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
