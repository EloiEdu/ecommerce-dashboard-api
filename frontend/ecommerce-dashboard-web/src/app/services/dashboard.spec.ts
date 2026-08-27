import { DashboardComponent } from './../dashboard/dashboard.component';
import { TestBed } from '@angular/core/testing';

describe('Dashboard', () => {
  let service: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
