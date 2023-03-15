import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataComponentService {

  constructor(public router: Router, private http: HttpClient) { }

  // Data Communication between component

  student(courseID: string) {
    if (courseID == 'admin') {
      this.router.navigate(['student-view'])
    }
  }
  teacher(username: string) {
    if (username == "admin") {
      this.router.navigate(['teacher-view']);
    }
  }

  register(credentials: { username: string, password: string }) {
    if (true)//this.password == this.confirmPassword)
    {
      const url = 'http://localhost:4222';
      console.log(credentials);
      if(credentials.username == "get")
      {
        this.http.get<any>(url + '/userstest').subscribe((res) =>
        {
          console.log(res);
          credentials.username = res.username;
        })
      }
      else if(credentials.username == "post")
      {
        this.http.post<any>(url + '/userstest', { title: 'POST Request' }).subscribe((res) =>
        {
          console.log(res);
          credentials.username = res.username;
        });
      }
    }
  }

}
