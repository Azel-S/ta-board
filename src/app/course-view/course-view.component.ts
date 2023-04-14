import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { DataBackendService } from '../services/data-backend.service';
import { DataComponentService } from '../services/data-component.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})

export class CourseViewComponent {
  constructor(public serve_comm: DataComponentService, private serve_back: DataBackendService, private http: HttpClient) {
    for (let i = 0; i < serve_comm.GetNumQuestions(); i++) {
      let answer = serve_comm.GetAnswer(i);

      if (answer != "No Response") {
        this.responses[i] = answer;
      }
    }
  }

  responses: string[] = [];

  submit(index: number) {
    this.serve_back.UpdateAnswer(this.serve_comm.GetCourseSerial(), this.serve_comm.GetQuestion(index).question, this.responses[index]);
    this.serve_comm.SetAnswer(index, this.responses[index])
  }
}
