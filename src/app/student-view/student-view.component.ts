import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataComponentService } from '../services/data-component.service';
import { DataBackendService } from '../services/data-backend.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  providers: [
    { provide: 'name', useValue: 'container' },
  ]
})

export class StudentViewComponent {
  constructor(public serve_comm: DataComponentService, private serve_back: DataBackendService, private http: HttpClient) { }
  addActive: boolean = true;
  description: string = "";

  toggleActive() {
    this.addActive = !this.addActive;
    this.description = "What is your question...?";
  }

  submit() {
    this.serve_back.AddQuestion(this.serve_comm.GetCourseSerial(), this.description, "No response");
    this.serve_comm.GetQuestions().push({ date: new Date(), question: this.description, answer: "No response" });
    this.serve_comm.Notify("Question was successfully added to the list!");
    this.toggleActive();
  }
}
