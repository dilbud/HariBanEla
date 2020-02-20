import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePageComponent } from './profile-page.component';
// import { Router } from 'express';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePageComponent],
      schemas: []
      // providers:[
      //   Router
      // ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
