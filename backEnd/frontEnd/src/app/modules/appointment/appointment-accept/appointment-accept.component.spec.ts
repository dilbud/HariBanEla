import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAcceptComponent } from './appointment-accept.component';

describe('AppointmentAcceptComponent', () => {
  let component: AppointmentAcceptComponent;
  let fixture: ComponentFixture<AppointmentAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
