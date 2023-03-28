import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { DataComponentService } from '../services/data-component.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})

export class CourseViewComponent {
  constructor(public serve_comm: DataComponentService) {
    serve_comm.Navigate("course-view");
  }
}
