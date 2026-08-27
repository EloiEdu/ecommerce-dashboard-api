import { DashboardAdapterService } from './dashboard-adapter.service';
import { TestBed } from '@angular/core/testing';

describe('DashboardAdapter', () => {
  let service: DashboardAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
