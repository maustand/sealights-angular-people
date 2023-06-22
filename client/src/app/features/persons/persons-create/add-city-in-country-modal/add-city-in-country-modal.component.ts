import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { City } from '@core/models/city';
import { Country } from '@core/models/country';
import { CityActions } from '@core/store/cities/cities.actions';
import { CountriesState } from '@core/store/countries/countries.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'sealights-add-city-in-country-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-city-in-country-modal.component.html',
  styleUrls: ['./add-city-in-country-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCityInCountryModalComponent {
  @Select(CountriesState.getRaw)
  countriesList$!: Observable<Country[]>;

  newCityForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCityInCountryModalComponent>,
    private frmBuilder: FormBuilder,
    private store: Store,
    private snackBar: MatSnackBar
  ) {
    this.newCityForm = this.frmBuilder.group({
      countryId: [null, [Validators.required, Validators.min(0)]],
      name: ['', [Validators.required]],
    });
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.newCityForm.valid) {
      this.store
        .dispatch(new CityActions.Create(this.newCityForm.value as City))
        .subscribe(() => {
          this.snackBar.open('New City has been added !', '', {
            duration: 1000,
          });
          this.dialogRef.close({ success: true });
        });
    }
  }
}
