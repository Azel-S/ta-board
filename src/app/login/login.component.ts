import { HttpClient } from '@angular/common/http';
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
  constructor(public router: Router, private http: HttpClient){}

  // Input fields
  courseID: string | null = null;
  username: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;

  student()
  {
    if(this.courseID == "admin")
    {
      this.router.navigate(['student-view']);
    }
    // Else if
  }

  teacher() {
    if (this.username == "admin") {
      this.router.navigate(['teacher-view']);
    })
  }

  register(credentials: { username: string, password: string }) {
    if (true)//this.password == this.confirmPassword)
    {
      const url = 'http://localhost:4222';
      console.log(credentials);
      
      if(this.username == "get")
      {
        this.http.get<any>(url + '/userstest').subscribe((res) =>
        {
          console.log(res);
          this.username = res.username;
        })
      }
      else if(this.username == "post")
      {
        this.http.post<any>(url + '/userstest', { title: 'POST Request' }).subscribe((res) =>
        {
          console.log(res);
          this.username = res.username;
        });
      }
    }
  }
}
