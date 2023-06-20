import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Person } from '@core/models/persons';
import { PersonsTableViewComponent } from '@shared/components/persons-table-view/persons-table-view.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';

@Component({
  selector: 'sealight-persons-dashboard',
  standalone: true,
  imports: [SearchBoxComponent, PersonsTableViewComponent],
  templateUrl: './persons-dashboard.component.html',
  styleUrls: ['./persons-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleDashBoardComponent {

  // @Select(PersonsState) 
  // personsList$: Observable<Person[]>;

  constructor() {

  }


  personsDataList: Person[] = [
    {
      id: 0,
      name: 'hola mundo',
      birthdate: '10/10/2020',
      addresses: [
        {
          name: 'mi casa',
          countrId: 1,
          cityId: 1,
          street: 'heruyt',
        },
      ],
    },
  ];

  onSearchValueChange(value: string) {
    console.log(value, 5);
  }
}
