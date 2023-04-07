import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataComponentService } from '../services/data-component.service';
import { DataBackendService } from '../services/data-backend.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})

export class TeacherViewComponent {

  constructor(public serve_comm: DataComponentService, private serve_back: DataBackendService, private http: HttpClient) {
    this.serve_back.GetCoursesAsTeacher(this.serve_comm.GetSerial()).then(res => {
      // this.serve_comm.ClearCourses();
      // here, addcourse() and GetCoursesAsTeacher. Go through the courses, grab, print and double-check, then return and add courses by user_id
      for (let i = 0; i < res.length; i++) {
        this.serve_comm.AddCourse(res[i]);
      }
    }).catch(res => {
      console.log("YAHOO!");
    });
  }
}