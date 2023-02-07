import { Component } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';

@Component
({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent
{
  constructor(public router: Router){}

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
  }

  teacher()
  {
    if(this.username == "admin")
    {
      this.router.navigate(['teacher-view']);
    }
  }

  register()
  {
    // TODO
  }
}
