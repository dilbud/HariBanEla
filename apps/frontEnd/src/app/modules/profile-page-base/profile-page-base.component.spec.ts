import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProfilePageBaseComponent } from './profile-page-base.component';

describe('ProfilePageBaseComponent', () => {
  let component: ProfilePageBaseComponent;
  let fixture: ComponentFixture<ProfilePageBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageBaseComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
