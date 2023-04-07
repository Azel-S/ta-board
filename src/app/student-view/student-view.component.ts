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
    // TODO: Submit question.
    // this.serve_back.AddQuestion(...)

    // TODO: Delete as this is being faked
    this.serve_comm.GetQuestions().push({ index: 1, date: new Date(), question: this.description, answer: "No response" });

    this.serve_comm.Notify("Question was successfully added to the list!");

    this.toggleActive();
  }
}
