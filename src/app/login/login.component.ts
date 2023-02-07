import { Component } from '@angular/core';
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

  login()
  {
    if(this.courseID == "admin")
    {
      this.router.navigate(['\dash']);
    }
    else
    {
      // TODO: Error Message
    }
  }

  register()
  {
    // TODO
  }
}
