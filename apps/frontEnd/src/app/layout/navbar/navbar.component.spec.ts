import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from '@modules/login/login.component';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService, AuthServiceConfig } from 'angularx-social-login';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, LoginComponent, MatAutocomplete],
      providers: [HttpClient, HttpHandler, AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(NavbarComponent).toBeTruthy();
  // });
});
