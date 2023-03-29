import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataComponentService {
  constructor(private router: Router, private http: HttpClient) { }

  // Use capital characters to assign value.
  // F - False
  // S - Student
  // T - Teacher
  status: { loggedIn: string, user_serial: number, course: number } = { loggedIn: "F", user_serial: 0, course: 0 };

  professor: { firstName: string, lastName: string } = { firstName: "John", lastName: "Doe" };

  courses: { id: string, name: string, passcode: string, description: string }[] = [
    { id: "CEN3031", name: "Software Engineering", passcode: "", description: "This course goes over the fundamentals of programming in the real world." },
    { id: "COP4600", name: "Operating Systems", passcode: "", description: "This course teaches the student about core concepts within the modern operating system." },
    { id: "FOS2001", name: "Mans Food", passcode: "", description: "Learn about why eating tasty stuff is bad." },
    { id: "LEI2818", name: "Leisure", passcode: "", description: "Learn about how relaxing is great, however you don't get to do that because you are taking this course! Mwahaahaha." },
  ];

  questions: { student: string, question: string }[] = [
    { student: 'Abbas', question: "How the heck is this easy?" },
    { student: 'Riley', question: "How much is an apple worth?" },
    { student: 'Nick', question: "Why is the sky blue?" },
  ];

  SetUserSerial(user_serial: number) {
    this.status.user_serial = user_serial;
  }

  GetUserSerial() {
    return this.status.user_serial;
  }

  SetLoggedIn(type: string) {
    this.status.loggedIn = type;
  }

  GetLoggedIn() {
    return this.status.loggedIn;
  }

  Navigate(component: string, force: boolean = false) {
    if (force) {
      this.router.navigate([component]);
    }
    else {
      // TODO: Possible blocking of pages.
      // e.g. Cannot go to teacher-view without making sure loggedIn == "T"
      this.router.navigate([component]);
    }
  }

  GetProfName() {
    return this.professor.firstName + " " + this.professor.lastName;
  }

  GetProfFirstName() {
    return this.professor.firstName;
  }

  GetProfLastName() {
    return this.professor.lastName;
  }

  GetNumCourses() {
    return this.courses.length;
  }

  GetCourses() {
    return this.courses;
  }

  GetCourse(index: number = -1) {
    if (index == -1) {
      return this.courses[this.status.course];
    }
    else {
      return this.courses[index];
    }
  }

  GetCourseID(index: number = -1) {
    if (index == -1) {
      return this.courses[this.status.course].id;
    }
    else {
      return this.courses[index].id;
    }
  }

  GetCourseName(index: number = -1) {
    if (index == -1) {
      return this.courses[this.status.course].name;
    }
    else {
      return this.courses[index].name;
    }
  }

  AddCourse(course: {
    course_id: string, course_info_raw: string, course_name: string, id: number, professor_name: string
  }) {
    this.courses.push({id: course.course_id, name: course.course_name, passcode: "", description: course.course_info_raw});
  }

  GetNumQuestions() {
    return this.questions.length;
  }

  GetQuestions() {
    return this.questions;
  }

  GetQuestion(index: number = 0) {
    return this.questions[index];
  }

  OpenSyllabus() {
    // TODO: Implement actual syllabus
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank');
  }
}
