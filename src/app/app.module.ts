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
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component'; 
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './login/login.component';

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

const routes: Routes =
[
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dash', component: DashComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
]

@NgModule
({
  declarations:
  [
    AppComponent,
    TopBarComponent,
    DashComponent,
    LoginComponent,
    HomeComponent,
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
