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
  courseID: string | null = null;
  username: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;

  student() {
    if (this.courseID == "admin") {
      this.router.navigate(['student-view']);
    }
  }

  teacher() {
    if (this.username == "admin") {
      this.router.navigate(['teacher-view']);
    }
  }

  register(credentials: { TESTusername: string, TESTpassword: string }) {
      const url = 'http://localhost:4222';
      console.log(credentials);
      this.http.post(url + '/registeruser', {
        TESTusername: this.username,
        TESTpassword: this.password
      }).subscribe((response: any) => {
        if(response){
          console.log(response)
        }
        this.username = null
        this.password = null
      })
  }
}
