import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDashBoardComponent } from './persons-dashboard.component';

describe('PeopleDashBoardComponent', () => {
  let component: PeopleDashBoardComponent;
  let fixture: ComponentFixture<PeopleDashBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PeopleDashBoardComponent]
    });
    fixture = TestBed.createComponent(PeopleDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
