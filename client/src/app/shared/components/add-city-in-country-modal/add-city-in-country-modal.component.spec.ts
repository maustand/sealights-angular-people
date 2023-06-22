import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityInCountryModalComponent } from './add-city-in-country-modal.component';

describe('AddCityInCountryModalComponent', () => {
  let component: AddCityInCountryModalComponent;
  let fixture: ComponentFixture<AddCityInCountryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddCityInCountryModalComponent]
    });
    fixture = TestBed.createComponent(AddCityInCountryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
