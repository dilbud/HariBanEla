import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDComponent } from './report-d.component';

describe('ReportDComponent', () => {
  let component: ReportDComponent;
  let fixture: ComponentFixture<ReportDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
