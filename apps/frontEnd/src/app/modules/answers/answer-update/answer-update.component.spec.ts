import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AnswerUpdateComponent } from './answer-update.component';

describe('AnswerUpdateComponent', () => {
  let component: AnswerUpdateComponent;
  let fixture: ComponentFixture<AnswerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerUpdateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
