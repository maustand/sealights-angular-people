import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Country } from '@core/models/country';
import { Person } from '@core/models/person';
import { CountryActions } from '@core/store/countries/countries.actions';
import { CountriesState } from '@core/store/countries/countries.state';
import { PersonActions } from '@core/store/persons/persons.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, finalize } from 'rxjs';
import { AddPersonAddressFormComponent } from './add-person-address-form/add-person-address-form.component';

@Component({
  selector: 'sealights-persons-create',
  templateUrl: './persons-create.component.html',
  styleUrls: ['./persons-create.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    AddPersonAddressFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PeopleCreateComponent implements OnInit {
  @Select(CountriesState.getRaw)
  countriesList$!: Observable<Country[]>;

  isLoading: boolean;
  newPersonForm: FormGroup;

  get addressesForm() {
    return this.newPersonForm.get('addresses') as FormArray;
  }

  constructor(private frmBuilder: FormBuilder, private store: Store) {
    this.isLoading = false;
    this.newPersonForm = this.frmBuilder.nonNullable.group({
      name: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      addresses: this.frmBuilder.array(
        [this.addNewPersonAddressForm()],
        Validators.required
      ),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new CountryActions.FetchAll());
  }

  onSubmit(): void {
    if (this.newPersonForm.valid) {
      this.isLoading = true;
      const payload: Person = {
        name: this.newPersonForm.value?.name || '',
        birthdate: this.newPersonForm.value.birthdate || '',
        addresses: [
          {
            name: 'my home',
            countrId: 1,
            cityId: 1,
            street: 'bialik',
          },
        ],
      };

      this.store
        .dispatch(new PersonActions.CreatePerson(payload))
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this.store.dispatch(new Navigate(['..']));
        });
    }
  }

  onAddressFormRemoved(id: number) {
    this.addressesForm.removeAt(id);
  }

  onAddNewCity(): void {}
  onAddNewAddress() {
    const newFormGroud = this.addNewPersonAddressForm();
    this.addressesForm.push(newFormGroud);
  }

  private addNewPersonAddressForm(): FormGroup {
    return this.frmBuilder.group({
      name: ['', Validators.required],
      countrId: [-1, Validators.required],
      cityId: [-1, Validators.required],
      street: ['', Validators.required]
    });
  }
}
