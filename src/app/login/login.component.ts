import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component
  ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent {
  constructor(public router: Router, private http: HttpClient) { }

  // Input fields
  courseID: string | undefined;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  student() {
    if (this.courseID == "admin") {
      this.router.navigate(['student-view']);
      return true;
    }
    else {
      return false;
    }
  }

  teacher() {
    if (this.username == "admin") {
      //this.router.navigate(['teacher-view']);
      this.router.navigate(['teacher-dash']);
    }
  }

  register(credentials: { username: string, password: string }) {
    if (this.password == this.confirmPassword) {
      console.log(credentials);
      /*
      this.http.post('localhost:3306/users.json', credentials).subscribe((res) =>
      {
        console.log(res);
      })
      */

      return true;
    }
    else {
      return false;
    }
  }
}
