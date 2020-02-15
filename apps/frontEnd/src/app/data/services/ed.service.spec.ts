import { TestBed } from '@angular/core/testing';

import { EdService } from './ed.service';

describe('EdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EdService = TestBed.get(EdService);
    expect(service).toBeTruthy();
  });
});
