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
import { AddressPerson } from '@core/models/person';

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

  @Input({ required: true }) countries: Country[];

  @Output() addressRemoved: EventEmitter<number>;

  addressForm!: FormGroup;

  cities: CountryCity[];

  constructor(private controlContainer: ControlContainer) {
    this.id = 0;
    this.countries = [];
    this.cities = [];
    this.addressRemoved = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.addressForm = (
      this.controlContainer.control?.get('addresses') as FormArray
    ).controls[this.id] as FormGroup;
  }

  onCountryChanged(countryIdSelected: number): void {
    const country = this.countries.find((i) => i.id === countryIdSelected);
    this.cities = country && country.cities.length > 0 ? country.cities : [];
  }

  onRemove(): void {
    this.addressRemoved.emit(this.id);
  }
}
