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
    const result = await lastValueFrom(this.http.post<any>(this.url + '/LoginStudent', { courseID: courseID, passcode: passcode }));
    return result;
  }

  // Returns (ok/bad)
  // TODO: Fix return
  async LoginTeacher(username: string, password: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/teacherlogin', { username: username, password: password }));
    return result;
  }

  // Returns (firstName: string, lastName: string)
  async GetTeacherNameAsStudent(courseID: string, passcode: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/TeacherNameAsStudent', { courseID: courseID, passcode: passcode }));
    return {firstName: result.firstName, lastName: result.lastName};
  }

  // Returns (courseName: string)
  async GetCourseNameAsStudent(courseID: string, passcode: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/CourseNameAsStudent', { courseID: courseID, passcode: passcode }));
    return result.courseName;
  }

  // Returns (courseName: string)[]
  // TODO: Fix return
  async GetCoursesAsTeacher(username: string) {
    const result = await lastValueFrom(this.http.post<any>(this.url + '/CoursesAsTeacher', { username: username }));
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
    return {firstName: result.firstName, lastName: result.lastName};
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
