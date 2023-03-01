import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [LoginComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('same password works', async() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.componentInstance.password = "aaa";
    fixture.componentInstance.confirmPassword = "aaa";
    const result = fixture.componentInstance.register({username: "test", password: "aaa"});
    expect(result).toBe(true);
  })

  it('different password works', async() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.componentInstance.password = "aaa";
    fixture.componentInstance.confirmPassword = "bbb";
    const result = fixture.componentInstance.register({username: "test", password: "aaa"});
    expect(result).toBe(false);
  })
});
