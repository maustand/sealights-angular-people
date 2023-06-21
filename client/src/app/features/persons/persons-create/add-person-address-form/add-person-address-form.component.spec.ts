import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonAddressFormComponent } from './add-person-address-form.component';

describe('AddPersonAddressFormComponent', () => {
  let component: AddPersonAddressFormComponent;
  let fixture: ComponentFixture<AddPersonAddressFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddPersonAddressFormComponent]
    });
    fixture = TestBed.createComponent(AddPersonAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
