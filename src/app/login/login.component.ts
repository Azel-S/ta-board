import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// FormControl
import { FormControl, Validators } from '@angular/forms';
import { DataComponentService } from '../services/data-component.service';
import { DataBackendService } from '../services/data-backend.service';

// Source: https://blog.angular-university.io/angular-custom-validators/
export function createErrorVal(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value == "error") {
      return { errorVal: true };
    }
    else {
      return null;
    }
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private serve_comm: DataComponentService, private serve_back: DataBackendService) { }

  // Input fields
  courseID: string = '';
  courseCode: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  errorStudent: { status: boolean, message: string } = { status: true, message: '' };
  errorTeacher: { status: boolean, message: string } = { status: true, message: '' };
  errorRegister: { status: boolean, message: string } = { status: true, message: '' };

  // Student Course ID - Validator
  ValidateStudent() {
    if (this.courseCode.length > 0 && this.courseCode[0] != '#') {
      this.errorStudent.status = false;
      this.errorStudent.message = 'Not long enough';
      return false;
    }
    else {
      this.errorStudent.status = true;
      this.errorStudent.message = '';
      return true;
    }
  }

  student(credentials: { courseID: string }) {
    if (this.ValidateStudent()) {
      this.serve_back.LoginStudent(this.courseID!, this.courseCode!).then(res => {
        this.serve_comm.SetLoggedIn("S");
        this.serve_comm.SetSerial(res.course_serial);
      this.serve_comm.SetCurrentCourse(0);

      this.serve_comm.SetProfName(res.professor_name);

      this.serve_comm.ClearCourses();
      this.serve_comm.AddCourse(res);

      this.serve_back.GetQuestions(this.serve_comm.GetCourseSerial()).then(res => {
        this.serve_comm.ClearQuestions();
        if (res != null) {
          for (let i = 0; i < res.length; i++) {
            this.serve_comm.AddQuestion(res[i]);
          }
        }
      // TODO: Update data in component class
      // e.g. serve_comm.SetProfName(serve_back.GetProfName(...));
    }).catch(res => {
      // TODO: Show error message
      console.log("YAHOO!");
    });
  }

  teacher(credentials: { username: string, password: string }) {
    this.serve_back.LoginTeacher(this.username!, this.password!).then(res => {
      // Set logged in status to teacher.
      this.serve_comm.SetLoggedIn("T");
      this.serve_comm.SetCurrentCourse(0);

      // Update Data
      this.serve_comm.SetSerial(res.user_serial);
      this.serve_comm.SetProfName(res.professor_name);

      this.serve_back.GetCourses(this.serve_comm.GetSerial()).then(res => {
        this.serve_comm.ClearCourses();
        if (res != null) {
          for (let i = 0; i < res.length; i++) {
            this.serve_comm.AddCourse(res[i]);
          }
        }

        this.serve_back.GetQuestions(this.serve_comm.GetCourseSerial()).then(res => {
          this.serve_comm.ClearQuestions();
          if (res != null) {
            for (let i = 0; i < res.length; i++) {
              this.serve_comm.AddQuestion(res[i]);
            }
          }

          this.serve_comm.Navigate("teacher-view")
        }).catch(res => {
          console.log("YAHOO!");
        });
      }).catch(res => {
        console.log("YAHOO!");
      });
    }).catch(res => {
      // TODO: Show error message
      console.log("YAHOO!");
    });
  }

  register(credentials: { username: string, password: string, confirmPassword: string }) {
    if (this.password == this.confirmPassword) {
      this.serve_back.RegisterCredentials(this.username!, this.password!).then(res => {
        this.serve_comm.SetLoggedIn("T")
        this.serve_comm.SetSerial(res.user_serial);
        this.serve_comm.SetCurrentCourse(0);

        // Navigate
        this.serve_comm.Navigate('signup');
      }).catch(res => {
        // TODO: Show error message
        console.log("YAHOO!");
      });
    }
  }

  // // Course Code Validator
  // ValidateStudent() {
  //   let correct: boolean = false;
  //   if (this.courseID!.length == 0)
  //     console.log(this.courseID, 'not long enough');
  // }

}
