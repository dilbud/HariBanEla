import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDComponent } from './logout-d.component';

describe('LogoutDComponent', () => {
  let component: LogoutDComponent;
  let fixture: ComponentFixture<LogoutDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
