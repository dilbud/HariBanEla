import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageBaseComponent } from './profile-page-base.component';

describe('ProfilePageBaseComponent', () => {
  let component: ProfilePageBaseComponent;
  let fixture: ComponentFixture<ProfilePageBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageBaseComponent ]
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
