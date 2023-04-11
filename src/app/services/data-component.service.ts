import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class DataComponentService {
  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

  // Use capital characters to assign value.
  // F - False
  // S - Student
  // T - Teacher
  status: { loggedIn: string, serial: number, course: number } = { loggedIn: "F", serial: 0, course: 0 };

  professor: { firstName: string, lastName: string } = { firstName: "John", lastName: "Doe" };

  courses: { id: string, name: string, passcode: string, description: string }[] = [
    { id: "CEN3031", name: "Software Engineering", passcode: "", description: "This course goes over the fundamentals of programming in the real world." },
    { id: "COP4600", name: "Operating Systems", passcode: "", description: "This course teaches the student about core concepts within the modern operating system." },
    { id: "FOS2001", name: "Mans Food", passcode: "", description: "Learn about why eating tasty stuff is bad." },
    { id: "LEI2818", name: "Leisure", passcode: "", description: "Learn about how relaxing is great, however you don't get to do that because you are taking this course! Mwahaahaha." },
    // NOTE:
    //  Displaying User courses now works ONLY AFTER LOGGING IN. If you refresh the page, the info isn't saved. Will have to get with
    //  front-end to fix this
    //
  ];

  questions: { index: number, date: Date, question: string, answer: string }[] = [
    { index: 0, date: new Date("2023-04-06"), question: "How the heck is this easy?", answer: 'No response' },
    { index: 1, date: new Date("2022-04-06"), question: "How much is an apple worth?", answer: 'No response' },
    { index: 2, date: new Date("2021-04-06"), question: "Why is the sky blue?", answer: 'No response' },
  ];

  // Functions 
  SetSerial(serial: number) {
    this.status.serial = serial;
  }

  GetSerial() {
    return this.status.serial;
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

  // Shows a notification at the bottom of the screen.
  Notify(message: string, action: string = "Close", duration: number = 3000) {
    this.snackBar.open(message, action, { duration: duration });
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
    this.courses.push({ id: course.course_id, name: course.course_name, passcode: "", description: course.course_info_raw });
  }

  ClearCourses() {
    this.courses = [];
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

  GetAnswer(index: number = 0) {
    return this.questions[index].answer;
  }

  SetAnswer(index: number = 0, answer: string) {
    this.questions[index].answer = answer;
    this.snackBar.open("Response Submitted!", "Close", { duration: 3000 });
  }

  OpenSyllabus() {
    // TODO: Implement actual syllabus
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank');
  }

  GetDate(date: Date = new Date(), time: boolean = false) {
    let result: string = "";

    result += date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    result += "/";
    result += date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    result += "/";
    result += date.getFullYear();

    if (time) {
      result += " " + this.GetTime(date);
    }

    return result;
  }

  GetTime(date: Date = new Date()) {
    let result = "";

    if (date.getHours() % 12 == 0) {
      result += "12";
    } else {
      result += date.getHours() % 12 < 12 ? "0" + date.getHours() % 12 : date.getHours() % 12;
    }
    result += ":";
    result += date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    result += date.getHours() < 12 ? "am" : "pm";

    return result;
  }

  //==Local Storage==//
  private saveData(key: string, data: any){
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getData(key: string) {
    console.log('recObj: ', JSON.parse(localStorage.getItem(key)!));
    
    return JSON.parse(localStorage.getItem(key)!);
  }

  private removeData(key: string) {
  localStorage.removeItem(key);
}

private clearData() {
  localStorage.clear();
}

}
