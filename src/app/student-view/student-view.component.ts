import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataComponentService } from '../services/data-component.service';
import { DataBackendService}  from '../services/data-backend.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  providers: [
    { provide: 'name', useValue: 'container' },
  ]
})

export class StudentViewComponent implements OnInit {
  passcode: string = "Default";
  courseName: string = "Course Name";
  courseID: string = "Course ID";
  courseProf: string = "Professor's Name"
  //courseProf: { first: string, last: string } = { first: "Professor's", last: "Name" };
  
  constructor(public service_comm: DataComponentService, private serve_back: DataBackendService, private http: HttpClient) {
  }

  ngOnInit() {
    // this.serve_back.GetCourseNameAsStudent().then(res => {
    //   this.courseName = res.course_name
    //   this.courseID = res.course_id
    //   this.courseProf = res.professor_name
    // });
    
    this.http.get<any>('http://localhost:4222/CourseNameAsStudent').subscribe(data => {
      this.courseName = data.course_name
      this.courseID = data.course_id
      this.courseProf = data.professor_name
    })
  }
  openSyllabus() {
    // TODO: Implement actual syllabus
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank');
  }
}
