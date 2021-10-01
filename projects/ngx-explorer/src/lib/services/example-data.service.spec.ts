import { TestBed } from '@angular/core/testing';

import { ExampleDataService } from './example-data.service';

describe('ExampleDataService', () => {
  let service: ExampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
