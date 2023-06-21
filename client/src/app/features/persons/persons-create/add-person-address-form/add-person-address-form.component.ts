import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => AddPersonAddressFormComponent),
  //     multi: true,
  //   },
  // ],
})
export class AddPersonAddressFormComponent {
  @Input({ required: true }) countries: Country[];

  @Output() addressAdded: EventEmitter<AddressPerson>;

  @Output() addressRemoved: EventEmitter<number>;

  addressForm: FormGroup;

  cities: CountryCity[]

  constructor(private frmBuilder: FormBuilder) {
    this.countries = [];
    this.cities = [];
    this.addressAdded = new EventEmitter<AddressPerson>();
    this.addressRemoved = new EventEmitter<number>();

    this.addressForm = this.frmBuilder.group({
      name: ['', [Validators.required]],
      countrId: [-1, [Validators.required]],
      cityId: [-1, [Validators.required]],
      street: ['', [Validators.required]],
    });
  }

  onChangeFn(value: string): void {}

  onTouchedFn(): void {}

  writeValue(value: string): void {
    // this.inputValue = value;
    // this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // this.isDisabled = isDisabled;
    // this.changeDetectorRef.markForCheck();
  }

  onCountryChanged(countryIdSelected: number): void {
    const country = this.countries.find((i) => i.id === countryIdSelected);
    this.cities = (country && country.cities.length > 0) ? country.cities : [];
    console.log(this.cities, country)
  }

  onRemoveAddress(): void {
    this.addressRemoved.emit(1);
  }
}
