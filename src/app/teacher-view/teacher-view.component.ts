import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { DataBackendService } from '../services/data-backend.service';
import { DataComponentService } from '../services/data-component.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})

export class TeacherViewComponent {

  constructor(private serve_back: DataBackendService, public serve_comm: DataComponentService) { }
}