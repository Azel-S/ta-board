import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Custom Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { SignupComponent } from './signup/signup.component';

// Material Modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

// Services
import { DataBackendService } from './services/data-backend.service';


const routes: Routes =
  [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'student-view', component: StudentViewComponent },
    { path: 'teacher-view', component: TeacherViewComponent },
    { path: 'course-view', component: CourseViewComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ]

@NgModule
({
  declarations:
  [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StudentViewComponent,
    TeacherViewComponent,
    CourseViewComponent,
    SidebarComponent,
  ],
  imports:
  [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    LayoutModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [DataBackendService],
  bootstrap: [AppComponent]
})

export class AppModule { }
