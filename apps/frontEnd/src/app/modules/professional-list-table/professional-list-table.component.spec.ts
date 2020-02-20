import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalListTableComponent } from './professional-list-table.component';

describe('ProfessionalListTableComponent', () => {
  let component: ProfessionalListTableComponent;
  let fixture: ComponentFixture<ProfessionalListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalListTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
