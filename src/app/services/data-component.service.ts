import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DataBackendService } from './data-backend.service';
import { result } from 'cypress/types/lodash';
//import moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class DataComponentService {
  constructor(private serve_back: DataBackendService, private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

  // Use capital characters to assign value.
  // F - False
  // S - Student
  // T - Teacher
  status: { course: number } = { course: 0 };

  professor: string = "John Doe";

  courses: { serial: number, id: string, name: string, passcode: string, description: string }[] = [];
  
  questions: {question_serial: number, question: string, answer: string, date_time: string}[] = [];

  //==Serial Functions==// 
  SetSerial(serial: number) {
    this.saveData("status.serial", serial);
  }

  GetSerial() {
    return this.getData("status.serial") || 0;
  }

  //==Logged-In Functions==//
  SetLoggedIn(loggedIn: string) {
    this.saveData("status.loggedIn", loggedIn);
  }

  GetLoggedIn() {
    return this.getData("status.loggedIn") || "F";
  }

  SetCurrentCourse(index: number) {
    this.status.course = index;
  }

  GetCurrentCourse() {
    return this.status.course;
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
    return this.professor;
  }

  SetProfName(professor: string) {
    this.professor = professor;
  }

  GetNumCourses() {
    return this.courses.length;
  }

  GetCourses() {
    return this.courses;
  }

  GetCourse() {
    if (this.courses.length > 0) {
      return this.courses[this.status.course];
    }
    else {
      return null;
    }
  }

  GetCourseSerial() {
    if (this.courses.length > 0) {
      return this.courses[this.status.course].serial;
    }
    else {
      return 0;
    }
  }

  GetCourseID() {
    if (this.courses.length > 0) {
      return this.courses[this.status.course].id;
    }
    else {
      return "Error";
    }
  }

  GetCourseName() {
    if (this.courses.length > 0) {
      return this.courses[this.status.course].name;
    }
    else {
      return "Error";
    }
  }

  AddCourse(course: {
    course_serial: number, course_id: string, description: string, course_name: string, id: number, professor_name: string
  }) {
    this.courses.push({ serial: course.course_serial, id: course.course_id, name: course.course_name, passcode: "", description: course.description });
  }

  ClearCourses() {
    this.courses = [];
  }

  GetNumQuestions() {
    return this.questions.length;
  }

  GetQuestions() {
    console.log(this.questions)
    return this.questions;
  }

  GetQuestion(index: number = 0) {
    return this.questions[index];
  }

  GetAnswer(index: number = 0) {
    return this.questions[index].answer;
  }

  GetDateTime(index: number = 0) {
    return this.questions[index].date_time;
  }

  SetAnswer(index: number = 0, answer: string) {
    this.questions[index].answer = answer;
    this.snackBar.open("Response Submitted!", "Close", { duration: 3000 });
  }

  //AddQuestion(question: { index: number, date: Date, question: string, answer: string, date_time: Date }) {
  AddQuestion(question: { question_serial: number, question: string, answer: string, date_time: string }) {
    this.questions.push(question);
  }

  ClearQuestions() {
    this.questions = [];
  }

  OpenSyllabus() {
    // TODO: Implement actual syllabus
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank');
  }

  GetCurrentDate(date: Date = new Date(), time: boolean = true) {
    let result = "";

    result += date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    result += "/";
    result += date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    result += "/";
    result += date.getFullYear();

    if (time) {
      result += " ";  // Spacer

      if (date.getHours() % 12 == 0) {
        result += "12";
      } else {
        result += date.getHours() % 12 < 10 ? "0" + date.getHours() % 12 : date.getHours() % 12;
      }
      result += ":";
      result += date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      result += date.getHours() < 12 ? "am" : "pm";
    }

    return result;
  }


  //==Local Storage==//
  private saveData(key: string, data: any) {
    console.log(key + '= ', JSON.parse(localStorage.getItem(key)!));
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getData(key: string) {
    console.log(key + ': ', JSON.parse(localStorage.getItem(key)!));
    return JSON.parse(localStorage.getItem(key)!);
  }

  private removeData(key: string) {
    localStorage.removeItem(key);
  }

  private clearData() {
    localStorage.clear();
  }

}
