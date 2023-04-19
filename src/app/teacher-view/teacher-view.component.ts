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
  constructor(public serve_comm: DataComponentService, private serve_back: DataBackendService, private http: HttpClient) { }

  modifyCourse(index: number) {
    this.serve_comm.SetCurrentCourse(index);

    this.serve_back.GetQuestions(this.serve_comm.GetCourseSerial()).then(res => {
      this.serve_comm.ClearQuestions();
      if (res != null) {
        for (let i = 0; i < res.length; i++) {
          this.serve_comm.AddQuestion(res[i]);
        }
      }

      this.serve_comm.Navigate("course-view")
    })
  }

  deleteCourse(index: number) {
    this.serve_comm.SetCurrentCourse(index);
    this.serve_back.DeleteCourse(this.serve_comm.GetCourseSerial()).then(res => {
      this.serve_back.GetCourses(this.serve_comm.GetSerial()).then(res => {
        this.serve_comm.ClearCourses();
        if (res != null) {
          for (let i = 0; i < res.length; i++) {
            this.serve_comm.AddCourse(res[i]);
          }
        }
      }).catch(res => {
        console.log("YAHOO!");
      });
    });
  }
}