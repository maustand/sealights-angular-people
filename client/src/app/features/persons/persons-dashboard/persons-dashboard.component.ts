import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Person } from '@core/models/person';
import { PersonActions } from '@core/store/persons/persons.actions';
import { PersonsState } from '@core/store/persons/persons.state';
import { Select, Store } from '@ngxs/store';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { Observable } from 'rxjs';
import { PersonsTableViewComponent } from './persons-table-view/persons-table-view.component';

@Component({
  selector: 'sealight-persons-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SearchBoxComponent,
    PersonsTableViewComponent,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './persons-dashboard.component.html',
  styleUrls: ['./persons-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleDashBoardComponent implements OnInit {
  @Select(PersonsState.getItemsByName)
  personsList$!: Observable<Person[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new PersonActions.FetchAll());
  }

  onSearchValueChanges(value: string) {
    this.store.dispatch(new PersonActions.DoFilterByName(value));
  }
}
