import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataComponentService } from '../services/data-component.service';
import { DataBackendService}  from '../services/data-backend.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  providers: [
    { provide: 'name', useValue: 'container' },
  ]
})

export class StudentViewComponent {
  constructor(public service_comm: DataComponentService, private serve_back: DataBackendService) { }

  // Variables
  courseName: string = "Course Name";
  courseID: string = "Course ID";
  //courseProf: { first: string, last: string } = { first: "Professor's", last: "Name" };

  openSyllabus() {
    // TODO: Implement actual syllabus
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank');
  }
}
