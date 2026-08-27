import { TestBed } from '@angular/core/testing';
import { DashboardAdapter } from './dashboard-adapter';

describe('DashboardAdapter', () => {
  let service: DashboardAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
