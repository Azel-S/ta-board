import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  providers: [
    { provide: 'name', useValue: 'container' },
  ]
})

export class StudentViewComponent {
  // Variables
  courseName: string = "Course Name";
  courseID: string = "Course ID";
  courseProf: { first: string, last: string } = { first: "Professor's", last: "Name" };

  openSyllabus() {
    // TODO: Implement actual syllabus
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank');
  }
}
