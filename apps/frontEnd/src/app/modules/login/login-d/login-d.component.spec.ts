import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginDComponent } from './login-d.component';

describe('LoginDComponent', () => {
  let component: LoginDComponent;
  let fixture: ComponentFixture<LoginDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginDComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
