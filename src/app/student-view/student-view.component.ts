import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})

export class StudentViewComponent {
  // Variables
  courseName: string = "Course Name";
  courseID: string = "Course ID";
  courseProf: { first: string, last: string } = { first: "Professor's", last: "Name" };

  @Input() count = 0
  @Output() change = new EventEmitter()

  increment(): void {
    this.count++
    this.change.emit(this.count)
  }

  decrement(): void {
    this.count--
    this.change.emit(this.count)
  }

  openSyllabus() {
    // TODO: Implement actual syllabus
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank');
  }
}
