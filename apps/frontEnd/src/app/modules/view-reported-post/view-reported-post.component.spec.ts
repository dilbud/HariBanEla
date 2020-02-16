import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportedPostComponent } from './view-reported-post.component';

describe('ViewReportedPostComponent', () => {
  let component: ViewReportedPostComponent;
  let fixture: ComponentFixture<ViewReportedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
