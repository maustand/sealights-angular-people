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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { Country } from '@core/models/country';
import { CountryActions } from '@core/store/countries/countries.actions';
import { CountriesState } from '@core/store/countries/countries.state';
import { PersonActions } from '@core/store/persons/persons.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, filter, finalize, take } from 'rxjs';
import { AddCityInCountryModalComponent } from './add-city-in-country-modal/add-city-in-country-modal.component';
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
    MatDialogModule,
    AddPersonAddressFormComponent,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PeopleCreateComponent implements OnInit {
  @Select(CountriesState.getRaw)
  countriesList$!: Observable<Country[]>;

  isLoading: boolean;
  newPersonForm: FormGroup;
  maxDateToday: Date;

  get addressesForm() {
    return this.newPersonForm.get('addresses') as FormArray;
  }

  constructor(
    private frmBuilder: FormBuilder,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.isLoading = false;
    this.newPersonForm = this.frmBuilder.group({
      name: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      addresses: this.frmBuilder.array(
        [this.addNewPersonAddressForm()],
        Validators.required
      ),
    });
    this.maxDateToday = new Date();
  }

  ngOnInit(): void {
    this.store.dispatch(new CountryActions.FetchAll());
  }

  onSubmit(): void {
    if (this.newPersonForm.valid) {
      this.isLoading = true;
      this.store
        .dispatch(new PersonActions.CreatePerson(this.newPersonForm.value))
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this.store.dispatch(new Navigate(['..']));
        });
    }
  }

  onAddressFormRemoved(id: number) {
    this.addressesForm.removeAt(id);
  }

  onOpenAddNewCityDialog(): void {
    const modal = this.dialog.open(AddCityInCountryModalComponent, {});

    modal
      .afterClosed()
      .pipe(
        filter((i) => i?.success),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(CountryActions.FetchAll);
      });
  }

  onAddNewAddress() {
    const newFormGroud = this.addNewPersonAddressForm();
    this.addressesForm.push(newFormGroud);
  }

  private addNewPersonAddressForm(): FormGroup {
    return this.frmBuilder.group({
      name: ['', Validators.required],
      countryId: [null, [Validators.required, Validators.min(0)]], // id could be 0 due server uses list.lenght
      cityId: [null, [Validators.required, Validators.min(0)]],
      street: ['', Validators.required],
    });
  }
}
