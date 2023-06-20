import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Person } from '@core/models/persons';
import { PersonActions } from '@core/store/persons/persons.actions';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { finalize } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PeopleCreateComponent {
  isLoading = false;
  newPersonForm = this.frmBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
  });

  constructor(private frmBuilder: FormBuilder, private store: Store) {}

  onSubmit() {
    if (this.newPersonForm.valid) {
      // this.isLoading = true;
      // const payload: Person = {
      //   name: this.newPersonForm.value?.name || '',
      //   birthdate: this.newPersonForm.value.birthdate || '',
      //   addresses: [
      //     {
      //       name: 'my home',
      //       countrId: 1,
      //       cityId: 1,
      //       street: 'bialik',
      //     },
      //   ],
      // };

      // this.store
      //   .dispatch(new PersonActions.CreatePerson(payload))
      //   .pipe(finalize(() => (this.isLoading = false)))
      //   .subscribe(() => {
      //     this.store.dispatch(new Navigate(['..']));
      //   });
    }
  }
}
