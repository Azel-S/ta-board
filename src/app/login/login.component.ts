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
  courseID: string | null = null;
  passcode: string | null = null;
  username: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;

  student(credentials: { courseID: string }) {
    this.serve_back.LoginStudent(this.courseID!, this.passcode!).then(res => {
      this.serve_comm.SetLoggedIn("S");
      this.serve_comm.SetSerial(res.ID);
      this.serve_comm.ClearCourses();

      this.serve_back.GetCourseInfoAsStudent(this.serve_comm.GetSerial()).then(res => {
        this.serve_comm.AddCourse(res);
        this.serve_comm.SetProfName(res.professor_name);
        this.serve_comm.Navigate('student-view');
      });
    }).catch(res => {
      // TODO: Show error message
      console.log("YAHOO!");
    });
  }

  teacher(credentials: { username: string, password: string }) {
    this.serve_back.LoginTeacher(this.username!, this.password!).then(res => {
      // Set logged in status to teacher.
      this.serve_comm.SetLoggedIn("T");

      // Update Data
      this.serve_comm.SetSerial(res.id);
      console.log(res);
      this.serve_comm.SetProfName(res.professor_name);
      this.serve_back.GetCoursesAsTeacher(this.serve_comm.GetSerial()).then(res => {
        this.serve_comm.ClearCourses();
        for (let i = 0; i < res.length; i++) {
          this.serve_comm.AddCourse(res[i]);
        }
        
        
        
        // Navigate to teacher-view
        this.serve_comm.Navigate('teacher-view');
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
        this.serve_comm.Navigate('signup');
      }).catch(res => {
        // TODO: Show error message
        console.log("YAHOO!");
      });
    }
  }
}
