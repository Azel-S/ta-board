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
  async RegisterUser(username: string, password: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/registeruser', { username: username, password: password }));
    return result;
  }

  async LoginStudent(courseID: string, passcode: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/StudentLogin', { courseID: courseID, passcode: passcode }));
    return result;
  }

  async RegisterCredentials(username: string, password: string) {
    // TODO: Make the url /RegisterCredentials
    const result = await lastValueFrom(this.http.post<any>(this.url + '/Register', { username: username, password: password}));
    return result;
  }

  async RegisterName(user_serial: number, firstName: string, lastName: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/RegisterName', { user_serial: user_serial, firstName: firstName, lastName: lastName}));
    return result;
  }

  async RegisterCourse(user_serial: number, id: string, name: string, passcode: string, description: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/RegisterCourse', { user_serial: user_serial, id: id, name: name, passcode: passcode, description: description}));
    return result;
  }

  // Returns (ok/bad)
  // TODO: Fix return
  async LoginTeacher(username: string, password: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/TeacherLogin', { username: username, password: password }));
    return result;
  }

  // Returns (firstName: string, lastName: string)
  async GetTeacherNameAsStudent(courseID: string, passcode: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/TeacherNameAsStudent', { courseID: courseID, passcode: passcode }));
    return { firstName: result.firstName, lastName: result.lastName };
  }

  // Returns (courseName: string)
  async GetCourseNameAsStudent() {
    const result = await lastValueFrom(this.http.get<any>(this.url + '/CourseNameAsStudent'));
    return result;
  }

  // Returns (courseName: string)[]
  // TODO: Fix return
  async GetCoursesAsTeacher(user_serial: number) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/CoursesAsTeacher', {user_serial: user_serial}));
    return result;
  }

  // Returns (student: string, question: string)[]
  // TODO: Fix return
  async GetQuestionsAsTeacher(username: string, courseID: string, passcode: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/QuestionsAsTeacher', { username: username, courseID: courseID, passcode: passcode }));
    return result;
  }

  // Returns (firstName: string, lastName: string)
  async GetTeacherNameAsTeacher(username: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/TeacherNameAsTeacher', { username: username }));
    return { firstName: result.firstName, lastName: result.lastName };
  }

  // Returns (courseName: string)
  async GetCourseNameAsTeacher(username: string, courseID: string, passcode: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/CourseNameAsTeacher', { username: username, courseID: courseID, passcode: passcode }));
    return result.courseName;
  }

  // TESTING PURPOSES ONLY
  async GetUsernameTest() {
    const result = await lastValueFrom(this.http.get<any>(this.url + '/userstest'));
    return result.username;
  }
}
