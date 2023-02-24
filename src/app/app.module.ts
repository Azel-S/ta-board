import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Custom Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';
import { CourseViewComponent } from './course-view/course-view.component';

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
import {MatExpansionModule} from '@angular/material/expansion';
import { TeacherDashComponent } from './teacher-dash/teacher-dash.component';

// Services

const routes: Routes =
[
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'student-view', component: StudentViewComponent },
  { path: 'teacher-view', component: TeacherViewComponent },
  { path: 'teacher-dash', component: TeacherDashComponent },
  { path: 'course-view', component: CourseViewComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
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
    TeacherDashComponent
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
    MatListModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
