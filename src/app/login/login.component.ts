import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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

  register(credentials: { username: string, password: string }) {
    const url = 'http://localhost:4222';
    console.log(credentials);
    this.http.post(url + '/registeruser', {
      username: this.username,
      password: this.password
    }).subscribe()
  }
  // register(credentials: { username: string, password: string }) {
  //   if (true)//this.password == this.confirmPassword)
  //   {
  //     const url = 'http://localhost:4222';
  //     console.log(credentials);

  //     if(this.username == "get")
  //     {
  //       this.http.get<any>(url + '/userstest').subscribe((res) =>
  //       {
  //         console.log(res);
  //         this.username = res.username;
  //       })
  //     }
  //     else if(this.username == "post")
  //     {
  //       this.http.post<any>(url + '/userstest', { title: 'POST Request' }).subscribe((res) =>
  //       {
  //         console.log(res);
  //         this.username = res.username;
  //       });
  //     }
  //   }
  // }
}
