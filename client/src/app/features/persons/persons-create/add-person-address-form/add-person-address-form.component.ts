import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Country, CountryCity } from '@core/models/country';

@Component({
  selector: 'sealights-add-person-address-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-person-address-form.component.html',
  styleUrls: ['./add-person-address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPersonAddressFormComponent implements OnInit {
  @Input({ required: true }) id: number;

  @Input({ required: true }) set countries(items: Country[]) {
    this.countriesList = items;
    const currentCountryId = this.addressForm?.get('countryId')?.value;
    //currentCountryId could be 0 due country id.
    if (currentCountryId !== null && currentCountryId !== undefined) {
      this.onCountryChanged(currentCountryId);
    }
  }

  @Output() addressRemoved: EventEmitter<number>;

  addressForm!: FormGroup;
  countriesList: Country[];
  citiesOfCountry: CountryCity[];

  constructor(private controlContainer: ControlContainer) {
    this.id = 0;
    this.countriesList = [];
    this.citiesOfCountry = [];
    this.addressRemoved = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.addressForm = (
      this.controlContainer.control?.get('addresses') as FormArray
    ).controls[this.id] as FormGroup;
  }

  onCountryChanged(countryIdSelected: number): void {
    const country = this.countriesList.find((i) => i.id === countryIdSelected);
    this.citiesOfCountry =
      country && country.cities.length > 0 ? country.cities : [];
    this.addressForm.get('cityId')?.reset();
  }

  onRemove(): void {
    this.addressRemoved.emit(this.id);
  }
}
