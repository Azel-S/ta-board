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
    // TODO
  }

  deleteCourse(index: string, passcode: string) {
    // TODO
  }
}