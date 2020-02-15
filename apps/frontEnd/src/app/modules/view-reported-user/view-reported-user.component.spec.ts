import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportedUserComponent } from './view-reported-user.component';

describe('ViewReportedUserComponent', () => {
  let component: ViewReportedUserComponent;
  let fixture: ComponentFixture<ViewReportedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
