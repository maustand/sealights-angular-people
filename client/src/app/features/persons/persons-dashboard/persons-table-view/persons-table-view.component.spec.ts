import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsTableViewComponent } from './persons-table-view.component';

describe('PersonsTableViewComponent', () => {
  let component: PersonsTableViewComponent;
  let fixture: ComponentFixture<PersonsTableViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonsTableViewComponent]
    });
    fixture = TestBed.createComponent(PersonsTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
