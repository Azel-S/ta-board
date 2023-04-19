import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataBackendService {
  constructor(public router: Router, private http: HttpClient) { }

  // Local Variables
  url = 'http://localhost:4222';

  // Returns (ok/bad)
  // TODO: Fix return
  async RegisterCredentials(username: string, password: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/RegisterCredentials', { username: username, password: password }));
    return result;
  }

  async LoginStudent(courseID: string, courseCode: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/Student', { course_id: courseID, course_code: courseCode }));
    return result;
  }

  // Returns (ok/bad)
  // TODO: Fix return
  async LoginTeacher(username: string, password: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/Teacher', { username: username, password: password }));
    return result;
  }

  async UpdateName(user_serial: number, professor_name: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/UpdateName', { user_serial: user_serial, professor_name: professor_name }));
    return result;
  }

  async AddCourse(user_serial: number, course_id: string, course_code: string, course_name: string, professor_name: string, description: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/AddCourse', {
      user_serial: user_serial,
      course_id: course_id,
      course_code: course_code,
      course_name: course_name,
      professor_name: professor_name,
      description: description
    }));
    return result;
  }

  // Returns course object
  async GetCourseInfo(course_serial: number) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/Student', { course_serial: course_serial }));
    return result;
  }

  async DeleteCourse(course_serial: number) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/DeleteCourse', { course_serial: course_serial }));
    return result;
  }

  async DeleteQuestion(question_serial: number) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/DeleteQuestion', { question_serial: question_serial }));
    return result;
  }

  // Returns (courseName: string)[]
  // TODO: Fix return
  async GetCourses(user_serial: number) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/GetCourses', { user_serial: user_serial }));
    return result;
  }

  // Returns (student: string, question: string)[]
  // TODO: Fix return
  async GetQuestions(course_serial: number) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/GetQuestions', { course_serial: course_serial }));
    return result;
  }

  async AddQuestion(course_serial: number, question: string, answer: string, date_time: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/AddQuestion', {
      course_serial: course_serial,
      question: question,
      answer: answer,
      date_time: date_time
    }));
    return result;
  }

  async UpdateAnswer(course_serial: number, question: string, answer: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/UpdateAnswer', {
      course_serial: course_serial,
      question: question,
      answer: answer
    }));
    return result;
  }
}
