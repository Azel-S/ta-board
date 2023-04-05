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
    serve_comm.Navigate("course-view");
  }

  responses: string[] = [];
  
}
