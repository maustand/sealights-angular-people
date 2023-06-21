import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
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
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Person } from '@core/models/person';
import { PersonActions } from '@core/store/persons/persons.actions';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Observable, finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddPersonAddressFormComponent } from './add-person-address-form/add-person-address-form.component';
import { CountryActions } from '@core/store/countries/countries.actions';
import { CountriesState } from '@core/store/countries/countries.state';
import { Country } from '@core/models/country';

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

  constructor(private frmBuilder: FormBuilder, private store: Store) {
    this.isLoading = false;
    this.newPersonForm = this.frmBuilder.nonNullable.group({
      name: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
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
    console.log(id);
  }

  onAddNewAddress() {

  }
}
