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

  respond(index: number) {
    this.serve_back.UpdateAnswer(this.serve_comm.GetCourseSerial(), this.serve_comm.GetQuestion(index).question, this.responses[index]).then(res => {
      this.serve_comm.SetAnswer(index, this.responses[index]);
    });
  }

  deleteQuestion(question_serial: number) {
    this.serve_back.DeleteQuestion(question_serial).then(res => {
      this.serve_back.GetQuestions(this.serve_comm.GetCourseSerial()).then(res => {
        this.serve_comm.ClearQuestions();
        if (res != null) {
          for (let j = 0; j < res.length; j++) {
            this.serve_comm.AddQuestion(res[j]);
          }
        }

      }).catch(res => {
        console.log("YAY!");
      });
    });
  
  }
}
